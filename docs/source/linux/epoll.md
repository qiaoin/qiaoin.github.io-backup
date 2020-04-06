---
title: epoll
---

# epoll

主要参考网页：

- https://my.oschina.net/alchemystar/blog/3008840
- https://www.jianshu.com/p/aa486512e989 主要参考这两个博客
- http://www.cnblogs.com/apprentice89/p/3234677.html
- https://blog.csdn.net/chen19870707/article/details/42525887
- https://elixir.bootlin.com/linux/v4.12/source/fs/eventpoll.c V4.12 查看的源码内核版本号

epoll 相关的内核代码在 fs/eventpoll.c 文件中，下面分别分析 epoll_create、epoll_ctl 和 epoll_wait 三个函数在内核中的实现，分析所用 linux 内核源码为 4.1.2 版本
epoll_create
Unix 的万物皆文件的思想在 epoll 里面也有体现，epoll_create 调用返回一个文件描述符，此描述符挂载在 anon_inode_fs (匿名 inode 文件系统)的根目录下面。让我们看下具体的 epoll_create 系统调用源码:

SYSCALL_DEFINE1(epoll_create, int, size)  /* int 是参数类型，size 是形参名字 */
{
    if (size <= 0)
        return -EINVAL;

    return sys_epoll_create1(0);
}

由源码可见，epoll_create 的参数是基本没有意义的，kernel 简单的判断是否为 0，然后就直接调用 sys_epoll_create1。由于 linux 的系统调用是通过(SYSCALL_DEFINE1, SYSCALL_DEFINE2, ..., SYSCALL_DEFINE6)定义的，那么 sys_epoll_create1 对应的源码即是SYSCALL_DEFINE1(epoll_create1)。(注：受限于寄存器数量的限制，(80x86下的)kernel 限制系统调用最多有 6 个参数。据ulk3所述，这是由于32位80x86寄存器的限制) 这个在 CSAPP 第三章也有讲
sys_epoll_create -> sys_epoll_create1
接下来，看 epoll_create1 的源码（源码的错误处理有部分删除）:

// Open an eventpoll file descriptor.
SYSCALL_DEFINE1(epoll_create1, int, flags)
{
	int error, fd;
	struct eventpoll *ep = NULL;
	struct file *file;

	// Create the internal data structure ("struct eventpoll").
	// kzalloc(sizeof(*ep), GFP_KERNEL)，用的是内核空间
	error = ep_alloc(&ep);
	// 获取尚未被使用的文件描述符，即描述符数组的槽位
	fd = get_unused_fd_flags(O_RDWR | (flags & O_CLOEXEC));
	// 在匿名 inode 文件系统中分配一个 inode，并得到其 file 结构体
	// 且 file->f_op = &eventpoll_fops;
	// 且 file->private_data = ep;
	file = anon_inode_getfile("[eventpoll]", &eventpoll_fops, ep,
				 O_RDWR | (flags & O_CLOEXEC));
	ep->file = file;
	// 将 file 填入到对应的文件描述符数组的槽里面
	fd_install(fd, file);
	return fd;
}

epoll_create1，首先，ep_alloc(&ep) 申请一个 eventpoll 结构体，并且初始化该结构的成员
sys_epoll_create -> sys_epoll_create1 -> ep_alloc

static int ep_alloc(struct eventpoll **pep)
{
	struct eventpoll *ep;

	ep = kzalloc(sizeof(*ep), GFP_KERNEL);
	if (unlikely(!ep))
		goto free_uid;

	spin_lock_init(&ep->lock);
	mutex_init(&ep->mtx);
	init_waitqueue_head(&ep->wq);
	init_waitqueue_head(&ep->poll_wait);
	INIT_LIST_HEAD(&ep->rdllist);
	ep->rbr = RB_ROOT;  // 红黑树
	ep->ovflist = EP_UNACTIVE_PTR;
	ep->user = user;

	*pep = ep;

	return 0;
}

