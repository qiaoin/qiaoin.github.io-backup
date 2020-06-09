(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{303:function(o,e,v){"use strict";v.r(e);var _=v(29),n=Object(_.a)({},(function(){var o=this,e=o.$createElement,v=o._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[v("p",[o._v("《"),v("a",{attrs:{href:"https://book.douban.com/subject/26875239/",target:"_blank",rel:"noopener noreferrer"}},[o._v("SRE — Google 运维解密"),v("OutboundLink")],1),o._v("》 中文版 P6 “确保长期关注研发工作”")]),o._v(" "),v("blockquote",[v("p",[o._v("撰写一份事后报告，并从中学习。所有产品事故都应该有对应的时候总结。事后总结应该包括以下内容：事故发生、发现、解决的全过程，事故的根本原因，预防或者优化的解决方案。事后总结的目标是尽早发现和堵住漏洞，而不是通过流程去绕过和掩盖它们。")])]),o._v(" "),v("p",[o._v("《"),v("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/26222486",target:"_blank",rel:"noopener noreferrer"}},[o._v("如何阅读一份代码？"),v("OutboundLink")],1),o._v("》 陈天的知乎专栏“迷思”")]),o._v(" "),v("p",[o._v("在“场景一：为了破案而阅读代码”中写道：")]),o._v(" "),v("blockquote",[v("p",[o._v("关键的第 5 步是：复盘。解决问题后，趁着那坨记忆还热气腾腾，抄起 evernote（或者 xxx），把整个过程用最简洁的方式记录下来 —— 关键代码，关键路径，到达终点的整个猜测过程，以及哪些日志验证了猜测是对的，哪些日志验证了猜测走不通（恭喜你 —— console 或者 terminal 在这个时候应该还没关），总之，你在不择手段的过程中用过的一切手段，都应该像记流水账一样记录下来。最后分析总结：")]),o._v(" "),v("ol",[v("li",[o._v("这个问题的 root cause 是什么？触发它的代码的流程是什么？")]),o._v(" "),v("li",[o._v("在读代码的过程中，哪些地方我猜对了，哪些没猜对？")]),o._v(" "),v("li",[o._v("有功夫的话，代码的哪个部分是值得细细品读把玩的？")]),o._v(" "),v("li",[o._v("下次再出现类似的问题，我该怎么更快地从源码中定位出问题？")])]),o._v(" "),v("p",[o._v("在这种「破案」般阅读代码的历程中，如果没有复盘，你 70% 的功夫白费了 —— 你花了不少时间，读了不少代码，除了一个好的结果外，并无太大的收获。")]),o._v(" "),v("p",[o._v("复盘帮你把这样的信息沉淀下来，让你有机会回顾，进而组织和固化成上篇文章中所说的知识。")])]),o._v(" "),v("p",[o._v("另外在“场景二：为了明理而阅读代码”时也总结到：")]),o._v(" "),v("blockquote",[v("p",[o._v("计算机领域的很多算法，基础知识，理论，在看过书，读过文章后我们都似懂非懂，这时，阅读代码就是最快地巩固和加深理解的方式（"),v("strong",[o._v("能够读懂代码，和理解代码的应用场景是两码事")]),o._v("）：")]),o._v(" "),v("ol",[v("li",[o._v("先使用前面所述的检视阅读法把整个代码过一遍，找到值得阅读的核心代码。\n"),v("ul",[v("li",[o._v("我们会读根目录下的 readme，或者任何看上去撩拨着你让你戳它的文件。这就跟书本的「序」一样，能够帮你更进一步了解这份代码的意图；")]),o._v(" "),v("li",[o._v("接下里我们目光需要聚焦在代码的目录结构，和每个源码的文件名。他们就像书本的目录页。如果每个目录下有 readme，也可快速阅读之。很多语言和框架，有约定俗成的目录结构（Convention by Contract），因此，通过目录我们就可以快速知道哪些是可以略过的部分，比如 django 的 management/commands 目录，elixir 的 mix/tasks 目录，这些目录，承载着支线剧情，需要的时候，或者闲得无聊时再读也不迟；")]),o._v(" "),v("li",[o._v("然后我们开始从入口梳理主线。不同语言和框架的主线不太一样，比如 C 的入口是 main()，erlang/elixir otp app 的入口是 app:start，nodejs 往往是根目录下的 index.js，等等。一般而言，application 的主线比较清晰，一路下来，会走到一个 mainloop，而 framework 的主线会晦涩一些，因为 framework 往往是 application 抽象出来的部分。")])])]),o._v(" "),v("li",[o._v("粗读这部分代码，将其内容进一步 breakdown。手边准备好笔和纸（或者其他趁手的工具），随时记录。记录最好的方式是图表。这个阶段的记录不建议用软件工具（除非有用着特别舒服的，能够人件合一的）。")]),o._v(" "),v("li",[o._v("精读这部分代码，结合你已有的知识，理解这个代码所需要的资料，猜测和还原代码中某种事件，消息，或者某个流程发生的场景。把猜测记录下来。这时，如果遇到外围的代码（调用了外部的函数），只要对理解不产生障碍，可以先放一下，把整个过程完整而详细地捋一遍再说。这个过程一定要多问问题，把「我以为我懂了但实际没懂」的情形尽可能减少。")]),o._v(" "),v("li",[o._v("用检视阅读法粗度剩下的代码，如果找到其他值得精读的代码，跳至 2。")]),o._v(" "),v("li",[o._v("使用对比阅读（或者说，主题阅读）方式，把类似功能的 repo 都扫一遍。尝试着用自己的语言消化不同作者的实现，关注其实现的差异，并试图评判这种差异。")]),o._v(" "),v("li",[o._v("用软件将手稿电子化，便于将来回顾。文字可以直接上笔记本工具（甚至可以尝试 gitbook），图表如果买不起 visio，omniGraffle 这样的工具，可以用 plantuml。")])]),o._v(" "),v("p",[o._v("最后一步是个非常耗时的过程，除非你有惊人的毅力，或者好为人师，要把你的心得分享出去，否则，做的动力不大。当然，在这个场景下，我们是悠然自得地读代码，没有客户老板拿着鞭子在后面抽，所以读懂之后记忆会非常深刻，即便没有电子文档留存，回到代码翻一翻，记忆就能还原了。")])]),o._v(" "),v("p",[o._v("“场景三：为了能级跃迁而阅读代码”：")]),o._v(" "),v("blockquote",[v("p",[o._v("读什么？读那些基础地不能再基础，你认为自己一辈子都不会去写的那些代码。比如 linux kernel，比如 OTP。这种读法，你不知何时能够完成，所以，要有足够的耐心和时间。检视阅读 + 主题阅读 + 思维导图是经常用到的方法。")]),o._v(" "),v("p",[o._v("需要指出的是，这种阅读有时会让人非常沮丧，因为你会遇见非常非常之多的 knowledge gap，从而不得不翻书查资料弥补这些你缺失的知识点，拉慢了整个阅读理解的步伐 —— 有时甚至数日毫无进展，让你心中被激发出来的那口气开始渐渐衰竭。这时候，稳住！这些 knowledge gap 是上天馈赠的礼物，是你弥补 you don't know what you don't know 的绝佳机会。慢慢来，take it easy，享受获取额外知识的喜悦。")]),o._v(" "),v("p",[o._v("这样数年下来不断充实自己，你写代码做项目时，离余光中老师描绘的，令人神往的李白的「绣口一吐，就半个盛唐」的状态不远矣！")])]),o._v(" "),v("p",[o._v("阅读的场景来谈谈如何阅读。谈到场景，很多人会联想到一本著名的书：Linux 内核场景分析。该书的作者显然把握了阅读代码的实质：循着一条线索，进行端到端的一个自成体系的内容的阅读。不同场景下，我们已知的信息，未知的信息，通过阅读想要达到的目标是不一样的，显然，方法也不尽相同。这就和读书一样：想要让自己明智，读史；想要让自己灵秀，读诗；想要让自己周密，研习数学；想要让自己深刻，攻读哲学等等。")])])}),[],!1,null,null,null);e.default=n.exports}}]);