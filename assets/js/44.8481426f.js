(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{293:function(t,a,e){"use strict";e.r(a);var s=e(29),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"实验环境"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实验环境"}},[t._v("#")]),t._v(" 实验环境")]),t._v(" "),e("p",[t._v("推荐安装 Chrome 浏览器，“开发者工具（Developer Tools）-控制台（Console）”就是运行 JavaScript 代码的理想环境。进入 Chrome 浏览器的“控制台”，有两种方法：")]),t._v(" "),e("ol",[e("li",[t._v("直接进入：按下 "),e("code",[t._v("Option + Command + J")]),t._v("（Mac）")]),t._v(" "),e("li",[t._v("开发者工具进入：开发者工具的快捷键是 F12，或者按 "),e("code",[t._v("Option + Command + I")]),t._v("（Mac），然后选择 Console 面板")])]),t._v(" "),e("p",[t._v("进入控制台以后，就可以在提示符后输入代码，然后按 "),e("code",[t._v("Enter")]),t._v(" 键，代码就会执行。如果按 "),e("code",[t._v("Shift + Enter")]),t._v(" 键，就是代码换行，不会触发执行。")]),t._v(" "),e("p",[t._v("ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。")]),t._v(" "),e("h2",{attrs:{id:"基础"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),e("p",[t._v("JavaScript 程序的执行单元是行（line），也就是一行一行地执行。")]),t._v(" "),e("p",[e("code",[t._v("undefined")]),t._v(" 是一个特殊的值，表示“无定义”。")]),t._v(" "),e("p",[t._v("JavaScript 是一种动态类型语言，也就是说，变量的类型没有限制，变量可以随时更改类型。")]),t._v(" "),e("p",[e("strong",[t._v("变量提升")]),t._v("：JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果就是所有变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("console"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("等价于：")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\na "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("JavaScript 的保留字")]),t._v(" "),e("p",[t._v("arguments、break、case、catch、class、const、continue、debugger、default、delete、do、else、enum、eval、export、extends、false、finally、for、function、if、implements、import、in、instanceof、interface、let、new、null、package、private、protected、public、return、static、super、switch、this、throw、true、try、typeof、var、void、while、with、yield")]),t._v(" "),e("p",[t._v("对于 "),e("code",[t._v("var")]),t._v(" 命令来说，JavaScript 的区块不构成单独的作用域（scope）")]),t._v(" "),e("p",[t._v("特别注意：赋值表达式（"),e("code",[t._v("=")]),t._v("），严格相等运算符（"),e("code",[t._v("===")]),t._v("），相等运算符（"),e("code",[t._v("==")]),t._v("）。优先采用“严格相等运算符（"),e("code",[t._v("===")]),t._v("）”。")]),t._v(" "),e("p",[e("code",[t._v("switch")]),t._v(" 语句后面的表达式，与 "),e("code",[t._v("case")]),t._v(" 语句后面的表达式比较运行结果时，采用的是严格相等运算符（"),e("code",[t._v("===")]),t._v("），而不是相等运算符 ("),e("code",[t._v("==")]),t._v(")，这意味着"),e("strong",[t._v("比较时不会发生类型转换")]),t._v("。")]),t._v(" "),e("p",[t._v("数组的 "),e("code",[t._v("indexOf")]),t._v(" 方法内部使用的是严格相等运算符")]),t._v(" "),e("p",[t._v("三元运算符："),e("code",[t._v("(condition) ? (exp1) : (exp2)")])]),t._v(" "),e("h2",{attrs:{id:"数据类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数据类型"}},[t._v("#")]),t._v(" 数据类型")]),t._v(" "),e("p",[t._v("JavaScript 的数据类型，共有 6 种：")]),t._v(" "),e("ul",[e("li",[t._v("数值（number）：整数和小数（比如 "),e("code",[t._v("1")]),t._v(" 和 "),e("code",[t._v("3.14")]),t._v("）\n"),e("ul",[e("li",[t._v("JavaScript 内部，所有数字都是以 64 位浮点数形式存储的，即便整数也是如此。这也就是说，JavaScript 语言的底层没有整数，所有数字都是小数（64 位浮点数）")]),t._v(" "),e("li",[t._v("某些运算只有整数才能完成，此时 JavaScript 会自动把 64 位浮点数转成 32 位整数，然后再进行运算")]),t._v(" "),e("li",[t._v("由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心")]),t._v(" "),e("li",[e("code",[t._v("NaN")]),t._v(" 是一个特殊数值，数据类型为 "),e("code",[t._v("Number")]),t._v("，"),e("code",[t._v("NaN")]),t._v(" 不等于任何值，包括它本身")]),t._v(" "),e("li",[e("code",[t._v("parseInt('12.34', 被解析的值的进制，默认为 10)")]),t._v(" 返回 "),e("code",[t._v("12")]),t._v("，参数为字符串，结果只返回字符串头部可以转为数字的部分；如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回 "),e("code",[t._v("NaN")])]),t._v(" "),e("li",[t._v("判断 "),e("code",[t._v("NaN")]),t._v(" 最可靠的方法是，例如 "),e("code",[t._v("NaN")]),t._v(" 为唯一不等于自身的值进行判断")])])]),t._v(" "),e("li",[t._v("字符串（string）：文本（比如 "),e("code",[t._v("Hello world!")]),t._v("）。由于 HTML 的属性值使用双引号，在项目中可以约定 JavaScript 的字符串只使用单引号（坚持使用一种风格）\n"),e("ul",[e("li",[t._v("字符串可以被视为字符数组，索引从 "),e("code",[t._v("0")]),t._v(" 开始，如果填入的索引数字超过了字符串的长度、或者根本不是数字，则返回 "),e("code",[t._v("undefined")])]),t._v(" "),e("li",[t._v("无法改变字符串中的单个字符")]),t._v(" "),e("li",[t._v("字符串的 "),e("code",[t._v("length")]),t._v(" 属性返回字符串的长度")]),t._v(" "),e("li",[t._v("JavaScript 使用 Unicode 字符集")]),t._v(" "),e("li",[t._v("Unicode 作为符号集，只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储")]),t._v(" "),e("li",[t._v("UTF-8 是 Unicode 的实现方式之一，采用变长的编码方式，使用 "),e("code",[t._v("1~4")]),t._v(" 个字节表示一个符号，根据不同的符号而变化字节长度。具体细节可以参考阮一峰的 "),e("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("字符编码笔记：ASCII，Unicode 和 UTF-8"),e("OutboundLink")],1)])])]),t._v(" "),e("li",[t._v("布尔值（boolean）：表示真伪的两个特殊值，即 "),e("code",[t._v("true")]),t._v("（真）和 "),e("code",[t._v("false")]),t._v("（伪）\n"),e("ul",[e("li",[t._v("JavaScript "),e("strong",[t._v("预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值")]),t._v("。转换规则为：将 "),e("code",[t._v("undefined")]),t._v("/"),e("code",[t._v("null")]),t._v("/"),e("code",[t._v("false")]),t._v("/"),e("code",[t._v("0")]),t._v("/"),e("code",[t._v("NaN")]),t._v("/"),e("code",[t._v('""')]),t._v("("),e("code",[t._v("''")]),t._v(" 空字符串) 转为 "),e("code",[t._v("false")]),t._v("，其他值都视为 "),e("code",[t._v("true")])]),t._v(" "),e("li",[t._v("如果字符串包含一个空格，对应的布尔值为 "),e("code",[t._v("true")])]),t._v(" "),e("li",[e("strong",[t._v("注意")]),t._v("：空数组（"),e("code",[t._v("[]")]),t._v("）和空对象（"),e("code",[t._v("{}")]),t._v("）对应的布尔值为 "),e("code",[t._v("true")])])])]),t._v(" "),e("li",[e("code",[t._v("undefined")]),t._v("：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值")]),t._v(" "),e("li",[e("code",[t._v("null")]),t._v("：表示空值，即此处的值为空")]),t._v(" "),e("li",[t._v("对象（object）：各种值组成的集合。可以分成三个子类型：1. 狭义的对象（object），2. 数组（array），3. 函数（function）\n"),e("ul",[e("li",[t._v("对象表示为一组“键值对”（key-value）的集合，所有键的类型都是字符串（当键的类型是数值类型时，会自动转换为字符串类型）\n"),e("ul",[e("li",[t._v("读取对象的属性和给属性赋值，可以采用点运算符或方括号运算符")]),t._v(" "),e("li",[t._v("点运算符，直接指定某一属性")]),t._v(" "),e("li",[t._v("方括号运算符，键的类型需要是字符串类型（包裹在引号里面）")])])]),t._v(" "),e("li",[t._v("对象的每一个键又称为“属性”（property），其值可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用")]),t._v(" "),e("li",[e("code",[t._v("Object.keys(obj1)")]),t._v(" 查看一个对象的所有属性")]),t._v(" "),e("li",[e("code",[t._v("delete obj1.pro1")]),t._v(" 删除属性")]),t._v(" "),e("li",[e("code",[t._v("obj1.hasOwnProperty('pro1')")]),t._v(" 判断 "),e("code",[t._v("pro1")]),t._v(" 是否为对象自身的属性")]),t._v(" "),e("li",[t._v("对象的属性之间用逗号分隔，最后一个属性后面可以加逗号（trailing comma），也可以不加")]),t._v(" "),e("li",[t._v("对象的属性可以动态创建，不必在对象声明时就指定，属性的“后绑定”")]),t._v(" "),e("li",[t._v("如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。如果取消某一个变量对于原对象的引用，不会影响到另一个变量")]),t._v(" "),e("li",[t._v("这种引用只限于对象，如果两个变量指向同一个原始类型的值，那么，变量这时是值拷贝的")])])])]),t._v(" "),e("p",[e("code",[t._v("undefined")]),t._v(" 和 "),e("code",[t._v("null")]),t._v(" 的区别："),e("code",[t._v("null")]),t._v(" 是一个表示“空”的对象，转为数值时为 "),e("code",[t._v("0")]),t._v("；"),e("code",[t._v("undefined")]),t._v(" 是一个表示“此处无定义”的原始值，转为数值时为 "),e("code",[t._v("NaN")])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 变量声明了，但没有赋值")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" i"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ni "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 调用函数时，应该提供的参数没有提供，该参数等于 undefined")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("x")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" x"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对象没有赋值的属性")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v("  o "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\no"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("p "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 函数没有返回值时，默认返回 undefined")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n")])])]),e("p",[t._v("JavaScript 提供了三种方法去确定一个值的类型：")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("typeof")]),t._v(" 运算符\n"),e("ul",[e("li",[e("code",[t._v("typeof undefined")]),t._v(" 返回 "),e("code",[t._v("undefined")])]),t._v(" "),e("li",[e("code",[t._v("typeof null")]),t._v(" 返回 "),e("code",[t._v("object")])])])]),t._v(" "),e("li",[e("code",[t._v("instanceof")]),t._v(" 运算符")]),t._v(" "),e("li",[e("code",[t._v("Object.prototype.toString")]),t._v(" 方法")])]),t._v(" "),e("h2",{attrs:{id:"es6-扩展"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#es6-扩展"}},[t._v("#")]),t._v(" ES6 扩展")]),t._v(" "),e("h3",{attrs:{id:"map"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#map"}},[t._v("#")]),t._v(" Map")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" item "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"userInfo"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"age"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"gender"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"male"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("userInfo"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" item  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// {"age": 18, "gender": "male"}')]),t._v("\n")])])]),e("p",[t._v("等价于")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" userInfo "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" item"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("userInfo\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);