接下来，调用 get_unused_fd_flags，在本进程中申请一个未使用的 fd 文件描述符
sys_epoll_create -> sys_epoll_create1 -> ep_alloc -> get_unused_fd_flags

int get_unused_fd_flags(unsigned flags)
{
    return __alloc_fd(current->files, 0, rlimit(RLIMIT_NOFILE), flags);
}

linux 内核中，current 是个宏，返回的是一个 task_struct 结构的变量（称之为进程描述符），表示当前进程，进程打开的文件资源保存在进程描述符的 files 成员里面，所以 current->files 返回的当前进程打开的文件资源。rlimit(RLIMIT_NOFILE)  函数获取的是当前进程可以打开的最大文件描述符数，这个值可以设置，默认是 1024。__alloc_fd 的工作是为进程在 [start, end) 之间(备注：这里 start 为 0， end 为进程可以打开的最大文件描述符数)分配一个可用的文件描述符。
然后，epoll_create1 会调用 anon_inode_getfile，创建一个 file 结构
sys_epoll_create -> sys_epoll_create1 -> ep_alloc -> get_unused_fd_flags -> anon_inode_getfile

//Creates a new file by hooking it on a single inode.
struct file *anon_inode_getfile(const char *name,
                const struct file_operations *fops,
                void *priv, int flags)
{
    struct qstr this;
    struct path path;
    struct file *file;

    // Link the inode to a directory entry by creating a unique name
    // using the inode sequence number.
    this.name = name;
    this.len = strlen(name);
    this.hash = 0;
    path.dentry = d_alloc_pseudo(anon_inode_mnt->mnt_sb, &this);

    path.mnt = mntget(anon_inode_mnt);

    d_instantiate(path.dentry, anon_inode_inode);

    file = alloc_file(&path, OPEN_FMODE(flags), fops);
    file->f_mapping = anon_inode_inode->i_mapping;
    file->f_flags = flags & (O_ACCMODE | O_NONBLOCK);
    file->private_data = priv;  // 建立与 struct eventpoll 的关联

    return file;
}

anon_inode_getfile 函数中首先会 alloc 一个 file 结构和一个 dentry 结构，然后将该 file 结构与一个匿名 inode 节点 anon_inode_inode 挂钩在一起。这里要注意的是，在调用 anon_inode_getfile 函数申请 file 结构时，传入了前面申请的 eventpoll 结构的 ep 变量，申请的 file->private_data 会指向这个 ep 变量，同时，在 anon_inode_getfile 函数返回来后，ep->file 会指向该函数申请的 file 结构变量
最后，epoll_create1 调用 fd_install 函数，将 epoll_fd 与 file 结构关联在一起，之后，内核可以通过应用传入的 fd 参数访问 file 结构。
至此，epoll_create 生成的文件描述符如下图所示: 
![][file]
这里的三个关联是怎么建立的呢？
	1)	task_struct.file 与 files_struct 的关联：get_unused_fd_flags()
	2)	epoll_fd 与 file 的关联：fd_install()
	3)	file.private_data 与 eventpoll 结构体的关联：anon_inode_getfile()
=> 总结 epoll_create 函数所做的事：
调用 epoll_create 后，在内核中分配一个 eventpoll 结构和代表 epoll 文件的 file 结构，并且将这两个结构关联在一块，同时，返回一个也与 file 结构相关联的 epoll 文件描述符 fd（图中的 epoll_fd）。当应用程序操作 epoll 时，需要传入一个 epoll 文件描述符 fd，内核根据这个 fd，找到 epoll 的 file 结构，然后通过 file，获取 epoll_create 申请 eventpoll 结构变量，epoll 相关的重要信息都存储在这个结构里面。接下来，所有 epoll 接口函数的操作，都是在 eventpoll 结构变量上进行的。所以，epoll_create 的作用就是为进程在内核中建立一个从 epoll 文件描述符到 eventpoll 结构变量的通道。
所有的 epoll 系统调用都是围绕 eventpoll 结构体：

