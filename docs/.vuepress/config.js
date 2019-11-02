module.exports = {
  title: '偷得浮生半日闲',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '计算机基础', link: '/basic/' },
      { text: '编程语言', link: '/lang/' },
      { text: '分布式系统', link: '/system/' },
      { text: '乱翻书', link: '/reading/' },
    ],
    sidebar: {
      '/basic/': getBasicSidebar("操作系统", "算法与数据结构", "计算机网络", "数据库", "编译原理"),
      '/system/': getSystemSidebar("系统", "论文"),
      '/lang/': getLangSidebar("C++", "Go", "源码阅读"),
      '/reading/': getReadingSidebar("计算机类", "杂的言"),
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

function getBasicSidebar(groupA, groupB, groupC, groupD, groupE) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        'os/',
        'os/mit-6.828-lab1',
        'os/mit-6.828-lab2',
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        // 'algorithm/',
      ]
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        'network/',
        'network/illustration-http',
        'network/tcp-ip-illustrated',
        'network/unix-network-programming',
      ]
    },
    {
      title: groupD,
      collapsable: false,
      children: [
        // 'database/',
      ]
    },
    {
      title: groupE,
      collapsable: false,
      children: [
        // 'compiler/',
      ]
    }
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
        'opensource/leveldb',
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
