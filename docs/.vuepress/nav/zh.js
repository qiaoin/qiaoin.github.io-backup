module.exports = [
    { text: '主页', link: '/' },
    {
        text: '计算机基础',
        ariaLabel: '计算机基础',
        items: [
            { text: '操作系统', link: '/basic/os/' },
            { text: '算法与数据结构', link: '/basic/algorithm/' },
            { text: '计算机网络', link: '/basic/network/' },
            { text: '数据库', link: '/basic/database/' },
            { text: '编译原理', link: '/basic/compiler/' },
            { text: 'Linux', link: '/basic/linux/' },
        ]
    },
    { text: '编程语言', link: '/lang/' },
    { text: '分布式系统', link: '/system/' },
    { text: '乱翻书', link: '/reading/' },
    {
        text: '外语学习',
        ariaLabel: '外语学习',
        items: [
            { text: '日语', link: '/foreign/japanese/' },
            { text: '傲慢与偏见', link: '/foreign/pride-and-prejudice/' },
        ]
    }
];