// 此结构体存储在 file->private_data 中
struct eventpoll {
	// 自旋锁，在 kernel 内部用自旋锁加锁，就可以同时多线(进)程对此结构体进行操作
	// 主要是保护 ready_list
	spinlock_t lock;
	// 这个互斥锁是为了保证在 eventloop 使用对应的文件描述符的时候，文件描述符不会被移除掉
	struct mutex mtx;
	// epoll_wait 使用的等待队列，和进程唤醒有关
	wait_queue_head_t wq;
	// file->poll 使用的等待队列，和进程唤醒有关
	wait_queue_head_t poll_wait;
	// 就绪的描述符队列
	struct list_head rdllist;
	// 通过红黑树来组织当前 epoll 关注的文件描述符
	struct rb_root rbr;
	// 在向用户空间传输就绪事件的时候，将同时发生事件的文件描述符链入到这个链表里面
	struct epitem *ovflist;
	// 对应的 user
	struct user_struct *user;
	// 对应的文件描述符
	struct file *file;
	// 下面两个是用于环路检测的优化
	int visited;
	struct list_head visited_list_link;
};
epoll_ctl(EPOLL_CTL_ADD)
epoll_ctl 接口的作用是添加/修改/删除文件的监听事件
如何将对应的文件描述符插入到 eventpoll 中的？借助于 spin_lock (自旋锁)和 mutex (互斥锁)，epoll_ctl 调用可以在多个 KSE (Kernel Schedule Entry，内核调度实体，即进程/线程)中并发执行。

SYSCALL_DEFINE4(epoll_ctl, int, epfd, int, op, int, fd,
				     struct epoll_event __user *, event)
{
	struct fd f, tf;
	struct eventpoll *ep;
	struct epitem *epi;
	struct epoll_event epds;

	// op 是对 epoll 操作的动作（添加/修改/删除事件）
	// ep_op_has_event(op) 判断是否不是删除操作,
	// 只有删除操作，内核不需要使用进程传入的 event 事件
	// 如果 op != EPOLL_CTL_DEL 为 true，则需要调用 copy_from_user 函数
	// 将用户空间传过来的 event 事件拷贝到内核的 epds 变量中
	if (ep_op_has_event(op) &&
	    copy_from_user(&epds, event, sizeof(struct epoll_event)))
		goto error_return;

	// 连续调用两次 fdget 分别获取 epoll 文件和被监听文件（target）的 file 结构变量
	// struct fd {
	//			struct file *file;  // fd 结构包含 file 结构
	//			unsigned int flags;
	//};
	f = fdget(epfd);  tf = fdget(fd);

	// 对参数做一些检查，如果传入的参数有问题，报错返回
	// 1. 目标文件不支持 poll 操作
	if (!tf.file->f_op->poll)  goto error_tgt_fput;
	// 2. 监听的目标文件就是 epoll 文件本身
	// 3. 用户传入的 epoll 文件(epfd 代表的文件）并不是一个真正的 epoll 的文件
	if (f.file == tf.file || !is_file_epoll(f.file))  goto error_tgt_fput;
	// 4. 如果操作动作是修改操作，并且事件类型为 EPOLLEXCLUSIVE，返回出错
	if (ep_op_has_event(op) && (epds.events & EPOLLEXCLUSIVE))  goto error_tgt_fput

	ep = f.file->private_data;  // 得到 epfd 所表示的 eventpoll 结构体
	// 此处的互斥锁是为了防止并发调用epoll_ctl,即保护内部数据结构
	// 不会被并发的添加修改删除破坏
	mutex_lock_nested(&ep->mtx, 0);
	epi = ep_find(ep, tf.file, fd);
	switch (op) {
	case EPOLL_CTL_ADD:
		if (!epi) {
			epds.events |= POLLERR | POLLHUP;
			error = ep_insert(ep, &epds, tf.file, fd, full_check);
		}
		break;
	......
	}
	mutex_unlock(&ep->mtx);
   ......
}

