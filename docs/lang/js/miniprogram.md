---
title: 微信小程序
---

## 云函数

云函数的 `name` 由目录名指定

```js
// 云函数入口文件

// wx-server-sdk 为微信提供的库，帮助我们在云函数中操作数据库、存储以及调用其他云函数
const cloud = require('wx-server-sdk')

cloud.init({env: 'dev-env01'})

// 云函数入口函数
exports.main = async (event, context) => {
  let {OPENID, APPID, UNIONID} = cloud.getWXContext()

  return {
    sum: event.a + event.b,
    openid: OPENID,
    appid: APPID,
    unionid: UNIONID,
  }
}
```

云函数传入两个参数：

- `event` 对象，为触发云函数的事件。当小程序端调用云函数时，`event` 就是小程序端调用云函数时传入的参数，外加后端自动注入的小程序用户的 `openid` 和小程序的 `appid`
- `context` 对象，包含了此处调用的调用信息和运行状态，可以用它来了解服务运行的情况

将云函数部署完成后，可以在小程序中调用调用该云函数：

```js
wx.cloud.callFunction({
  // 云函数名称
  name: 'add',
  // 传给云函数的参数
  data: {
    a: 1,
    b: 2,
  },
})
.then(res => {
  console.log(res.result) // {3, openid, appid}
})
.catch(console.error)
```
