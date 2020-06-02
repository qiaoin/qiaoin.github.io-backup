module.exports = {
  title: '在桥边',
  description: '偷得浮生半日闲',
  themeConfig: {
    nav: require('./nav/zh'),
    sidebar: {
      '/basic/os/': getOsSidebar(),
      '/basic/algorithm/': getAlgorithmSidebar(),
      '/basic/network/': getNetworkSidebar(),
      '/basic/database/': getDatabaseSidebar(),
      '/basic/compiler/': getCompilerSidebar(),
      '/basic/math/': getMathSidebar(),
      '/basic/linux/': getLinuxSidebar(),
      '/system/': getSystemSidebar(),
      '/lang/cpp/': getCppSidebar(),
      '/lang/go/': getGoSidebar(),
      '/lang/js/': getJsSidebar(),
      '/lang/py/': getPySidebar(),
      // '/sourcecode/linux/': getSourceLinuxSidebar(),
      // '/sourcecode/redis/': getSourceRedisSidebar(),
      // '/sourcecode/leveldb/': getSourceLeveldbSidebar(),
      '/source/': getSourceSidebar(),
      '/reading/': getReadingSidebar(),
      // '/foreign/japanese/': getJapaneseSidebar(),
      // '/foreign/pride-and-prejudice/': getPrideSidebar(),
    },
    sidebarDepth: 0,
    // 禁止用户滚动查看不同部分时，实时计算 URL 中的子标题
    activeHeaderLinks: true,
    // 基于 git，使用的最后更新时间（时间戳）来自 git commit
    // lastUpdated: '上次更新',
    // git 仓库和编辑链接
    repo: 'qiaoin/qiaoin.github.io',
    docDir: 'docs',
    docsBranch: 'source',
    // editLinks: true,
    // editLinkText: '帮助改善此页面吧',
  },
  markdown: {
    lineNumbers: false
  },
  plugins: [
    ['vuepress-plugin-mathjax', {
      target: 'svg',
    }],
    ['@vuepress/back-to-top', false],  // 禁用主题内的 back-to-top
  ],
}

function getOsSidebar() {
  return [
    {
      title: "操作系统",
      collapsable: false,
      children: [
        '0-os-structures',
        '1-memory-management',
        '2-virtual-memory',
        '3-page-replacement-algo',
        '4-process-and-thread',
        '5-scheduler',
        '6-synchronous-and-mutex',
        '7-file-system',
        '8-io-subsystem',
      ]
    },
    {
      title: "MIT 6.828 实验",
      collapsable: false,
      children: [
        'mit-6.828-lab1',
        'mit-6.828-lab2',
      ]
    },
  ]
}