在 eventpoll 结构体里面，维护着一个红黑树，每次添加注册事件时，都会申请一个 epitem 结构的变量表示事件的监听项，然后插入 ep 的红黑树里面。在 epoll_ctl 里面，会调用 ep_find 从 ep 的红黑树里面查找目标文件表示的监听项（主要比较 epitem.ffd，由 tf.file 和 fd 组成），返回的监听项可能为空。
switch 区域代码是整个 epoll_ctl 的核心，对 op 进行 switch 出来的有添加(EPOLL_CTL_ADD)、删除(EPOLL_CTL_DEL)和修改(EPOLL_CTL_MOD)三种情况，这里以添加为例，其他两种情况类似，知道了如何添加监听事件，其他删除和修改监听事件都可以举一反三。
为目标文件添加监控事件时，首先要保证当前 ep 里面还没有对该目标文件进行监听，若 epi 为空 if (!epi) {...}，说明参数正常，先默认设置对目标文件的 POLLERR 和 POLLHUP 监听事件，然后调用 ep_insert 函数，将对目标文件的监听事件插入到 ep 维护的红黑树里面。
sys_epoll_ctl -> ep_insert

static int ep_insert(struct eventpoll *ep, struct epoll_event *event,
		     	          struct file *tfile, int fd, int full_check)
{
	int error, revents, pwake = 0;
	struct epitem *epi;
	struct ep_pqueue epq;

	if (!(epi = kmem_cache_alloc(epi_cache, GFP_KERNEL)))  return -ENOMEM;

	// 对 epi 进行初始化...

	/* Initialize the poll table using the queue callback */
	epq.epi = epi;
	init_poll_funcptr(&epq.pt, ep_ptable_queue_proc);  // 这里在后面解释
	revents = ep_item_poll(epi, &epq.pt);

	/* Add the current item to the list of active epoll hook for this file */
	spin_lock(&tfile->f_lock);
	// 将当前监听项添加到目标文件的 f_ep_links 链表里面，该链表是目标文件的 epoll 钩子链表，
	// 所有对该目标文件进行监听的监听项都会加入到该链表里面
	list_add_tail_rcu(&epi->fllink, &tfile->f_ep_links);
	spin_unlock(&tfile->f_lock);

	// 将 epi 监听项添加到 ep 维护的红黑树里面
	ep_rbtree_insert(ep, epi);
	...
}

如前所述，对目标文件的监听是由一个 epitem 结构的监听项变量维护的，所以在 ep_insert 函数里面，首先调用 kmem_cache_alloc 函数，从 slab 分配器里面分配一个 epitem 结构监听项，然后对该结构进行初始化（在 ep_insert 中初始化了 epitem，然后初始化了事件就绪时候的回调函数）
sys_epoll_ctl -> ep_insert -> ep_item_poll

static inline unsigned int ep_item_poll(struct epitem *epi, poll_table *pt)
{
	pt->_key = epi->event.events;
	return epi->ffd.file->f_op->poll(epi->ffd.file, pt) & epi->event.events;
}

ep_item_poll 函数里面，调用目标文件的 poll 函数，这个函数针对不同的目标文件而指向不同的函数，如果目标文件为套接字，这个 poll 就指向 sock_poll，而如果目标文件为 tcp 套接字，这个 poll 就是 tcp_poll。虽然 poll 指向的函数可能会不同，但是其作用都是一样的，就是获取目标文件当前产生的事件位，并且将监听项绑定到目标文件的 poll 钩子里面（最重要的是注册 ep_ptable_queue_proc 这个 poll callback 回调函数），这步操作完成后，以后目标文件产生事件就会调用 ep_ptable_queue_proc 回调函数。  // 在最后有详细解释
若目标文件为套接字，accept 调用链的关键路径：

