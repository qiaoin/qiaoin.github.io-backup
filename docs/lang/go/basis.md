---
title: A Tour of Go
---

## 环境搭建

按照 [Getting Started](https://golang.org/doc/install) 进行安装，并设置好环境变量和创建好对应目录

```bash
# go, for mit 6.824
export GOPATH=$HOME/golang
export GOROOT="/usr/local/opt/go/libexec"
export PATH=$GOPATH/bin:$PATH
export PATH=$GOROOT/bin:$PATH
```

[How to Write Go Code](https://golang.org/doc/code.html)

- 模块组织
- 使用本地模块和远程模块
- 单元测试

## 语言基础

### Packages and Imports

每个 Go 程序都是由 packages 组成，程序从 main package 开始运行

使用圆括号、分行引入多个 `import`，是更好的形式

### Exported names

> 使用 C++ 中的 public、private 类比

Go 语言中，属性和方法如果以大写字母开头，那么它就是 public 的；否则就是 private 的

当导入一个包时，我们可以引用 public 修饰的属性和方法，但访问不了 private 修饰的

### Functions

顺序：变量名 变量类型

当函数的两个或多个已命名形参的类型相同时，除最后一个类型意外，其它都可以省略

函数可以返回任意数量的返回值，即 tuple

```go
package main

func swap(x, y string) (string, string) {
    return y, x
}
```

Go 的函数返回值允许命名，它们会被视作定义在函数顶部的变量；没有参数的 `return` 语句返回已命名的返回值，也就是直接返回

```go
package main

func split(sum int) (x, y int) {
    x = sum * a / 9
    y = sum - x
    return
}
```

### 变量

`var` 语句用于声明一个变量列表，跟函数的参数列表一样，类型在最后

`var` 语句可以出现在包或函数级别

变量声明可以包含初始值，每个变量对应一个

如果初始值已存在，可以省略类型；变量会从初识值中获得类型

```go
package main

var c, python, java bool
var i, j int = 1, 2
var a, b, c = true, false, "no!"
```

使用 `var` 声明变量，但在函数中可以使用简洁赋值语句 `:=` 代替 `var` 声明

函数外的每行语句都必须以关键字开始（`var` `func` 等等），因此 `:=` 结构不能在函数外使用

同导入语句一样，变量声明也可以“分组”成一个语法块。

```go
package main

import (
    "fmt"
    "math/cmplx"
)

var (
    ToBe   bool       = false
    MaxInt uint64     = 1<<64 - 1
    z      complex128 = cmplx.Sqrt(-5 + 12i)
)
```

### 常量

常量的声明与变量类似，只不过是使用 `const` 关键字。

常量可以是字符、字符串、布尔值或数值

常量不能用 `:=` 语法声明

### 基础数据类型

Go 的基本类型有

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point, 代表一个 Unicode 的码点

float32 float64

complex64 complex128
```

`int`, `uint` 和 `uintptr` 在 32 位系统上通常为 32 位宽，在 64 位系统上则为 64 位宽。 当需要一个整数值时应使用 `int` 类型，除非你有特殊的理由使用固定大小或无符号的整数类型。

没有明确初始值的变量声明会被赋予它们的**零值（zero value）**：

- 数字类型 `0`
- 布尔类型 `false`
- 字符串类型 `""`（空字符串）

```go
package main

import "fmt"

func main() {
    var i int
    var f float64
    var b bool
    var s string
    fmt.Printf("%v %v %v %q\n", i, f, b, s)
}
```

### 数据类型转换

表达式 `T(v)` 将值 `v` 转换为类型 `T`

与 C 不同的是，Go 在不同类型的项之间赋值时需要**显式类型转换**

### 类型推导

在声明一个变量而不指定其类型时（即使用不带类型的 `:=` 语法或 `var` = 表达式语法），变量的类型由右值推导得出

```go
package main

import "fmt"

func main() {
    v := 3.142 // 修改这里！
    fmt.Printf("v is of type %T\n", v)
}
```

### for

Go 只有一种循环结构，`for` 循环。初始化语句通常为一句短变量声明，该变量声明仅在 `for` 语句的作用域中可见

初始化语句和后置语句是可选的，此时可以去掉分号，因为 C 的 `while` 在 Go 中叫做 `for`

```go
package main

import "fmt"

func main() {
    sum := 0
    for i := 0; i < 10; i++ {
        sum += i
    }
    fmt.Println(sum)

    all := 1
    for ; all < 1000; {
        all += all
    }
    fmt.Println(all)

    all2 := 1
    for all2 < 1000 {
        all2 += all2
    }
    fmt.Println(all2)

    // 无限循环
    for {
    }
}
```

### if

Go 的 `if` 语句与 `for` 循环类似，表达式外无需小括号 `( )`，而大括号 `{ }` 则是必须的

同 `for` 一样， `if` 语句可以在条件表达式前执行一个简单的语句；该语句声明的变量作用域仅在 `if` 之内

在 `if` 的简短语句中声明的变量同样可以在任何对应的 `else` 块中使用

```go
package main

import (
    "fmt"
    "math"
)

func sqrt(x float64) string {
    if x < 0 {
        return sqrt(-x) + "i"
    }
    return fmt.Sprint(math.Sqrt(x))
}

func pow(x, n, lim float64) float64 {
    if v := math.Pow(x, n); v < lim {
        return v
    } else {
        fmt.Printf("%g >= %g\n", v, lim)
    }
    return lim
}

func main() {

}
```

牛顿法求平方根

```go
package main

import (
    "fmt"
    "math"
)

func IsEnough(x, guess float64) bool {
    return math.Abs(x - guess * guess) < 0.0000000000001
}

func Improve(x, guess float64) float64 {
    return guess - (guess * guess - x) / (2 * guess)
}

func Sqrt(x float64) float64 {
    guess := 1.0
    for !IsEnough(x, guess) {
        fmt.Println(guess)
        guess = Improve(x, guess)
    }
    return guess
}

func main() {
    fmt.Println(Sqrt(2))
}
```

### switch

- Go 只运行满足条件的 `case`，而非之后的所有的 `case`。实际上，Go 自动提供给了其他语言在 `case` 后面所需要的 `break` 语句
- 除非以 `fallthrough` 语句结束，否则分支会自动终止
- Go 的 `switch` 的 `case` 无需为常量，且取值不必为整数

switch 的 case 语句从上到下顺次执行，直到匹配成功时停止。

```go
switch i {
    case 0:
    case f():
}
```

在 `i==0` 时 `f` 不会被调用

没有条件的 `switch` 同 `switch true` 一样；这种形式能将一长串 `if-then-else` 写得更加清晰。

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    t := time.Now()
    switch {
    case t.Hour() < 12:
        fmt.Println("Good morning!")
    case t.Hour() < 17:
        fmt.Println("Good afternoon.")
    default:
        fmt.Println("Good evening.")
    }
}
```

### defer

`defer` 语句会将函数推迟到外层函数返回之后执行。推迟调用的函数其参数会立即求值，但直到外层函数返回前该函数都不会被调用

推迟的函数调用会被压入一个栈中。当外层函数返回时，被推迟的函数会按照后进先出的顺序调用。

```go
package main

import "fmt"

func main() {
    fmt.Println("counting")

    for i := 0; i < 10; i++ {
        defer fmt.Println(i)
    }

    fmt.Println("done")
}
```

### 指针

Go 语言中也有指针，指针保存了值的内存地址。类型 `*T` 是指向 `T` 类型值的指针。其零值为 `nil`

`&` 操作符会生成一个指向其操作数的指针

`*` 操作符表示指针指向的底层值

与 C 不同，Go 没有指针运算

### 结构体 struct

- 一个结构体（`struct`）就是一组字段（field）
- 结构体字段使用点号来访问
- 结构体字段可以通过结构体指针来访问。如果我们有一个指向结构体的指针 `p`，那么可以通过 `(*p).X` 来访问其字段 `X`。不过这么写太啰嗦了，所以语言也允许我们使用隐式间接引用，直接写 `p.X` 就可以

```go
package main

import "fmt"

type Vertex struct {
    X int
    Y int
}

func main() {
    v := Vertex{1, 2}
    fmt.Println(v)
    v.X = 4
    fmt.Println(v)

    p := &v
    p.X = 9
    fmt.Println(v)
}
```

- 结构体文法通过直接列出字段的值来新分配一个结构体。
- 使用 `Name:` 语法可以仅列出部分字段。（字段名的顺序无关。）
- 特殊的前缀 `&` 返回一个指向结构体的指针。

```go
package main

import "fmt"

type Vertex struct {
    X, Y int
}

var (
    v1 = Vertex{1, 2}  // 创建一个 Vertex 类型的结构体
    v2 = Vertex{X: 1}  // Y:0 被隐式地赋予
    v3 = Vertex{}      // X:0 Y:0
    p  = &Vertex{1, 2} // 创建一个 *Vertex 类型的结构体（指针）
)

func main() {
    fmt.Println(v1, p, v2, v3)
}
```

### 数组

类型 `[n]T` 表示拥有 n 个 `T` 类型的值的数组

数组的长度是其类型的一部分，因此数组不能改变大小

```go
package main

import "fmt"

func main() {
    var a [2]string
    a[0] = "Hello"
    a[1] = "World"
    fmt.Println(a[0], a[1])
    fmt.Println(a)

    primes := [6]int{2, 3, 5, 7, 11, 13}
    fmt.Println(primes)
}
```

### 切片 slice

每个数组的大小都是固定的。而切片则为数组元素提供动态大小的、灵活的视角。在实践中，切片比数组更常用。

类型 `[]T` 表示一个元素类型为 `T` 的切片。

切片通过两个下标来界定，即一个上界和一个下界，二者以冒号分隔：

```go
// a[low : high]
// 切片下界的默认值为 0，上界则是该切片的长度
package main

import "fmt"

func main() {
    primes := [6]int{2, 3, 5, 7, 11, 13}

    var s []int = primes[1:4]  // [3, 5, 7]
    fmt.Println(s)

    s = s[:2]
    fmt.Println(s)

    s = s[1:]
    fmt.Println(s)
}
```

它会选择一个半开区间，包括第一个元素，但排除最后一个元素

- 切片并不存储任何数据，它只是描述了底层数组中的一段。
- 更改切片的元素会修改其底层数组中对应的元素。
- 与它共享底层数组的切片都会观测到这些修改。

切片文法类似于没有长度的数组文法。

```go
// 数组文法
[3]bool{true, true, false}

// 会创建一个和上面相同的数组，然后构建一个引用了它的切片
[]bool{true, true, false}
```

切片拥有**长度**和**容量**

切片的**长度**就是它所包含的元素个数。

切片的**容量**是从它的第一个元素开始数，到其底层数组元素末尾的个数。

切片 `s` 的长度和容量可通过表达式 `len(s)` 和 `cap(s)` 来获取。

切片的默认值是 `nil`。`nil` 切片的长度和容量为 0 且没有底层数组。

切片可以用内建函数 `make` 来创建，这也是创建动态数组的方式。

`make` 函数会分配一个元素为零值的数组并返回一个引用了它的切片：

```go
a := make([]int, 5)  // len(a)=5
```

要指定它的容量，需向 `make` 传入第三个参数：

```go
b := make([]int, 0, 5) // len(b)=0, cap(b)=5

b = b[:cap(b)]  // len(b)=5, cap(b)=5
b = b[1:]      // len(b)=4, cap(b)=4
```

切片可包含任何类型，甚至包括其它的切片

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    // 创建一个井字板（经典游戏）
    board := [][]string{
        []string{"_", "_", "_"},
        []string{"_", "_", "_"},
        []string{"_", "_", "_"},
    }

    // 两个玩家轮流打上 X 和 O
    board[0][0] = "X"
    board[2][2] = "O"
    board[1][2] = "X"
    board[1][0] = "O"
    board[0][2] = "X"

    for i := 0; i < len(board); i++ {
        fmt.Printf("%s\n", strings.Join(board[i], " "))
    }
}
```

向切片追加元素：为切片追加新的元素是种常用的操作，为此 Go 提供了内建的 `append` 函数。内建函数的文档对此函数有详细的介绍。

```go
func append(s []T, vs ...T) []T
```

`append` 的第一个参数 `s` 是一个元素类型为 `T` 的切片，其余类型为 `T` 的值将会追加到该切片的末尾。

`append` 的结果是一个包含原切片所有元素加上新添加元素的切片。

当 `s` 的底层数组太小，不足以容纳所有给定的值时，它就会分配一个更大的数组。返回的切片会指向这个新分配的数组。

`for` 循环的 `range` 形式可遍历切片或映射。当使用 `for` 循环遍历切片时，每次迭代都会返回两个值。第一个值为当前元素的下标，第二个值为该下标所对应元素的一份副本。

```go
package main

import "fmt"

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
    for i, v := range pow {
        fmt.Printf("2**%d = %d\n", i, v)
    }
}
```

可以将下标或值赋予 `_` 来忽略它。

```go
for i, _ := range pow
for _, value := range pow
```

若你只需要索引，忽略第二个变量即可。

```go
for i := range pow
```

```go
package main

