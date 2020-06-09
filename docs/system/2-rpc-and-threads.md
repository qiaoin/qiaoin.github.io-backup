---
title: RPC 和线程
---

the combination of threads and garbage collection is particularly important

Threads are the main tool to manage concurrency in programs. And concurrency is a particular interest in distributed programming.

Go routines == Threads

Why Threads are quite a bit interested in distributed systems?

- I/O Concurrency
- Mutil-core parallelism
- Convenience: 周期性任务，master 检查各 slaves 的心跳

asynchronous programming 异步编程
event-driven programming 事件驱动

process 进程
thread 线程 二者的区别

Q: When a context switch happens, does it happen for all threads?

Thread Challenges:

- shared data, race condition, mutex lock
- coordination,
  - channels
  - sycn. cond
  - waitGroup
- Deadlock

web crawler 网络爬虫

1. 记住已经爬取过的页面，不重复爬取；
2. 并行爬取；
3. 什么时候应该停止爬取？

```go
//
// Serial crawler
//
func Serial(url string, fetcher Fetcher, fetched map[string]bool) {
    if fetched[url] {
        return
    }
    fetched[url] = true
    urls, err := fetcher.Fetch(url)
    if err != nil {
        return
    }
    for _, u := range urls {
        Serial(u, fetcher, fetched)
    }
    return
}
```

bfs 深度优先遍历

```go
//
// Concurrent crawler with shared state and Mutex
//
type fetchState struct {
    mu      sync.Mutex
    fetched map[string]bool
}

func ConcurrentMutex(url string, fetcher Fetcher, f *fetchState) {
    f.mu.Lock()
    already := f.fetched[url]
    f.fetched[url] = true
    f.mu.Unlock()

    if already {
        return
    }

    urls, err := fetcher.Fetch(url)
    if err != nil {
        return
    }
    var done sync.WaitGroup
    for _, u := range urls {
        done.Add(1)
        go func(u string) {
            defer done.Done()
            ConcurrentMutex(u, fetcher, f)
        }(u)
    }
    done.Wait()
    return
}
```

- defer
- 匿名函数这里为什么需要传入一个参数？这里是由于，for-range 遍历时定义的 u，在第一次为 url1，传入第一个 go routine，接下来遍历到第二个 url2，传入第二个 go routine，我们希望得到 u 的一份 copy，而不是每次循环都更新 u，因为可能循环更新的时候，之前 launch 的 go routine 还未读取到之前的旧的 u，而读取到了更新的 u，这是不符合预期的
- 如果一个 inner func 使用了一个 surrounding func 的变量，但 surrounding func returns，这时，inner func 使用的变量指向哪里？Go 分析出闭包（closures）使用了 outer func 的变量，编译器会在 heap 上分配内存。
- WaitGroup, Add, Done, Wait

find races in practice - using automated tools, go race detector
命令行运行时，go run -race xxx.go

- 使用线程池，thread pool

```go
//
// Channels
//
func worker(url string, ch chan []string, fetcher Fetcher) {
    urls, err := fetcher.Fetch(url)
    if err != nil {
        ch <- []string{}
    } else {
        ch <- urls
    }
}

func master(ch chan []string, fetcher Fetcher) {
    n := 1
    fetched := make(map[string]bool)
    for urls := range ch {
        for _, u := range urls {
            if fetched[u] == false {
                fetched[u] = true
                n += 1
                go worker(u, ch, fetcher)
            }
        }
        n -= 1
        if n == 0 {
            break
        }
    }
}

func ConcurrentChannel(url string, fetcher Fetcher) {
    ch := make(chan []string)
    go func() {
        ch <- []string{url}
    }()
    master(ch, fetcher)
}
```

- ch is a channel, and the channel has send and receive operations. And the workers are sending on the channel, while the master receives on the channel
- the internal of channel has a mutex in it
- master func 中的 for-range-ch 会一直等待，直到 channel 上有数据