accept
      |->accept4
            |->sock_attach_fd(newsock, newfile, flags & O_NONBLOCK);
                  |->init_file(file,...,&socket_file_ops);
                        |->file->f_op = fop;
                         /* file->f_op = &socket_file_ops */
            |->fd_install(newfd, newfile); // 安装fd

由 accept 获得的 client_fd 结构如下图：
![][sockfd]
sys_epoll_ctl -> ep_insert -> ep_item_poll -> sock_poll
sock_poll 的调用路径如下：

sock_poll /* epi->ffd.file->f_op->poll(epi->ffd.file, pt) */;
	|->sock->ops->poll
		|->tcp_poll
			/* 拿到 sk_sleep 用于 KSE(进程/线程)的唤醒 */
			|->sock_poll_wait(file, sk->sk_sleep, wait);
				|->poll_wait
			  	    |->p->qproc(file, wait_address, p);
				    /* p为&epq.pt,而且 &epq.pt->qproc = ep_ptable_queue_proc */
				        |-> ep_ptable_queue_proc(filp,wait_address,p);

绕了一大圈，回调函数的安装其实就是调用了 eventpoll.c 中的 ep_ptable_queue_proc，而且向其中传递了 sk->sk_sleep 作为其 waitqueue 的 head，其源码如下所示：

static void ep_ptable_queue_proc(struct file *file, wait_queue_head_t *whead,
				                      poll_table *pt)
{
   // 取出当前 client_fd 对应的 epitem
	struct epitem *epi = ep_item_from_epqueue(pt);
	struct eppoll_entry *pwq;

	if (epi->nwait >= 0 && (pwq = kmem_cache_alloc(pwq_cache, GFP_KERNEL))) {
      // &pwq->wait->func = ep_poll_callback，用于回调唤醒 epoll_wait
		init_waitqueue_func_entry(&pwq->wait, ep_poll_callback);
      // whead 是 sk->sk_sleep，将当前的 waitqueue 链入到 socket 对应的 sleep 列表
		add_wait_queue(whead, &pwq->wait);
	}
    ...
}

这样 client_fd 的结构进一步完善，如下图所示：
![][clientfd]
ep_poll_callback 函数用于唤醒对应 epoll_wait。
查看 ep_insert 最后一部分代码：

	/* If the file is already "ready" we drop it inside the ready list */
	if ((revents & event->events) && !ep_is_linked(&epi->rdllink)) {
		list_add_tail(&epi->rdllink, &ep->rdllist);
		ep_pm_stay_awake(epi);

		/* Notify waiting tasks that events are available */
		if (waitqueue_active(&ep->wq)) wake_up_locked(&ep->wq);
		if (waitqueue_active(&ep->poll_wait)) pwake++;
	}

	/* We have to call this outside the lock */
	if (pwake) ep_poll_safewake(&ep->poll_wait);

ep_insert 调用 ep_item_poll 去获取目标文件产生的事件位，在调用 epoll_ctl 前这段时间，可能会产生相关进程需要监听的事件，如果有监听的事件产生(revents & event->events 为 true)，并且目标文件相关的监听项没有链接到 ep 的准备链表 rdlist 里面的话 !ep_is_linked(&epi->rdllink)，就将该监听项添加到 ep 的 rdlist 准备链表里面，rdlist 链接的是该 epoll 描述符监听的所有已经就绪的目标文件的监听项。并且，如果有任务在等待产生事件时，就调用 wake_up_locked 唤醒所有正在等待的任务，处理相应的事件。当进程调用 epoll_wait 时，该进程就出现在 ep 的 wq 等待队列里面。
epoll_wait
epoll_wait 接口的作用是等待事件的发生，内核源码实现：

