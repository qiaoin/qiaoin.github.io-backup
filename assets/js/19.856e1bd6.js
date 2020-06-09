(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{266:function(v,e,_){"use strict";_.r(e);var t=_(29),l=Object(t.a)({},(function(){var v=this,e=v.$createElement,_=v._self._c||e;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"unix-网络编程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#unix-网络编程"}},[v._v("#")]),v._v(" UNIX 网络编程")]),v._v(" "),_("ul",[_("li",[v._v("阻塞式IO；")]),v._v(" "),_("li",[v._v("非阻塞式IO；")]),v._v(" "),_("li",[v._v("读写锁；")]),v._v(" "),_("li",[v._v("etc...")])]),v._v(" "),_("p",[_("strong",[v._v("结合陈硕的网络编程实战视频课程进行学习，并整理笔记")])]),v._v(" "),_("p",[v._v("Unix 网络编程第一卷上有两点没有着重讲解：")]),v._v(" "),_("ol",[_("li",[v._v("对消息格式的处理，特别是非阻塞 IO 下如何正确地处理 TCP 分包；")]),v._v(" "),_("li",[v._v("讲授的并发模型稍显陈旧，高并发服务往往是采用事件驱动＋非阻塞 IO 的办法，这是传统的，在 UNIX 网络编程卷一中关于这方面的介绍，分量不足，只有一章介绍。高级的并发模型： Thread-per-connection, non-blocking / event-driven / epoll, thread pool, etc。专门有本书讲解这方面的知识，面向模式的软件架构第二卷，讲各种并发模型， POSA2: Patterns for Concurrent and Networked Objects, pub in 2000")])]),v._v(" "),_("p",[v._v("程序员主要关注的网络层：")]),v._v(" "),_("ol",[_("li",[v._v("以太网层，帧 Ethernet frame")]),v._v(" "),_("li",[v._v("IP 层，分组 IP packet "),_("em",[v._v("注意")]),v._v(" IP 分组和 IP 分片是两个事情，一般我们不用管 IP 分片")]),v._v(" "),_("li",[v._v("传输层，分节 TCP segment")]),v._v(" "),_("li",[v._v("应用层，消息 Application message")])]),v._v(" "),_("p",[v._v("网络编程存在的一些常见错误：")]),v._v(" "),_("ul",[_("li",[v._v("往往将网络 IO 与业务逻辑穿插在一起，应尽量分开；")]),v._v(" "),_("li",[v._v("TCP 不可靠，收到的数据不完整。主要是涉及 TCP 连接断开的时机和条件，"),_("code",[v._v("close")]),v._v(" 太早的话，有可能导致协议栈发送 "),_("code",[v._v("RST")]),v._v(" 分节，将连接给重置，数据自然就收不完了。在阻塞编程中可以使用 "),_("code",[v._v("solinger")]),v._v(" 这个选项，在非阻塞 IO 中，"),_("code",[v._v("linger")]),v._v(" 选项失效，我们需要从应用层协议上入手解决这个问题，设计应用层协议的时候把 TCP 连接的断开放到协议设计的考虑中去；")]),v._v(" "),_("li",[v._v("TCP 是一个字节流协议，它保证字节按顺序到达，但不保留消息的边界。因为对于 TCP 本身来说，是没有消息这个概念的；")]),v._v(" "),_("li",[v._v("直接发送 C 语言的结构体，这个需要考虑两个问题，1）对齐，就有人会直接修改全局的对齐方式，会导致第三方库 core dump，因为破坏了 ABI，二进制接口；2） 高度的不可扩展")]),v._v(" "),_("li",[v._v("TCP 的自连接，客户端会自己和自己连接；")]),v._v(" "),_("li",[v._v("非阻塞 IO 网络编程的一些特点。")])]),v._v(" "),_("p",[v._v("使用 Netcat 和 dd 测试 TCP 有效带宽及吞吐量")]),v._v(" "),_("ul",[_("li",[v._v("在 cn11 上 "),_("code",[v._v("dd if=/dev/zero bs=1MB count=1000 | nc cn13 5001")])]),v._v(" "),_("li",[v._v("在 cn13 上 "),_("code",[v._v("nc -l 5001 > /dev/null")])])]),v._v(" "),_("p",[v._v("课程主要讲解哪几个例子：")]),v._v(" "),_("h2",{attrs:{id:"简单的非并发例子-basic-non-concurrent-examples"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#简单的非并发例子-basic-non-concurrent-examples"}},[v._v("#")]),v._v(" 简单的非并发例子 Basic, non-concurrent examples")]),v._v(" "),_("ul",[_("li",[v._v("TTCP: TCP 性能测试工具")]),v._v(" "),_("li",[v._v("Round-trip: 测试两台机器之间的时间差，唯一一个 UDP 编程的例子")]),v._v(" "),_("li",[v._v("Netcat: 网络编程中的瑞士军刀，其与标准输入输出打交道")]),v._v(" "),_("li",[v._v("Slow sink / source: 慢速收发工具，用于模拟网速比较慢的情况，从应用层模拟，故意地收到之后等一下再收下一个数据；发送也是一样。这样可以帮助找出服务端，特别是在非阻塞情况下，能不能正确应对接收速度慢的情况")])]),v._v(" "),_("h2",{attrs:{id:"并发网络编程-concurrent-example"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#并发网络编程-concurrent-example"}},[v._v("#")]),v._v(" 并发网络编程 Concurrent example")]),v._v(" "),_("ul",[_("li",[v._v("Socks 代理服务器，将两个 TCP 连接进行中继一下，阻塞、非阻塞两种情况考虑")]),v._v(" "),_("li",[v._v("数独求解，典型的请求-响应式模型，特点是连接之间是独立的，可扩展为计算量更大的情况")]),v._v(" "),_("li",[v._v("简单的 Memcached 的实现，非阻塞")]),v._v(" "),_("li",[v._v("应用层 TCP 的广播，连接之间有交互，连接的生命周期管理，某一个连接接受收据慢该如何处理？")])]),v._v(" "),_("h2",{attrs:{id:"多机器上的数据处理-data-processing-with-multiple-machines"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#多机器上的数据处理-data-processing-with-multiple-machines"}},[v._v("#")]),v._v(" 多机器上的数据处理 Data processing with multiple machines")]),v._v(" "),_("blockquote",[_("p",[v._v("直接使用 Hadoop / Spark 进行求解")])]),v._v(" "),_("ul",[_("li",[v._v("并行的 N-皇后问题求解")]),v._v(" "),_("li",[v._v("求解分布在多台机器上的数的中位数")]),v._v(" "),_("li",[v._v("查询/求解出现次数最多的项")]),v._v(" "),_("li",[v._v("分布式排序 Map -> Shuffle -> Reduce")])]),v._v(" "),_("h2",{attrs:{id:"高级主题-advanced-topics"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#高级主题-advanced-topics"}},[v._v("#")]),v._v(" 高级主题 Advanced Topics")]),v._v(" "),_("ul",[_("li",[v._v("RPC: A basic building block for various servers")]),v._v(" "),_("li",[v._v("负载均衡 load balance")]),v._v(" "),_("li",[v._v("服务系统的容量管理")]),v._v(" "),_("li",[v._v("延迟 latency 测延时的方法（百分位数的各个延迟），衡量")])])])}),[],!1,null,null,null);e.default=l.exports}}]);