import "fmt"

func main() {
    pow := make([]int, 10)
    for i := range pow {
        pow[i] = 1 << uint(i) // == 2**i
    }
    for _, value := range pow {
        fmt.Printf("%d\n", value)
    }
}

func Pic(dx, dy int) [][]uint8 {
    items := make([][]uint8, dy)
    for i := 0; i < dy; i++ {
        items[i] = make([]uint8, dx)
        for j :=0; j < dx; j++ {
            items[i][j] = uint8(i * j)
        }
    }

    return items
}
```

### 映射/字典 map

映射将键映射到值。映射的零值为 `nil` 。`nil` 映射既没有键，也不能添加键。`make` 函数会返回给定类型的映射，并将其初始化备用。

映射的文法与结构体相似，不过必须有键名。

```go
package main

import "fmt"

type Vertex struct {
    Lat, Long float64
}

var m = map[string]Vertex{
    "Bell Labs": Vertex{
        40.68433, -74.39967,
    },
    "Google": Vertex{
        37.42202, -122.08408,
    },
}

// 若顶级类型只是一个类型名，你可以在文法的元素中省略它。
// var m = map[string]Vertex{
//     "Bell Labs": {40.68433, -74.39967},
//     "Google":    {37.42202, -122.08408},
// }

var n map[string]Vertex

func main() {
    fmt.Println(m)

    n = make(map[string]Vertex)
    n["Bell Labs"] = Vertex{
        40.68433, -74.39967,
    }
    fmt.Println(n["Bell Labs"])
}
```