SYSCALL_DEFINE4(epoll_wait, int, epfd, struct epoll_event __user *, events,
		          int, maxevents, int, timeout)
{
	struct fd f;
	struct eventpoll *ep;

   // 对进程传来的参数进行检查
   // 1. maxevents 必须大于 0 并且小于 EP_MAX_EVENTS
	if (maxevents <= 0 || maxevents > EP_MAX_EVENTS) return -EINVAL;
   // 2. 内核必须有对 events 变量写文件的权限
	if (!access_ok(VERIFY_WRITE, events, maxevents * sizeof(struct epoll_event)))
        return -EFAULT;
   // 3. epfd 代表的文件必须是个真正的 epoll 文件
	f = fdget(epfd);
	if (!is_file_epoll(f.file)) goto error_fput;

	// 获得 epfd 对应的 epollevent 结构体
	ep = f.file->private_data;
	/* Time to fish for events ... */
	error = ep_poll(ep, events, maxevents, timeout);
}

参数全部检查合格后，调用 ep_poll 函数进行真正的处理：
sys_epoll_wait -> ep_poll

static int ep_poll(struct eventpoll *ep, struct epoll_event __user *events,
		             int maxevents, long timeout)
{
	wait_queue_t wait;
	// 对等待时间进行处理：1)>0，等待 timeout 时间后超时;2)=0，函数不阻塞，直接返回
   // 以下为 timeout < 0，永久阻塞，直到有事件产生才返回
fetch_events:
   ...
	if (!ep_events_available(ep)) {
		/* We don't have any available event to return to the caller.
		 * We need to sleep here, and we will be wake up by
		 * ep_poll_callback() when events will become available. */
     // 当没有事件产生时，将当前 task_struct 写入到 waitqueue 中以便唤醒
     // wq_entry->func = default_wake_function;
	  init_waitqueue_entry(&wait, current);
     // 链入到 ep->wq 等待队列里
		__add_wait_queue_exclusive(&ep->wq, &wait);

		for (;;) {  // for 的无限循环，等待事件到来
			/* We don't want to sleep if the ep_poll_callback() sends us
			 * a wakeup in between. That's why we set the task state
			 * to TASK_INTERRUPTIBLE before doing the checks. */
        // 将当前进程设置为可中断的睡眠状态，然后当前进程就让出 CPU，进入睡眠，
        // 直到有其他进程调用 wake_up 或者有中断信号进来唤醒本进程，它才会去执行接下来的代码
			set_current_state(TASK_INTERRUPTIBLE);
        // 当进程被唤醒后：首先检查是否有事件产生，或者是否出现超时
			if (ep_events_available(ep) || timed_out) break;
        // 检查是否是被其他信号唤醒，即当前进程是否有信号需要处理
			if (signal_pending(current)) { res = -EINTR; break; }
        // schedule 调度，让出 CPU
			schedule_hrtimeout_range(to, slack, HRTIMER_MODE_ABS)
		}

     // 将当前进程从 ep->wp 的等待队列里面移除，表明超时或者有事件触发等动作导致进程重新调度
		__remove_wait_queue(&ep->wq, &wait);
     // 将当前进程设置为 TASK_RUNNING 就绪状态
		__set_current_state(TASK_RUNNING);
	}
check_events:
   // 检查是否有可用事件
	eavail = ep_events_available(ep);

   // 向用户空间拷贝就绪事件
	ep_send_events(ep, events, maxevents);
}

上述逻辑如下图所示：
![][epollwaitjpg]
sys_epoll_wait -> ep_poll -> ep_send_events

static int ep_send_events(struct eventpoll *ep,
			  struct epoll_event __user *events, int maxevents)
{
	struct ep_send_events_data esed;
	esed.maxevents = maxevents;
	esed.events = events;
	return ep_scan_ready_list(ep, ep_send_events_proc, &esed, 0, false);
}

sys_epoll_wait -> ep_poll -> ep_send_events -> ep_scab_ready_list

