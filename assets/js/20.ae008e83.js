(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{265:function(t,v,_){"use strict";_.r(v);var i=_(29),e=Object(i.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"操作系统概述"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#操作系统概述"}},[t._v("#")]),t._v(" 操作系统概述")]),t._v(" "),_("h2",{attrs:{id:"操作系统结构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#操作系统结构"}},[t._v("#")]),t._v(" 操作系统结构")]),t._v(" "),_("p",[_("strong",[t._v("什么是操作系统？")]),t._v("（没有公认的精确定义）")]),t._v(" "),_("ul",[_("li",[t._v("操作系统是一个控制程序")]),t._v(" "),_("li",[t._v("一个系统软件")]),t._v(" "),_("li",[t._v("控制程序执行过程，防止错误和计算机的不当使用")]),t._v(" "),_("li",[t._v("执行用户程序，给用户程序提供各种服务")]),t._v(" "),_("li",[t._v("方便用户使用计算机系统")]),t._v(" "),_("li",[t._v("操作系统是一个资源管理器")]),t._v(" "),_("li",[t._v("应用程序与硬件之间的中间层")]),t._v(" "),_("li",[t._v("管理各种计算机软硬件资源")]),t._v(" "),_("li",[t._v("提供访问计算机软硬件资源的高效手段")]),t._v(" "),_("li",[t._v("解决资源访问冲突，确保资源公平使用")])]),t._v(" "),_("p",[_("strong",[t._v("操作系统内核特征")]),t._v("：")]),t._v(" "),_("ol",[_("li",[t._v("并发，计算机系统中同时存在多个运行的程序，需要 OS 管理和调度")]),t._v(" "),_("li",[t._v("共享，宏观上是“同时”访问，微观上需实现互斥共享")]),t._v(" "),_("li",[t._v("虚拟，利用多道程序设计技术，让每个用户都觉得有一个计算机专门为他服务")]),t._v(" "),_("li",[t._v("异步，程序的执行不是一贯到底的，而是走走停停，向前推进的速度不可预知；但只要运行环境相同，OS 需要保证程序运行的结果也要相同")])]),t._v(" "),_("p",[_("strong",[t._v("操作系统研究的顶级会议：")])]),t._v(" "),_("ul",[_("li",[t._v("ACM 操作系统原理研讨会（SOSP）：奇数年")]),t._v(" "),_("li",[t._v("USENIX 操作系统设计和实现研讨会（OSDI）：偶数年")])]),t._v(" "),_("p",[_("strong",[t._v("最具影响力的操作系统论文：")])]),t._v(" "),_("ul",[_("li",[_("a",{attrs:{href:"https://www.sigops.org/awards/hof/",target:"_blank",rel:"noopener noreferrer"}},[t._v("SIGOPS Hall-of-Fame Awards"),_("OutboundLink")],1),t._v(" "),_("ol",[_("li",[t._v("论文必须发表在同行评议的文献中至少十年")]),t._v(" "),_("li",[t._v("到目前为止有三十多篇论文获奖")])])]),t._v(" "),_("li",[t._v("操作系统研究，需要阅读和理解这些论文")])]),t._v(" "),_("p",[_("strong",[t._v("操作系统中满是权衡 tradeoff：")])]),t._v(" "),_("ul",[_("li",[t._v("并发性是一小部分")]),t._v(" "),_("li",[t._v("磁盘调度大多是不想干的")]),t._v(" "),_("li",[t._v("进程调度是个比较小话题")])]),t._v(" "),_("h3",{attrs:{id:"操作系统结构分类"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#操作系统结构分类"}},[t._v("#")]),t._v(" 操作系统结构分类")]),t._v(" "),_("ol",[_("li",[t._v("简单结构\n"),_("ul",[_("li",[t._v("MS-DOS 在最小的空间，设计用于提供大部分功能（1981 年）")]),t._v(" "),_("li",[t._v("没有拆分为模块")]),t._v(" "),_("li",[t._v("虽然 MS-DOS 在接口和功能水平没有很好地分离，主要用汇编编写\n"),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/ms-dos.png",width:"129px",height:"123px",alt:"ms-dos"}})])])])]),t._v(" "),_("li",[t._v("分层结构\n"),_("ul",[_("li",[t._v("操作系统分为很多层（levels），每层建立在低层之上，最底层 (layer 0) 是硬件，最上层 (layer N) 是用户界面")]),t._v(" "),_("li",[t._v("使用模块化，每一层仅使用更低一层的功能（操作）和服务\n"),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/layer.png",width:"180px",height:"179px",alt:"layer"}})])])])]),t._v(" "),_("li",[t._v("微内核结构 Microkernel\n"),_("ul",[_("li",[t._v("尽可能把内核功能移到用户空间，在内核里面只保留进程间通信（IPC）和底下对硬件的支持（HAL）")]),t._v(" "),_("li",[t._v("用户模块间的通信使用消息传递")]),t._v(" "),_("li",[t._v("安全性和可扩展性得到大幅提升，但性能会有大幅下降\n"),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/microkernel.png",width:"214px",height:"163px",alt:"microkernel"}})])])])]),t._v(" "),_("li",[t._v("外核结构 Exokernel\n"),_("ul",[_("li",[t._v("让内核分配机器的物理资源给多个应用程序，并让每个程序决定如何处理这些资源")]),t._v(" "),_("li",[t._v("程序能链接道操作系统库（libOS）实现操作系统抽象")]),t._v(" "),_("li",[t._v("保护和控制分离（只提供资源的保护和隔离，把资源的管理交给应用程序）")]),t._v(" "),_("li",[t._v("类似现在所谓“虚拟机”的结构\n"),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/exokernel.png",width:"266px",height:"163px",alt:"exokernel"}})])])])])]),t._v(" "),_("h3",{attrs:{id:"vmm（虚拟机管理器）"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#vmm（虚拟机管理器）"}},[t._v("#")]),t._v(" VMM（虚拟机管理器）")]),t._v(" "),_("p",[t._v("虚拟机管理器将单独的机器接口转换成很多的虚拟机，每个虚拟机都是一个原始计算机系统的有效副本，并能完成所有的处理器指令。")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/vmm.png",width:"265px",height:"135px",alt:"vmm"}})]),t._v(" "),_("p",[t._v("虚拟机管理器负责资源的隔离，操作系统负责资源的管理")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/vmm-with-or-without.png",width:"511px",height:"259px",alt:"vmm-with-or-without"}})]),t._v(" "),_("p",[t._v("虚拟机的介绍【TODO】")]),t._v(" "),_("h2",{attrs:{id:"x86-32-硬件"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#x86-32-硬件"}},[t._v("#")]),t._v(" x86-32 硬件")]),t._v(" "),_("h3",{attrs:{id:"x86-32-硬件-运行模式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#x86-32-硬件-运行模式"}},[t._v("#")]),t._v(" x86-32 硬件-运行模式")]),t._v(" "),_("p",[t._v("80386 有四种运行模式：实模式、保护模式、SMM 模式和虚拟 8086 模式。")]),t._v(" "),_("ul",[_("li",[t._v("实模式：80386 加电启动后处于实模式运行状态，在这种状态下软件可访问的物理内存空间不能超过 1MB，且无法发挥 Intel 80386 以上级别的 32 位 CPU 的 4GB 内存管理能力。")]),t._v(" "),_("li",[t._v("保护模式："),_("strong",[t._v("支持内存分页机制，提供了对虚拟内存的良好支持")]),t._v("。保护模式下 80386 支持多任务，还支持优先级机制，不同的程序可以运行在不同的优先级上。优先级一共分 0～34 个级别，操作系统运行在最高的优先级 0 上，应用程序则运行在比较低的级别上；配合良好的检查机制后，既可以在任务间实现数据的安全共享，也可以很好地隔离各个任务。")])]),t._v(" "),_("h3",{attrs:{id:"x86-32-硬件-内存构架"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#x86-32-硬件-内存构架"}},[t._v("#")]),t._v(" x86-32 硬件-内存构架")]),t._v(" "),_("ul",[_("li",[t._v("地址是访问内存空间的索引。")]),t._v(" "),_("li",[t._v("80386 是 32 位的处理器，即可以寻址的物理内存地址空间为 2^32=4G 字节")]),t._v(" "),_("li",[t._v("物理内存地址空间是处理器提交到总线上用于访问计算机系统中的内存和外设的最终地址。一个计算机系统中只有一个物理地址空间。")]),t._v(" "),_("li",[t._v("线性地址空间是在操作系统的虚存管理之下每个运行的应用程序能访问的地址空间。每个运行的应用程序都认为自己独享整个计算机系统的地址空间，这样可让多个运行的应用程序之间相互隔离。")]),t._v(" "),_("li",[t._v("逻辑地址空间是应用程序直接使用的地址空间。")])]),t._v(" "),_("p",[_("strong",[t._v("段机制启动、页机制未启动")]),t._v("：逻辑地址 -> 段机制处理 -> 线性地址 = 物理地址")]),t._v(" "),_("p",[_("strong",[t._v("段机制和页机制都启动")]),t._v("：逻辑地址 -> 段机制处理 -> 线性地址 -> 页机制处理 -> 物理地址")]),t._v(" "),_("h3",{attrs:{id:"x86-32-硬件-寄存器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#x86-32-硬件-寄存器"}},[t._v("#")]),t._v(" x86-32 硬件-寄存器")]),t._v(" "),_("p",[t._v("80386 的寄存器可以分为 8 组：")]),t._v(" "),_("ol",[_("li",[t._v("通用寄存器\n"),_("ul",[_("li",[t._v("EAX：累加器")]),t._v(" "),_("li",[t._v("EBX：基址寄存器")]),t._v(" "),_("li",[t._v("ECX：计数器")]),t._v(" "),_("li",[t._v("EDX：数据寄存器")]),t._v(" "),_("li",[t._v("ESI：源地址指针寄存器")]),t._v(" "),_("li",[t._v("EDI：目的地址指针寄存器")]),t._v(" "),_("li",[t._v("EBP：基址指针寄存器")]),t._v(" "),_("li",[t._v("ESP：堆栈指针寄存器")])])]),t._v(" "),_("li",[t._v("段寄存器\n"),_("ul",[_("li",[t._v("CS：代码段(Code Segment)")]),t._v(" "),_("li",[t._v("DS：数据段(Data Segment)")]),t._v(" "),_("li",[t._v("ES：附加数据段(Extra Segment)")]),t._v(" "),_("li",[t._v("SS：堆栈段(Stack Segment)")]),t._v(" "),_("li",[t._v("FS：附加段")]),t._v(" "),_("li",[t._v("GS：附加段")])])]),t._v(" "),_("li",[t._v("指令指针寄存器\n"),_("ul",[_("li",[t._v("EIP：指令寄存器，EIP 的低 16 位就是 8086 的 IP，它存储的是下一条要执行指令的内存地址，在分段地址转换中，表示指令的段内偏移地址。")])])]),t._v(" "),_("li",[t._v("标志寄存器 EFLAGS\n"),_("ul",[_("li",[t._v("IF(Interrupt Flag)：中断允许标志位，由 CLI，STI 两条指令来控制；设置 IF 使 CPU 可识别外部（可屏蔽）中断请求。复位 IF 则禁止中断。 IF 对不可屏蔽外部中断和故障中断的识别没有任何作用。")]),t._v(" "),_("li",[t._v("CF")]),t._v(" "),_("li",[t._v("PF")]),t._v(" "),_("li",[t._v("ZF ...")])])]),t._v(" "),_("li",[t._v("控制寄存器")]),t._v(" "),_("li",[t._v("系统地址寄存器")]),t._v(" "),_("li",[t._v("调试寄存器")]),t._v(" "),_("li",[t._v("测试寄存器")])]),t._v(" "),_("h2",{attrs:{id:"操作系统启动流程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#操作系统启动流程"}},[t._v("#")]),t._v(" 操作系统启动流程")]),t._v(" "),_("p",[_("strong",[t._v("Q1")]),t._v("：计算机系统在加电的时候，从什么地方读取的第一条指令，即 CPU 在加电之后，执行的第一条指令在哪里？从磁盘的什么地方读的 OS 内容？")]),t._v(" "),_("h3",{attrs:{id:"启动时计算机内存和磁盘布局"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#启动时计算机内存和磁盘布局"}},[t._v("#")]),t._v(" 启动时计算机内存和磁盘布局")]),t._v(" "),_("p",[t._v("在计算机系统加电的时候（CPU 在初始化完成之后），代码段寄存器和当前指针。在加电的时候，系统处于实模式下，20 位的地址空间，并不是通常系统的 32 位。BIOS 启动固件这块代码为了从磁盘上读数据，实现了相应的一些服务：")]),t._v(" "),_("ul",[_("li",[t._v("基本输入输出程序（"),_("strong",[t._v("B")]),t._v("asic "),_("strong",[t._v("I")]),t._v("nput/"),_("strong",[t._v("O")]),t._v("utput System，"),_("strong",[t._v("B")]),t._v("IOS）：从磁盘上读取数据，从键盘上读用户的输入，在显示器上显示相应的输出。BIOS 以中断调用的方式，提供了基本的输入输出功能（只能在 x86 的实模式下访问）\n"),_("ul",[_("li",[t._v("INT 10h：字符显示")]),t._v(" "),_("li",[t._v("INT 13h：磁盘扇区读写")]),t._v(" "),_("li",[t._v("INT 15h：检测内存大小")]),t._v(" "),_("li",[t._v("INT 16h：键盘输入")])])]),t._v(" "),_("li",[t._v("系统设置信息：从硬盘启动，从网络启动，从光盘启动，依据这些设置系统执行启动程序，从硬盘将加载程序和操作系统内容加载到系统中来")]),t._v(" "),_("li",[t._v("开机后自检程序")]),t._v(" "),_("li",[t._v("系统自启动程序等等")])]),t._v(" "),_("h3",{attrs:{id:"加载程序的内存地址空间"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#加载程序的内存地址空间"}},[t._v("#")]),t._v(" 加载程序的内存地址空间")]),t._v(" "),_("p",[t._v("BIOS 启动时，在其初始化完成之后")]),t._v(" "),_("ol",[_("li",[t._v("从磁盘上读引导扇区：将加载程序从磁盘的引导扇区（512 字节）加载到 0x7c00")]),t._v(" "),_("li",[t._v("跳转到 CS:IP = 0000:7c00，现在将控制权转移到从磁盘上读进来的程序（加载程序）")]),t._v(" "),_("li",[t._v("执行加载程序\n"),_("ul",[_("li",[t._v("将操作系统的代码和数据从硬盘加载到内存中")]),t._v(" "),_("li",[t._v("跳转到操作系统的起始地址，将控制权转移给操作系统程序，继续执行操作系统的功能")])])])]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/bios-bootloader.png",width:"504px",height:"289px",alt:"bios-bootloader"}})]),t._v(" "),_("p",[t._v("计算机启动 boot，“pull oneself up by one's bootstrap”，自举。计算机启动是一个很矛盾的过程：必须先运行程序，然后计算机才能启动，但是计算机不启动就无法运行程序。在现在的计算机中，启动是这样做的：")]),t._v(" "),_("p",[t._v("加电 -> CPU 执行内存地址为 0xFFFFFFFF0 的指令（一条跳转指令）-> 跳到 BIOS 程序起始点，执行 BIOS 程序（功能：计算机硬件自检和初始化），自检完成后 -> 选择启动设备并读入第一块扇区（主引导扇区 MBR，加载程序）到内存的 0x7C00 处 -> BIOS 所有工作完成后，CPU 执行内存的 0x7C00 处的程序，即 bootloader")]),t._v(" "),_("p",[_("strong",[t._v("Q2")]),t._v("：为什么 BIOS 直接从磁盘上将操作系统的内核映像读进内存呢？")]),t._v(" "),_("p",[t._v("磁盘上是有文件系统的，文件系统种类繁多，无法将对各种文件系统的类型识别的代码写入 BIOS 中去，因此这里是先度进来加载程序，由加载程序去识别文件系统类型，然后加载操作系统内核映像。")]),t._v(" "),_("h3",{attrs:{id:"系统启动流程（详细）"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#系统启动流程（详细）"}},[t._v("#")]),t._v(" 系统启动流程（详细）")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/bios-mbr-bootloader.png",width:"471px",height:"172px",alt:"bios-mbr-bootloader"}})]),t._v(" "),_("ol",[_("li",[t._v("CPU 初始化：复位芯片给 CPU 的复位管脚发送一个复位信号，CPU 收到复位信号后将所有寄存器重设位默认值，CS = 0xf000，IP = 0xfff0，对应的 PC 为 BIOS 这片 ROM 的起始地址（保存 BIOS 的 ROM 也是 CPU 外设）\n"),_("ul",[_("li",[t._v("CPU 加电稳定后从 0xFFFF0 读第一条指令")]),t._v(" "),_("li",[t._v("CS:IP = 0xf000:fff0 这条地址实际上并不是内存地址，它被地址控制器（南桥北桥）映射到 BIOS ROM 中，而这个地址的 ROM 中存放着一条跳转指令")]),t._v(" "),_("li",[t._v("第一条指令是跳转指令")]),t._v(" "),_("li",[t._v("CPU 初始状态是 16 位实模式，CS:IP 是 16 位寄存器，指令指针 PC = 16*CS+IP")]),t._v(" "),_("li",[t._v("最大地址空间是 1MB（放置在内存中的 BIOS 的位置只能是在最底下的 1MB）")])])]),t._v(" "),_("li",[t._v("BIOS 初始化过程\n"),_("ul",[_("li",[t._v("硬件自检 POST，检测系统中内存和显卡等关键部件的存在和工作状态，查找并执行显卡等接口卡 BIOS，进行设备初始化")]),t._v(" "),_("li",[t._v("执行系统 BIOS，进行系统检测，检测和配置系统中安装的即插即用设备")]),t._v(" "),_("li",[t._v("更新 CMOS 中的扩展系统配置数据 ESCD（系统配置表）。CMOS 保存计算机基本启动信息的芯片，是主板上一块可读写的并行或串行 FLASH 芯片，用来保存 BIOS 的硬件配置和用户对某些参数的设定")]),t._v(" "),_("li",[t._v("按指定启动顺序从软盘、硬盘或光驱或者其他设备启动，读进第一块扇区（512 字节）")])])]),t._v(" "),_("li",[t._v("主引导记录（Master Boot Record）\n"),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/mbr.png",width:"394px",height:"103px",alt:"mbr"}})]),t._v(" "),_("ul",[_("li",[t._v("启动代码（446 字节）：1）检查分区表正确性；2）加载并跳转到磁盘上的引导程序（活动分区的引导记录）")]),t._v(" "),_("li",[t._v("硬盘分区表（64 字节）：1）描述分区状态和位置；2）每个分区描述信息占据 16 字节")]),t._v(" "),_("li",[t._v("结束标志字（2 字节，55AA）：主引导记录的有效标志（合法的主引导记录）")]),t._v(" "),_("li",[t._v("BIOS 按照“启动顺序”，把控制权转交给排在第一位的存储设备，这是，计算机读取该设备的第一个扇区，也就是读取最前面的 512 个字节，如果这 512 个字节的最后两个字节是 0x55 和 0xAA，表示这个设备可以用于启动（合法的，有效的）。如果不是 0x55 和 0xAA，表示设备不能用于启动，控制权于是被转交给“启动顺序”中的下一个设备")]),t._v(" "),_("li",[t._v("（根据硬盘分区表中各分区的描述信息）跳转到活动分区的引导扇区上去")])])]),t._v(" "),_("li",[t._v("活动分区的引导扇区\n"),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/liver.png",width:"321px",height:"79px",alt:"liver"}})]),t._v(" "),_("ul",[_("li",[t._v("跳转指令：跳转到启动代码（与平台相关的代码，CPU 不同，跳转指令不同）")]),t._v(" "),_("li",[t._v("文件卷头：文件系统描述信息")]),t._v(" "),_("li",[t._v("启动代码：跳转到加载程序（加载程序不是存在这 512 字节中的，这里指示真正的加载程序在哪里，加载程序实际上是存储在硬盘上的）")]),t._v(" "),_("li",[t._v("结束标志：55AA")])])]),t._v(" "),_("li",[t._v("加载程序（bootloader）\n"),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/bootloader.png",width:"376px",height:"182px",alt:"bootloader"}})]),t._v(" "),_("ul",[_("li",[t._v("加载程序不是直接去加载内核，而是读一个启动配置文件（正常启动、安全模式启动、调试状态下启动），会导致在加载内核的时候内核的参数会不一样，之后依据配置加载内核")])])])]),t._v(" "),_("h3",{attrs:{id:"系统启动规范"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#系统启动规范"}},[t._v("#")]),t._v(" 系统启动规范")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("BIOS（基本输入输出系统）")]),t._v(" "),_("ul",[_("li",[t._v("固化到计算机主板上的程序")]),t._v(" "),_("li",[t._v("包括系统配置、自检程序和系统自启动程序")]),t._v(" "),_("li",[t._v("BIOS-MBR（最多支持四个分区，从中选择一个活动分区）、BIOS-GPT（全局唯一标识分区表，在分区表中描述更多的分区结构）、PXE（网络启动标准，在 BIOS 里加入网络协议栈）")])])]),t._v(" "),_("li",[_("strong",[t._v("UEFI（统一可扩展固件接口）")]),t._v(" "),_("ul",[_("li",[t._v("接口标准")]),t._v(" "),_("li",[t._v("在所有平台上提供一致的操作系统启动服务")]),t._v(" "),_("li",[t._v("可信启动记录（增加安全性）")])])])]),t._v(" "),_("h2",{attrs:{id:"x86-32-平台的启动顺序"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#x86-32-平台的启动顺序"}},[t._v("#")]),t._v(" x86-32 平台的启动顺序")]),t._v(" "),_("p",[_("strong",[t._v("第一条指令：")])]),t._v(" "),_("p",[t._v("加电之后会置寄存器初始值（CS:EIP），CS = F000H，EIP = 0000FFF0H\n实际地址是（实模式）：Base + EIP = FFFF0000H + 0000FFF0H = FFFFFFF0H，这是 BIOS 的 EPROM（Erasable Programmable Read Only Memory）所在地")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/base-offset.png",width:"421px",height:"159px",alt:"base-offset"}})]),t._v(" "),_("p",[t._v("当 CS 被新值加载，则地址转换规则将开始起作用\n通常第一条指令是一条长跳转指令（执行这条长跳转指令 CS 和 EIP 都会更新）到 BIOS 代码中执行（1MB 地址空间，实模式）")]),t._v(" "),_("p",[_("strong",[t._v("从 BIOS 到 bootloader：")])]),t._v(" "),_("p",[t._v("BIOS 做一些底层的硬件初始化工作，保证机器能够进行后续的正常工作。完成了这些检测工作之后，BIOS 加载存储设备上的第一个扇区（主引导扇区，Master Boot Record，MBR）的 512 字节到内存的 0x7C00，然后跳转到 @0x7C00 的第一条指令开始执行")]),t._v(" "),_("p",[_("strong",[t._v("从 bootloader 到 OS：")])]),t._v(" "),_("p",[t._v("bootloader 要做的事情：")]),t._v(" "),_("ol",[_("li",[t._v("使能保护模式和段机制")]),t._v(" "),_("li",[t._v("从硬盘上读取 kernel in ELF 格式的内核映像（跟在 MBR 后面的扇区）并放到内存中固定位置")]),t._v(" "),_("li",[t._v("跳转到 OS 的入口点（entry point）执行，这时控制权转移到 OS 中（将 CS:EIP 指向操作系统内核所在内存的起始点）")])]),t._v(" "),_("p",[_("strong",[t._v("段机制：")])]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/protected-model.png",width:"436px",height:"200px",alt:"protected-model"}})]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/logical-to-linear.png",width:"462px",height:"196px",alt:"logical-to-linear"}})]),t._v(" "),_("p",[t._v("bootloader 建立 GDT（全局描述符表，Global Descriptor Table，简称段表），给出位置和大小")]),t._v(" "),_("div",{staticClass:"language-asm6502 extra-class"},[_("pre",{pre:!0,attrs:{class:"language-asm6502"}},[_("code",[t._v("lgdt gdtdesc\ngdt:\n    ......\n\ngdtdesc:\n    "),_("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v(".word")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token decimalnumber string"}},[t._v("0")]),_("span",{pre:!0,attrs:{class:"token register variable"}},[t._v("x")]),_("span",{pre:!0,attrs:{class:"token decimalnumber string"}},[t._v("17")]),t._v(" // 段表大小\n    "),_("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v(".long")]),t._v(" gdt  // 段表的起始地址\n")])])]),_("p",[t._v("通过一个内部的寄存器 GDTR 保存段表的起始地址信息，使得 CS、DS、SS 可以和 GDT 表建立好对应关系。GDT 表中每一项（段描述符）的详细表示：")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/segment-descriptor.png",width:"384px",height:"230px",alt:"segment-descriptor"}})]),t._v(" "),_("p",[t._v("我们只需要关注其中的两项，基址 BASE 和段的长度 LIMIT")]),t._v(" "),_("p",[t._v("各个段寄存器怎么来产生 index，以来索引 GDT 表中的项？段寄存器 16 位（段选择子），高 13 位是 GDT 表的 Index，RPL 表示当前段的优先级别（在 x86 里使用两个 bit 来表示优先级别，意味着有 0/1/2/3 四个特权级，一般操作系统在最高的级别 0 特权级，应用程序放在 3 特权级），TI 忽略先（GDT 和 LDT 的选择，全局或局部）")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/segment-selector.png",width:"210px",height:"143px",alt:"segment-selector"}})]),t._v(" "),_("p",[_("strong",[t._v("使能保护模式，段机制能够开始正常工作：")])]),t._v(" "),_("p",[t._v("将 CR0（系统寄存器、控制寄存器）的 bit 0（PE） 置为 1 使能保护模式（protection model），段机制（segment-level protection）在保护模式下是自动使能的")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/control-registers.png",width:"342px",height:"267px",alt:"control-registers"}})]),t._v(" "),_("p",[t._v("总结一下：")]),t._v(" "),_("p",[t._v("bootloader 需要建立好 GDT，GDT 中的每一项是一个段描述符，将相应段的段寄存器 CS/DS/SS 等设置好对应的 Index，使得这些段寄存器能够指向 GDT 中对应的项，这样在使能保护模式之后，段机制能够正常工作")]),t._v(" "),_("p",[_("strong",[t._v("进入保护模式之后，bootloader 就要加载操作系统内核映像：")])]),t._v(" "),_("p",[t._v("OS 编译完之后会生成一个 ELF 格式的执行程序（ELF 格式是在 Linux 中很常用的一种执行文件格式），我们需要知道这个 ELF 格式的文件的内部信息，从而使得 bootloader 能够根据这个文件格式将内核相应的代码、数据放置到内存中的相应地址")]),t._v(" "),_("p",[t._v("bootloader 解析 ELF 格式的信息")]),t._v(" "),_("p",[t._v("ELF header 指出了一个 Program Header，程序段的头，包含了代码段，数据段等等")]),t._v(" "),_("p",[t._v("这里还没有文件系统概念，bootloader 读取的是磁盘扇区")]),t._v(" "),_("p",[_("strong",[t._v("【TODO】解析 ELF 格式信息：")])]),t._v(" "),_("h2",{attrs:{id:"x86-中断处理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#x86-中断处理"}},[t._v("#")]),t._v(" x86 中断处理")]),t._v(" "),_("h3",{attrs:{id:"x86-中的中断源"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#x86-中的中断源"}},[t._v("#")]),t._v(" x86 中的中断源")]),t._v(" "),_("ol",[_("li",[t._v("中断 Interrupts\n"),_("ul",[_("li",[t._v("硬件中断（或外部中断）：串口、硬盘、网卡、时钟...")]),t._v(" "),_("li",[t._v("软件中断：INT n 指令，通常用于系统调用（INT 0x80）")])])]),t._v(" "),_("li",[t._v("异常 Exceptions\n"),_("ul",[_("li",[t._v("程序错误（除零，访问非法地址）")]),t._v(" "),_("li",[t._v("软件产生的异常")]),t._v(" "),_("li",[t._v("INTO，INT 3 和 BOUND")]),t._v(" "),_("li",[t._v("机器检查出的异常 S")])])])]),t._v(" "),_("h3",{attrs:{id:"x86-中的中断处理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#x86-中的中断处理"}},[t._v("#")]),t._v(" x86 中的中断处理")]),t._v(" "),_("p",[t._v("每一个中断或异常对应一个中断号，这个中断号与一个中断服务例程（Interrupt Service Routine，ISR）相关联，其关联关系存储在中断描述符表（Interrupt Descriptor Table，IDT）。IDT 的起始地址和大小保存在中断描述符表寄存器 IDTR 中。")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/IDTR.png",width:"297px",height:"225px",alt:"IDTR"}})]),t._v(" "),_("p",[t._v("IDT 中的每一项都是一个中断门或者陷阱门，就能够得到段选择子（Segment Selector）和偏移（offset）")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/ISR.png",width:"348px",height:"338px",alt:"ISR"}})]),t._v(" "),_("p",[t._v("就能够确定中断服务例程（ISR），产生一个中断之后，得到对应的中断号，CPU 会根据这个中断号查找 IDT 中对应的项（中断门或陷阱门），得到段选择子和偏移（Offset）。以选择子作为 index 进一步查找 GDT 得到段描述符（Base 和 Limit），使用得到的基址（Base）和偏移（Offset）形成相应的线性地址，指向 ISR 中断服务例程。CPU 在硬件层面去访问 IDT 和 GDT，操作系统需要对 IDT 和 GDT 进行初始化。")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/interrupt-call.png",width:"337px",height:"308px",alt:"interrupt-call"}})]),t._v(" "),_("h3",{attrs:{id:"不同特权级的中断切换对堆栈的影响"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#不同特权级的中断切换对堆栈的影响"}},[t._v("#")]),t._v(" 不同特权级的中断切换对堆栈的影响")]),t._v(" "),_("p",[t._v("当产生中断之后，中断会打断当前正在执行的程序（打断程序执行，保存现场），转去执行中断服务例程，中断服务例程执行完毕之后再返回到当前被打断的程序继续执行该程序（程序继续执行，恢复现场）。\n在不同的特权级，处理的方式不一样。特权级在段描述符中的低两位指定，CS 的低两位是 00 表示运行在内核态，CS 的低两位是 11 表示运行在用户态。在内核态产生中断依然在内核态，但在用户态产生中断会切换到内核态中去。对于这两种不同特权级的中断处理，保护现场和恢复现场对应也是不一样的。")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/stack-with-without.png",width:"518px",height:"210px",alt:"stack-with-without"}})]),t._v(" "),_("ol",[_("li",[t._v("发生中断前后处于相同特权级：即执行内核态代码时产生中断。栈没有发生变化，还是使用内核态的栈。只是在栈上压入了一些寄存器\n"),_("ul",[_("li",[t._v("Error code：特定的严重异常，不是每一个中断或异常都会产生 errno")]),t._v(" "),_("li",[t._v("EIP 和 CS：当前被打断的地址，或者是当前被打断的下一条地址")]),t._v(" "),_("li",[t._v("EFlags：标识寄存器的内容")])])]),t._v(" "),_("li",[t._v("发生中断前后处于不同特权级：即应用程序正在用户态执行时产生中断。用户态和内核态使用的栈是不同的，因此产生中断后需要在内核态的栈中压入用户态当前栈的地址\n"),_("ul",[_("li",[t._v("Error code、EIP 和 CS、EFlags")]),t._v(" "),_("li",[t._v("ESP 和 SS：中断时用户态栈的地址")]),t._v(" "),_("li",[t._v("保护现场和恢复现场都会有用户态内核态的切换")])])])]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/iret.png",width:"499px",height:"179px",alt:"iret"}})]),t._v(" "),_("ul",[_("li",[t._v("中断服务例程返回：iret 弹出 EFlags 和 SS/ESP（根据是否改变特权级），如上图示。这些都是硬件完成的功能，如果中断服务例程需要对其他寄存器进行修改，在修改之前，中断服务例程需要把这些寄存器之前的旧值保存起来，在 iret 返回之前需要恢复这些寄存器，赋上旧值，从而确保中断前后的现场是完全相同的")]),t._v(" "),_("li",[t._v("通常的程序运行之后函数返回\n"),_("ul",[_("li",[t._v("ret 弹出 EIP，跳转到函数调用的下一条指令继续执行")]),t._v(" "),_("li",[t._v("retf 弹出 CS 和 EIP，实现远程跳转功能")])])])]),t._v(" "),_("h3",{attrs:{id:"系统调用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#系统调用"}},[t._v("#")]),t._v(" 系统调用")]),t._v(" "),_("p",[t._v("可以理解为一种特殊的中断，陷入（trap）或者称为软中断")]),t._v(" "),_("p",[t._v("用户应用程序通过系统调用访问 OS 内核服务")]),t._v(" "),_("p",[t._v("如何实现？1）需要指定中断号，如何完成从用户态到内核态的切换，以及从内核态回到用户态？使用 trap，通过特殊的指令 SYSENTER/SYSEXIT 或者 INT 0x80 完成软中断，需要在建立中断描述符表（IDT）的时候要对此特殊考虑（用户态执行 INT 0x80 切换到内核态，这里有一个从低优先级到高优先级的转变，这个机制需要在 IDT 表中设置好相应的权限才能够完成这种转变）")]),t._v(" "),_("h2",{attrs:{id:"中断、异常和系统调用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#中断、异常和系统调用"}},[t._v("#")]),t._v(" 中断、异常和系统调用")]),t._v(" "),_("p",[_("strong",[t._v("Q1")]),t._v("：为什么需要中断、异常和系统调用？")]),t._v(" "),_("ul",[_("li",[t._v("在计算机运行中，内核是被信任的第三方（即可以信任操作系统内核）")]),t._v(" "),_("li",[t._v("只有内核可以执行特权指令")]),t._v(" "),_("li",[t._v("提供外接访问的接口，方便应用程序")])]),t._v(" "),_("p",[_("strong",[t._v("Q2")]),t._v("：中断和异常希望解决的问题？")]),t._v(" "),_("ul",[_("li",[t._v("当外设与计算机产生交互时，会出现什么现象？")]),t._v(" "),_("li",[t._v("当应用程序处理意想不到的行为时，会出现什么现象？")])]),t._v(" "),_("p",[_("strong",[t._v("Q3")]),t._v("：系统调用希望解决的问题？")]),t._v(" "),_("ul",[_("li",[t._v("用户应用程序是如何得到系统服务？通过系统调用来提供灵活的接口，让应用程序能够方便的使用内核提供的服务，又不至于用户的行为对内核安全产生影响")]),t._v(" "),_("li",[t._v("系统调用和函数库的不同之处是什么？")])]),t._v(" "),_("h3",{attrs:{id:"中断、异常和系统调用的比较"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#中断、异常和系统调用的比较"}},[t._v("#")]),t._v(" 中断、异常和系统调用的比较")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("中断（hardware interrupt）")]),t._v("：来自硬件设备的处理请求（如外设缓冲区中有数据需要内核将数据给读走，或者缓冲区中的数据已经全部用完需要内核补充新的数据）")]),t._v(" "),_("li",[_("strong",[t._v("异常（exception）")]),t._v("：非法指令或其它原因导致当前指令执行失败（如内存非法访问、除零）后的处理请求（终止指令，或者处理完这条异常产生的指令所导致的问题（满足某些条件）之后重新调度执行这条指令）")]),t._v(" "),_("li",[_("strong",[t._v("系统调用（system call）")]),t._v("：应用程序主动向操作系统发出的服务请求")])]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/syscall-exeception-interrupt.png",width:"344px",height:"247px",alt:"syscall-exeception-interrupt"}})]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",{staticStyle:{"text-align":"center"}},[t._v("类型")]),t._v(" "),_("th",{staticStyle:{"text-align":"center"}},[t._v("源头")]),t._v(" "),_("th",{staticStyle:{"text-align":"center"}},[t._v("响应方式")]),t._v(" "),_("th",{staticStyle:{"text-align":"center"}},[t._v("处理机制")])])]),t._v(" "),_("tbody",[_("tr",[_("td",{staticStyle:{"text-align":"center"}},[t._v("中断")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("外设")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("异步")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("持续，对用户应用程序透明")])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"center"}},[t._v("异常")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("应用程序意想不到的行为")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("同步")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("杀死或者重新执行意想不到的指令")])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"center"}},[t._v("系统调用")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("应用程序请求 OS 提供服务")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("同步或异步")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("等待和持续")])])])]),t._v(" "),_("h3",{attrs:{id:"中断（中断、异常和系统调用的总称）的处理机制"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#中断（中断、异常和系统调用的总称）的处理机制"}},[t._v("#")]),t._v(" 中断（中断、异常和系统调用的总称）的处理机制")]),t._v(" "),_("p",[_("strong",[t._v("硬件处理：")])]),t._v(" "),_("ul",[_("li",[t._v("在 CPU 初始化时设置中断使能标志，使能之后才能够进行中断处理（在许可外界打扰 CPU 的执行之前，CPU 是不会对外界的任何中断请求发出相应的，因此需要中断使能）")]),t._v(" "),_("li",[t._v("依据内部或外部事件设置中断标识：中断事件产生了（通常是一个电平的上升沿，亦即高电平），CPU 会记录下这个事件（CPU 中有一个标志表示出现了一个中断）")]),t._v(" "),_("li",[t._v("依据中断向量调用相应的中断服务例程：需要知道中断源的编号（这个中断事件是由什么设备产生的）")])]),t._v(" "),_("p",[_("strong",[t._v("软件（内核）处理：")])]),t._v(" "),_("p",[t._v("中断、异常和系统通用在陷入内核之后，执行流都打到中断向量表，如果是中断直接到中断服务例程（驱动程序）做出响应；如果是异常直接转到异常服务例程来做处理；如果是系统调用（系统调用总共占用一个中断编号），不同的系统调用功能使用系统调用表来维护，根据不同的系统调用在系统调用表中找到系统调用号，找到不同的系统调用实现（在上面的图中能够很清晰的理解）")]),t._v(" "),_("ul",[_("li",[t._v("现场保存（编译器）上下文信息")]),t._v(" "),_("li",[t._v("中断服务处理（服务例程）")]),t._v(" "),_("li",[t._v("清除中断标记（服务例程）")]),t._v(" "),_("li",[t._v("现场恢复（编译器）")])]),t._v(" "),_("p",[_("strong",[t._v("Q4")]),t._v("：正在处理一个请求的时候，又来了一个新的请求，这时候应该怎么办？")]),t._v(" "),_("p",[t._v("在操作系统中，硬件中断服务例程允许被打断")]),t._v(" "),_("ul",[_("li",[t._v("不同硬件中断源可以根据中断优先级进行排序执行")]),t._v(" "),_("li",[t._v("硬件中断服务例程中需要临时禁止中断请求")]),t._v(" "),_("li",[t._v("中断请求会保持到 CPU 做出响应")])]),t._v(" "),_("p",[t._v("异常服务例程可被打断")]),t._v(" "),_("ul",[_("li",[t._v("异常服务例程执行时可能出现硬件中断")]),t._v(" "),_("li",[t._v("异常服务例程可能出现缺页中断")])]),t._v(" "),_("h3",{attrs:{id:"系统调用（操作系统对上提供服务的接口）"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#系统调用（操作系统对上提供服务的接口）"}},[t._v("#")]),t._v(" 系统调用（操作系统对上提供服务的接口）")]),t._v(" "),_("p",[t._v("给一个标准 C 库的例子：应用程序调用 printf() 时，会触发系统调用 write()")]),t._v(" "),_("div",{attrs:{align:"center"}},[_("img",{attrs:{src:"/os-notes-figures/printf-write.png",width:"460px",height:"238px",alt:"printf-write"}})]),t._v(" "),_("p",[_("strong",[t._v("外界使用：")])]),t._v(" "),_("ul",[_("li",[t._v("操作系统服务的编程接口，通常使用高级语言编写（C 或 C++）")]),t._v(" "),_("li",[t._v("程序访问通常是通过高层次的 API 接口而不是直接进行系统调用")]),t._v(" "),_("li",[t._v("三种最常用的应用程序编程接口（API）——将系统调用进行封装之后，用户使用的接口")]),t._v(" "),_("li",[t._v("Win32 API 用于 Windows（使用 Windows 操作系统内核的服务来实现 Win32 库）")]),t._v(" "),_("li",[t._v("POSIX API（底下会调用系统调用） 用于 POSIX-based system（Unix、Linux、macOS 的所有版本）")]),t._v(" "),_("li",[t._v("Java API 用于 Java 虚拟机（让虚拟机里的应用程序间接地转到系统调用接口上来）")])]),t._v(" "),_("p",[_("strong",[t._v("内部实现：")])]),t._v(" "),_("ul",[_("li",[t._v("每一个系统调用对应一个系统调用号（系统调用接口根据系统调用号来维护表的索引）")]),t._v(" "),_("li",[t._v("系统调用接口调用内核态中的系统调用功能实现，并返回系统调用的状态和结果")]),t._v(" "),_("li",[t._v("用户不需要知道（也不关心）系统调用的实现")]),t._v(" "),_("li",[t._v("需要设置调用参数和获取返回结果")]),t._v(" "),_("li",[t._v("操作系统接口的细节大部分都隐藏在应用编程接口后（通常运行程序支持的库来管理）")])]),t._v(" "),_("p",[_("strong",[t._v("系统调用和函数调用的区别：")])]),t._v(" "),_("ul",[_("li",[t._v("系统调用使用 INT 和 IRET 指令，系统调用时，堆栈切换（内核和应用程序使用不同的堆栈，用户态堆栈和内核态堆栈）和特权级切换（处于内核态就可以使用特权指令，可以直接对设备进行控制）")]),t._v(" "),_("li",[t._v("函数调用使用 CALL 和 RET 指令，常规调用没有堆栈切换")]),t._v(" "),_("li",[t._v("详细的区别需要去查看 x86 CPU 的指令手册 Intel 64 and IA-32 Architectures Software Developer")])]),t._v(" "),_("p",[_("strong",[t._v("中断、异常和系统调用的开销：")])]),t._v(" "),_("ul",[_("li",[t._v("引导机制（用户态到内核态的切换，由硬件完成）")]),t._v(" "),_("li",[t._v("建立内核堆栈（第一次调用需要建立内核堆栈）")]),t._v(" "),_("li",[t._v("验证参数（参数的有效合法性需要进行验证）")]),t._v(" "),_("li",[t._v("内核态映射到用户态的地址空间（内核需要访问到用户态的数据信息，会做一个地址信息的映射，会导致缓存发生变化，TLB 中的内容可能会失效）——更新页面映射权限")]),t._v(" "),_("li",[t._v("内核态独立地址空间（TLB）")])]),t._v(" "),_("p",[_("strong",[t._v("【TODO】3.5 系统调用示例")]),t._v(" 需要在做实验的时候仔细看，并做好笔记记录")]),t._v(" "),_("p",[t._v("相应的整个从用户态到内核态，然后到函数的实现，一直到返回，把整个这一条路给分析明白，这样就能够知道一个系统调用是如何实现的")])])}),[],!1,null,null,null);v.default=e.exports}}]);