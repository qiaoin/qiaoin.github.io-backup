module.exports = {
  title: '偷得浮生半日闲',
  description: 'Just playing around',
  themeConfig: {
    nav: require('./nav/zh'),
    sidebar: {
      '/basic/os/': getOsSidebar(),
      '/basic/algorithm/': getAlgorithmSidebar(),
      '/basic/network/': getNetworkSidebar(),
      '/basic/database/': getDatabaseSidebar(),
      '/basic/compiler/': getCompilerSidebar(),
      '/basic/linux/': getLinuxSidebar(),
      '/system/': getSystemSidebar("系统", "论文"),
      '/lang/': getLangSidebar("C++", "Go", "源码阅读"),
      '/reading/': getReadingSidebar("计算机经典书籍", "杂的言"),
      '/foreign/japanese/': getJapaneseSidebar(),
      '/foreign/pride-and-prejudice/': getPrideSidebar(),
    },
    sidebarDepth: 0,
    // 禁止用户滚动查看不同部分时，实时计算 URL 中的子标题
    activeHeaderLinks: true,
    // 基于 git，使用的最后更新时间（时间戳）来自 git commit
    lastUpdated: '上次更新',
    // git 仓库和编辑链接
    repo: 'qiaoin/qiaoin.github.io',
    docDir: 'docs',
    docsBranch: 'source',
    editLinks: true,
    editLinkText: '帮助改善此页面吧',
  },
  markdown: {
    lineNumbers: false
  }
}

function getOsSidebar() {
  return [
    {
      title: "操作系统",
      collapsable: false,
      children: [
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
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
        // 'mit-6.828-lab1',
        // 'mit-6.828-lab2',
      ]
    },
  ]
}

function getSystemSidebar(groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        // 'design/',
        // 'design/',
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        // 'paper/',
        // 'paper/',
      ]
    }
  ]
}

function getLangSidebar(groupA, groupB, groupC) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        'cpp/',
        'cpp/object-based-and-object-oriented',
        'cpp/object-model'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        // 'paper/',
        // 'paper/',
      ]
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        'opensource/',
        // 'opensource/',
      ]
    }
  ]
}

function getReadingSidebar(groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        'cs/',
        'cs/art-of-unix-programming',
        'cs/programming-pearls',
        'cs/practice-of-programming',
        'cs/future-of-code',
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        // 'enjoy/',
        // 'enjoy/',
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
        // 'mit-6.828-lab1',
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
