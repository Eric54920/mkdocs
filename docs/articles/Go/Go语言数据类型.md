---
comments: true
---

Go语言提供了丰富的数据类型，用于处理不同种类的数据。以下是Go语言中主要的数据类型及其详细介绍。

### 1. 基本数据类型

#### 布尔型

布尔型用于表示真或假，取值为`true`或`false`。

```go
var b bool = true
b = false
```

#### 数字类型

- **整数类型**：
  - 有符号：`int`, `int8`, `int16`, `int32`, `int64`
  - 无符号：`uint`, `uint8`, `uint16`, `uint32`, `uint64`, `uintptr`

  ```go
  var i int = 42
  var u uint = 42
  var b byte = 255 // byte 是 uint8 的别名
  var r rune = 'a' // rune 是 int32 的别名
  ```

- **浮点型**：
  - `float32`, `float64`

  ```go
  var f float32 = 3.14
  var g float64 = 2.718
  ```

- **复数类型**：
  - `complex64`, `complex128`

  ```go
  var c complex64 = 1 + 2i
  var d complex128 = 2 + 3i
  ```

#### 字符串类型

字符串是一串连续的字符序列，用双引号括起来。字符串是不可变的。

```go
var s string = "Hello, World!"
s := "Go语言"
```

### 2. 派生类型

#### 指针类型

指针保存变量的内存地址。使用`*`操作符表示指针类型，使用`&`操作符获取变量的地址。

```go
var x int = 10
var p *int = &x
fmt.Println(*p) // 输出 10
```

#### 数组类型

数组是具有固定长度且具有相同类型元素的序列。

```go
var arr [5]int = [5]int{1, 2, 3, 4, 5}
arr := [3]string{"Go", "Python", "Java"}
fmt.Println(arr[0]) // 输出 "Go"
```

#### 切片类型

切片是对数组的一个连续片段的引用，长度可以改变。切片比数组更灵活，更常用。

```go
var s []int = []int{1, 2, 3, 4, 5}
s = append(s, 6) // 向切片添加元素
fmt.Println(s) // 输出 [1 2 3 4 5 6]
```

#### 字典类型（映射）

字典是一种键值对的数据结构，类似于其他语言中的哈希表或字典。

```go
var m map[string]int = map[string]int{"a": 1, "b": 2}
m := make(map[string]int)
m["key"] = 42
fmt.Println(m["key"]) // 输出 42
```

#### 结构体类型

结构体是一种聚合数据类型，可以将多个不同类型的变量组合成一个实体。

```go
type Person struct {
    Name string
    Age  int
}

var p Person = Person{Name: "Alice", Age: 30}
p := Person{Name: "Bob", Age: 25}
fmt.Println(p.Name) // 输出 "Bob"
```

### 3. 接口类型

接口定义了一组方法，但是这些方法没有实现。接口可以由任何实现了这些方法的类型实现。

```go
type Speaker interface {
    Speak() string
}

type Person struct {
    Name string
}

func (p Person) Speak() string {
    return "Hello, my name is " + p.Name
}

var s Speaker = Person{Name: "Alice"}
fmt.Println(s.Speak()) // 输出 "Hello, my name is Alice"
```

### 4. 函数类型

函数类型用于定义具有特定参数和返回值的函数。

```go
func add(a int, b int) int {
    return a + b
}

var f func(int, int) int = add
fmt.Println(f(2, 3)) // 输出 5
```

### 5. 类型转换

Go语言是强类型语言，不同类型之间不能自动转换，需要显式转换。

```go
var i int = 42
var f float64 = float64(i)
var s string = strconv.Itoa(i) // 将 int 转换为 string
```

### 6. 类型推断

在声明变量时，如果初始化了变量，Go可以根据初始化值推断变量类型。

```go
var x = 42       // int
var y = 3.14     // float64
var s = "hello"  // string
```

### 7. 常量类型

常量用于存储不会改变的值，使用`const`关键字声明。

```go
const Pi = 3.14
const Greeting = "Hello, World"
```

### 综合示例

下面是一个综合示例，展示了如何使用不同的数据类型和操作：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    // 基本类型
    var b bool = true
    var i int = 42
    var f float64 = 3.14
    var s string = "Go语言"
    var r rune = '你'

    fmt.Println(b, i, f, s, string(r))

    // 数组和切片
    arr := [3]int{1, 2, 3}
    slice := []int{4, 5, 6}
    slice = append(slice, 7)

    fmt.Println(arr)
    fmt.Println(slice)

    // 字典（映射）
    dict := map[string]int{"foo": 1, "bar": 2}
    dict["baz"] = 3

    fmt.Println(dict)

    // 结构体
    type Person struct {
        Name string
        Age  int
    }

    var p Person = Person{Name: "Alice", Age: 30}
    fmt.Println(p.Name, p.Age)

    // 接口
    type Speaker interface {
        Speak() string
    }

    func (p Person) Speak() string {
        return "Hello, my name is " + p.Name
    }

    var sp Speaker = p
    fmt.Println(sp.Speak())

    // 函数类型
    add := func(a int, b int) int {
        return a + b
    }

    fmt.Println(add(2, 3))

    // 类型转换
    var j int = 42
    var g float64 = float64(j)
    var t string = strconv.Itoa(j)

    fmt.Println(g, t)
}
```

这个示例涵盖了Go语言中主要的数据类型及其使用方式，帮助理解如何在Go语言中进行变量和常量的声明、初始化和操作。