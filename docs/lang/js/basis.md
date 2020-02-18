---
title: JavaScript
---

## 实验环境

推荐安装 Chrome 浏览器，“开发者工具（Developer Tools）-控制台（Console）”就是运行 JavaScript 代码的理想环境。进入 Chrome 浏览器的“控制台”，有两种方法：

1. 直接进入：按下 `Option + Command + J`（Mac）
2. 开发者工具进入：开发者工具的快捷键是 F12，或者按 `Option + Command + I`（Mac），然后选择 Console 面板

进入控制台以后，就可以在提示符后输入代码，然后按 `Enter` 键，代码就会执行。如果按 `Shift + Enter` 键，就是代码换行，不会触发执行。

ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。

## 基础

JavaScript 程序的执行单元是行（line），也就是一行一行地执行。

`undefined` 是一个特殊的值，表示“无定义”。

JavaScript 是一种动态类型语言，也就是说，变量的类型没有限制，变量可以随时更改类型。

**变量提升**：JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果就是所有变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）

```js
console.log(a);
var a = 1;
```

等价于：

```js
var a;
console.log(a);  // undefined
a = 1;
```

JavaScript 的保留字

arguments、break、case、catch、class、const、continue、debugger、default、delete、do、else、enum、eval、export、extends、false、finally、for、function、if、implements、import、in、instanceof、interface、let、new、null、package、private、protected、public、return、static、super、switch、this、throw、true、try、typeof、var、void、while、with、yield

对于 `var` 命令来说，JavaScript 的区块不构成单独的作用域（scope）

特别注意：赋值表达式（`=`），严格相等运算符（`===`），相等运算符（`==`）。优先采用“严格相等运算符（`===`）”。

`switch` 语句后面的表达式，与 `case` 语句后面的表达式比较运行结果时，采用的是严格相等运算符（`===`），而不是相等运算符 (`==`)，这意味着**比较时不会发生类型转换**。

数组的 `indexOf` 方法内部使用的是严格相等运算符

三元运算符：`(condition) ? (exp1) : (exp2)`

## 数据类型

JavaScript 的数据类型，共有 6 种：

- 数值（number）：整数和小数（比如 `1` 和 `3.14`）
  - JavaScript 内部，所有数字都是以 64 位浮点数形式存储的，即便整数也是如此。这也就是说，JavaScript 语言的底层没有整数，所有数字都是小数（64 位浮点数）
  - 某些运算只有整数才能完成，此时 JavaScript 会自动把 64 位浮点数转成 32 位整数，然后再进行运算
  - 由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心
  - `NaN` 是一个特殊数值，数据类型为 `Number`，`NaN` 不等于任何值，包括它本身
  - `parseInt('12.34', 被解析的值的进制，默认为 10)` 返回 `12`，参数为字符串，结果只返回字符串头部可以转为数字的部分；如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回 `NaN`
  - 判断 `NaN` 最可靠的方法是，例如 `NaN` 为唯一不等于自身的值进行判断
- 字符串（string）：文本（比如 `Hello world!`）。由于 HTML 的属性值使用双引号，在项目中可以约定 JavaScript 的字符串只使用单引号（坚持使用一种风格）
  - 字符串可以被视为字符数组，索引从 `0` 开始，如果填入的索引数字超过了字符串的长度、或者根本不是数字，则返回 `undefined`
  - 无法改变字符串中的单个字符
  - 字符串的 `length` 属性返回字符串的长度
  - JavaScript 使用 Unicode 字符集
  - Unicode 作为符号集，只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储
  - UTF-8 是 Unicode 的实现方式之一，采用变长的编码方式，使用 `1~4` 个字节表示一个符号，根据不同的符号而变化字节长度。具体细节可以参考阮一峰的 [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
- 布尔值（boolean）：表示真伪的两个特殊值，即 `true`（真）和 `false`（伪）
  - JavaScript **预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值**。转换规则为：将 `undefined`/`null`/`false`/`0`/`NaN`/`""`(`''` 空字符串) 转为 `false`，其他值都视为 `true`
  - 如果字符串包含一个空格，对应的布尔值为 `true`
  - **注意**：空数组（`[]`）和空对象（`{}`）对应的布尔值为 `true`
- `undefined`：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值
- `null`：表示空值，即此处的值为空
- 对象（object）：各种值组成的集合。可以分成三个子类型：1. 狭义的对象（object），2. 数组（array），3. 函数（function）
  - 对象表示为一组“键值对”（key-value）的集合，所有键的类型都是字符串（当键的类型是数值类型时，会自动转换为字符串类型）
    - 读取对象的属性和给属性赋值，可以采用点运算符或方括号运算符
    - 点运算符，直接指定某一属性
    - 方括号运算符，键的类型需要是字符串类型（包裹在引号里面）
  - 对象的每一个键又称为“属性”（property），其值可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用
  - `Object.keys(obj1)` 查看一个对象的所有属性
  - `delete obj1.pro1` 删除属性
  - `obj1.hasOwnProperty('pro1')` 判断 `pro1` 是否为对象自身的属性
  - 对象的属性之间用逗号分隔，最后一个属性后面可以加逗号（trailing comma），也可以不加
  - 对象的属性可以动态创建，不必在对象声明时就指定，属性的“后绑定”
  - 如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。如果取消某一个变量对于原对象的引用，不会影响到另一个变量
  - 这种引用只限于对象，如果两个变量指向同一个原始类型的值，那么，变量这时是值拷贝的

`undefined` 和 `null` 的区别：`null` 是一个表示“空”的对象，转为数值时为 `0`；`undefined` 是一个表示“此处无定义”的原始值，转为数值时为 `NaN`

```js
// 变量声明了，但没有赋值
var i;
i // undefined

// 调用函数时，应该提供的参数没有提供，该参数等于 undefined
function f(x) {
  return x;
}
f() // undefined

// 对象没有赋值的属性
var  o = new Object();
o.p // undefined

// 函数没有返回值时，默认返回 undefined
function f() {}
f() // undefined
```

JavaScript 提供了三种方法去确定一个值的类型：

- `typeof` 运算符
  - `typeof undefined` 返回 `undefined`
  - `typeof null` 返回 `object`
- `instanceof` 运算符
- `Object.prototype.toString` 方法

## ES6 扩展

### Map

```js
let item = {"id": 1, "userInfo": {"age": 18, "gender": "male"}}

let {userInfo} = item  // {"age": 18, "gender": "male"}
```

等价于

```js
let userInfo = item.userInfo
```
