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
            { text: '数学', link: '/basic/math/' },
            { text: 'Linux', link: '/basic/linux/' },
        ]
    },
    {
        text: '编程语言',
        ariaLabel: '编程语言',
        items: [
            { text: 'C++', link: '/lang/cpp/' },
            { text: 'Go', link: '/lang/go/' },
            { text: 'JavaScript', link: '/lang/js/' },
            { text: 'Python', link: '/lang/py/' },
        ]
    },
    { text: '分布式系统', link: '/system/' },
    {
        text: '源码阅读', link: '/source/'
        // text: '源码阅读',
        // ariaLabel: '源码阅读',
        // items: [
        //     { text: 'HowToRead', link: '/source/' },
        //     { text: 'Linux', link: '/source/linux/' },
        //     { text: 'Redis', link: '/source/redis/' },
        //     { text: 'LevelDB', link: '/source/leveldb/' },
        // ]
    },
    { text: '乱翻书', link: '/reading/' },
    // {
    //     text: '外语学习',
    //     ariaLabel: '外语学习',
    //     items: [
    //         { text: '日语', link: '/foreign/japanese/' },
    //         { text: '傲慢与偏见', link: '/foreign/pride-and-prejudice/' },
    //     ]
    // }
];