static int ep_scan_ready_list(struct eventpoll *ep,
			      int (*sproc)(struct eventpoll *, struct list_head *, void *),
			      void *priv, int depth, bool ep_locked)
{
	...
	/* Steal the ready list, and re-init the original one to the
	 * empty list. Also, set ep->ovflist to NULL so that events
	 * happening while looping w/out locks, are not lost. We cannot
	 * have the poll callback to queue directly on ep->rdllist,
	 * because we want the "sproc" callback to be able to do it
	 * in a lockless way. */
	spin_lock_irqsave(&ep->lock, flags);
	list_splice_init(&ep->rdllist, &txlist);  // 将 epfd 的 rdllist 链入到 txlist
	ep->ovflist = NULL;

	// Now call the callback function.
	error = (*sproc)(ep, &txlist, priv);

	// 处理ovflist,即在执行回调函数 sproc 过程中又到来的事件
}

ep_scan_ready_list 首先将 ep 就绪链表里面的数据链接到一个全局的 txlist 里面，然后清空 ep 的就绪链表，同时将 ep 的 ovflist 链表设置为 NULL，ovflist 为单链表，是一个接受就绪事件的备份链表，当内核进程将事件从内核拷贝到用户空间时，这段时间目标文件可能会产生新的事件，这个时候，就需要将新的时间链入到 ovlist 里面。
紧接着，调用 sproc 回调函数（这里将调用 ep_send_events_proc 函数），将事件数据从内核拷贝到用户空间。在 sproc 回调结束后，需要重新将 ovlist 链表里面的事件添加到 rdllist 就绪事件链表里面。同时在最后，如果 rdlist 不为空（表示是否有就绪事件），并且有进程等待该事件，就调用 wake_up_locked 再一次唤醒内核进程处理事件的到达（流程跟前面一样，也就是将事件拷贝到用户空间）。
sys_epoll_wait -> ep_poll -> ep_send_events -> ep_scan_ready_list -> ep_send_events_proc

static int ep_send_events_proc(struct eventpoll *ep, struct list_head *head,
			                       void *priv)
{
	struct ep_send_events_data *esed = priv;
   // 遍历 ready list 就绪队列
	for (eventcnt = 0, uevent = esed->events;
	     !list_empty(head) && eventcnt < esed->maxevents;) {
		epi = list_first_entry(head, struct epitem, rdllink);
     // readylist 只是表明当前 epi 有事件，具体的事件信息还是得调用对应 file 的 poll
     // 根据 tcp 本身的信息设置掩码(mask)等信息&兴趣事件掩码，
     // 则可以得知当前事件是否是 epoll_wait 感兴趣的
		revents = ep_item_poll(epi, &pt);
		if (revents) {
			// deliver the event to userspace 将事件数据从内核拷贝到用户空间
			...
			else if (!(epi->event.events & EPOLLET)) {
           // 如果不是边缘触发，则将当前的 epi 重新加回到就绪队列中
				/* If this file has been added with Level
				 * Trigger mode, we need to insert back inside
				 * the ready list, so that the next call to
				 * epoll_wait() will check again the events
				 * availability. At this point, no one can insert
				 * into ep->rdllist besides us. The epoll_ctl()
				 * callers are locked out by
				 * ep_scan_ready_list() holding "mtx" and the
				 * poll callback will queue them in ep->ovflist. */
				list_add_tail(&epi->rdllink, &ep->rdllist);
				ep_pm_stay_awake(epi);
			}
        // 如果是边缘触发，那么就不加回可用列表，
        // 因此只能等到下一个可用事件触发的时候才会将对应的epi放到可用列表里面
		}
     // 如 poll 出来的 revents 事件 epoll_wait 不感兴趣(或者本来就没有事件)，
     // 也不会加回到可用列表
	}
	return eventcnt;
}

