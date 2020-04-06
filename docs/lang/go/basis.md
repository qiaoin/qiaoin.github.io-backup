---
title: A Tour of Go
---

```go
package main

import (
    "fmt"
    "math/cmplx"
    "time"
)

var (
    ToBe   bool       = false
    MaxInt uint64     = 1 << 64 -1
    z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func add(x int, y int) int {
    return x + y
}

func swap(x, y string) (string, string) {
    return y, x
}

func main() {
    fmt.Println("Hello, 世界")

    fmt.Println("The time is", time.Now())

    fmt.Println(add(42, 13))

    a, b := swap("hello", "world")
    fmt.Println(a, b)

    fmt.Println("Type: %T Value: %v\n, ToBe, ToBe)
    fmt.Println("Type: %T Value: %v\n, MaxInt, MaxInt)
    fmt.Println("Type: %T Value: %v\n, z, z)
}
```

## Packages and Imports

Every Go program is made up of packages. Programs start running in package main.

使用圆括号、分行引入多个 `import`

## Exported names

In Go, a name is exported if it begins with a capital letter.

When importing a package, you can refer only to its exported names. Any "unexported" names are not accessible from outside the package.

## Functions

When two or more consecutive named function parameters share a type, you can omit the type from all but the last.

A function can return any number of results.

## Variables

The var statement declares a list of variables; as in function argument lists, the type is last.

A var statement can be at package or function level.

A var declaration can include initializers, one per variable.

If an initializer is present, the type can be omitted; the variable will take the type of the initializer.

Inside a function, the `:=` short assignment statement can be used in place of a `var` declaration with implicit type.

Outside a function, every statement begins with a keyword (`var`, `func`, and so on) and so the `:=` construct is not available.

Variable declarations may be "factored" into blocks, as with import statements.

Constants are declared like variables, but with the const keyword. Constants can be character, string, boolean, or numeric values. Constants cannot be declared using the := syntax.

## 基础数据类型

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex128
```

When you need an integer value you should use int unless you have a specific reason to use a sized or unsigned integer type.

Variables declared without an explicit initial value are given their `zero` value.

变量如果没有被初始化，就会有默认值：

- 数字类型 `0`
- 布尔类型 `false`
- 字符串类型 `""`(the empty string)

## 数据类型转换

The expression `T(v)` converts the value `v` to the type `T`.

Unlike in C, in Go assignment between items of different type requires an explicit conversion.

Go 需要进行显式类型转换。

## Type inference

When declaring a variable without specifying an explicit type (either by using the := syntax or var = expression syntax), the variable's type is inferred from the value on the right hand side.