function getAlgorithmSidebar() {
  return [
    {
      title: "算法与数据结构",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
    {
      title: "LeetCode",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getNetworkSidebar() {
  return [
    {
      title: "计算机网络",
      collapsable: false,
      children: [
        'illustration-http',
        'tcp-ip-illustrated',
        'unix-network-programming',
      ]
    },
    {
      title: "网络编程实战",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getDatabaseSidebar() {
  return [
    {
      title: "数据库",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
    {
      title: "MIT 6.xxx 实验",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getCompilerSidebar() {
  return [
    {
      title: "编译原理",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
    {
      title: "MIT 6.xxx 实验",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getMathSidebar() {
  return [
    {
      title: "线性代数",
      collapsable: false,
      children: [
        'essense-of-linear-algebra',
      ]
    },
    {
      title: "密码学",
      collapsable: false,
      children: [
        'prime-number',
        'rsa',
      ]
    },
  ]
}

function getLinuxSidebar() {
  return [
    {
      title: "Linux 基础",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
    {
      title: "小工具",
      collapsable: false,
      children: [
        'git-basis',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getCppSidebar() {
  return [
    {
      title: "C++ 基础",
      collapsable: false,
      children: [
        'object-based-and-object-oriented',
        'object-model',
      ]
    },
    {
      title: "STL",
      collapsable: false,
      children: [
        'stl-introduction',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getGoSidebar() {
  return [
    {
      title: "多路复用",
      collapsable: false,
      children: [
        'basis',
        // 'mit-6.828-lab2',
      ]
    },
    {
      title: "调度器",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getJsSidebar() {
  return [
    {
      title: "开始学习 JavaScript",
      collapsable: false,
      children: [
        'basis',
        'miniprogram',
        'notes-on-good-parts',
      ]
    },
    {
      title: "调度器",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getPySidebar() {
  return [
    {
      title: "Python 入门学习",
      collapsable: false,
      children: [
        'basis',
        'miniprogram',
        'notes-on-good-parts',
      ]
    },
    {
      title: "调度器",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getSystemSidebar() {
  return [
    {
      title: "MIT 6.824 课程笔记",
      collapsable: false,
      children: [
        '1-introduction',
        '2-rpc-and-threads',
        '3-gfs',
        '4-primary-backup-replication',
        '5-go-threads-and-raft',
      ]
    },
    {
      title: "MIT 6.824 实验",
      collapsable: false,
      children: [
        'lab1-mapreduce',
        'lab2-raft',
        'lab3-kv-raft',
        'lab4-sharded-kv',
      ]
    }
  ]
}

// function getSourceLinuxSidebar() {
//   return [
//     {
//       title: "多路复用",
//       collapsable: false,
//       children: [
//         'epoll',
//         // 'mit-6.828-lab2',
//       ]
//     },
//     {
//       title: "调度器",
//       collapsable: false,
//       children: [
//         // 'mit-6.828-lab1',
//         // 'mit-6.828-lab2',
//       ]
//     },
//   ]
// }

// function getSourceRedisSidebar() {
//   return [
//     {
//       title: "多路复用",
//       collapsable: false,
//       children: [
//         // '',
//         // 'mit-6.828-lab2',
//       ]
//     },
//     {
//       title: "调度器",
//       collapsable: false,
//       children: [
//         // 'mit-6.828-lab1',
//         // 'mit-6.828-lab2',
//       ]
//     },
//   ]
// }

// function getSourceLeveldbSidebar() {
//   return [
//     {
//       title: "多路复用",
//       collapsable: false,
//       children: [
//         // '',
//         // 'mit-6.828-lab2',
//       ]
//     },
//     {
//       title: "调度器",
//       collapsable: false,
//       children: [
//         // 'mit-6.828-lab1',
//         // 'mit-6.828-lab2',
//       ]
//     },
//   ]
// }

function getSourceSidebar() {
  return [
    {
      title: "Linux",
      collapsable: false,
      children: [
        // '',
        // 'linux/art-of-unix-programming',
        // 'linux/programming-pearls',
        // 'linux/practice-of-programming',
        // 'linux/future-of-code',
        // 'linux/software-uml',
        // 'linux/building-microservices',
      ]
    },
    {
      title: "Redis",
      collapsable: false,
      children: [
        // 'redis/',
        // 'redis/economics',
      ]
    },
    {
      title: "LevelDB",
      collapsable: false,
      children: [
        // 'leveldb/',
        // 'leveldb/economics',
      ]
    },
  ]
}

function getReadingSidebar() {
  return [
    {
      title: "计算机经典书籍",
      collapsable: false,
      children: [
        'cs/art-of-unix-programming',
        'cs/programming-pearls',
        'cs/practice-of-programming',
        'cs/future-of-code',
        'cs/software-uml',
        'cs/building-microservices',
      ]
    },
    {
      title: "杂的言",
      collapsable: false,
      children: [
        'enjoy/economics',
      ]
    }
  ]
}

function getJapaneseSidebar() {
  return [
    {
      title: "标准日本语",
      collapsable: false,
      children: [
        'introduce',
        // 'mit-6.828-lab2',
      ]
    },
    {
      title: "日本习俗",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getPrideSidebar() {
  return [
    {
      title: "傲慢与偏见",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}