上述代码逻辑如下所示：
![][sproc]
至此，epoll_wait 的流程就结束了。但有一个问题，前面提到的进程调用 epoll_wait 后会睡眠（for 的无限循环），那这个进程什么时候被唤醒呢？

	/* Initialize the poll table using the queue callback */
	epq.epi = epi;
	init_poll_funcptr(&epq.pt, ep_ptable_queue_proc);
	revents = ep_item_poll(epi, &epq.pt);

在调用 epoll_ctl 为目标文件注册监听项时，对目标文件的监听项注册一个 ep_ptable_queue_proc 回调函数，ep_ptable_queue_proc 回调函数将进程添加到目标文件的 wakeup 链表里面，并且注册 ep_poll_callbak 回调，当目标文件产生事件时，ep_poll_callbak 回调就去唤醒等待队列里面对应 epoll_wait 的进程。
ep_poll_callback 函数用于唤醒对应 epoll_wait：

static int ep_poll_callback(wait_queue_t *wait, unsigned mode,
 				                 int sync, void *key)
{
   // 获取 wait 对应的 epitem
	struct epitem *epi = ep_item_from_wait(wait);
   // epitem 对应的 eventpoll 结构体
	struct eventpoll *ep = epi->ep;

   // 当将事件数据从内核拷贝到用户空间时，有事件到来，暂存在 ep->ovflist 中，等待后续处理
   ...
	// 如果当前 epi 没有被链入 ep 的 ready list，则链入
   // 这样，就把当前的可用事件加入到epoll的可用列表了
	if (!ep_is_linked(&epi->rdllink)) {
		list_add_tail(&epi->rdllink, &ep->rdllist);
		ep_pm_stay_awake_rcu(epi);
	}

   // 如果有 epoll_wait 在等待的话，则唤醒这个 epoll_wait 进程
   // 对应的 &ep->wq 是在 epoll_wait 调用的时候通过
	// init_waitqueue_entry(&wait, current) 生成的
   // 其中的 current 即是对应调用 epoll_wait 的进程信息 task_struct
	if (waitqueue_active(&ep->wq))
		wake_up_locked(&ep->wq);
}

![][wakeup]
最后 wake_up_locked 调用 __wake_up_common，然后调用了在 init_waitqueue_entry 注册的default_wake_function，调用路径为:

wake_up_locked
	  |->__wake_up_common
		  |->default_wake_function
			  |->try_wake_up (wake up a thread)
				  |->activate_task
				     |->enqueue_task    running

将 epoll_wait 进程推入可运行队列，等待内核重新调度进程，然后 epoll_wait 对应的这个进程重新运行后，就从 schedule 恢复，继续下面的 ep_send_events（向用户空间拷贝事件并返回）。
wake_up 过程如下图所示：
![][schedule]


总结一下 epoll_wait 函数： epoll_wait 函数会使调用它的进程进入睡眠（timeout为0时除外），如果有被监听的事件产生，该进程被唤醒，同时将事件数据从内核拷贝到用户空间返回给该进程。

![][awake]

关闭描述符(close fd)
值得注意的是，我们在 close 对应的文件描述符的时候，会自动调用 eventpoll_release 将对应的 file 从其关联的 epoll_fd 中删除，kernel 关键路径如下：

close fd
      |->file_close
            |->fput
                  |->__fput
                        |->eventpoll_release
                              |->ep_remove

所以我们在关闭对应的文件描述符后，并不需要通过 epoll_ctl(EPOLL_CTL_DEL) 来删掉对应 epoll 中相应的描述符。


[file]: file.jpg width=520px height=214px

[sockfd]: sockfd.jpg width=501px height=328px

[clientfd]: clientfd.jpg width=500px height=345px

[epollwaitjpg]: epollwaitjpg.png width=499px height=346px

[sproc]: sproc.jpg width=500px height=337px

[wakeup]: wakeup.jpg width=509px height=269px

[schedule]: schedule.jpg width=506px height=289px

[awake]: awake.png width=499px height=347px