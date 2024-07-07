---
comments: true
---

在Go语言中，函数是一种独立的代码块，用于执行特定的任务或计算，并可以通过参数进行定制。函数在Go语言中具有以下基本特点和语法结构：

### 基本语法

```go
func functionName(parameterList) (returnTypeList) {
    // 函数体
    // 可选的 return 语句
}
```

其中：

- `functionName` 是函数的名称，根据惯例，使用驼峰命名法（CamelCase）。
- `parameterList` 是参数列表，参数由参数名和参数类型组成，多个参数之间用逗号分隔。
- `returnTypeList` 是返回值列表，指定函数返回的结果类型，可以是单个类型或多个类型的组合（以括号包裹）。
- `函数体` 包含函数的具体实现，包括各种语句和逻辑。
- `return` 语句可选，用于从函数中返回一个或多个值。

### 示例

```go
package main

import "fmt"

// 定义一个函数，计算两个整数的和
func add(a int, b int) int {
    return a + b
}

// 定义一个函数，计算两个整数的差，并返回两个结果
func subtract(a, b int) (int, int) {
    return a - b, b - a
}

func main() {
    // 调用函数 add
    sum := add(5, 3)
    fmt.Println("Sum:", sum)

    // 调用函数 subtract
    diff1, diff2 := subtract(10, 5)
    fmt.Println("Difference 1:", diff1)
    fmt.Println("Difference 2:", diff2)
}
```

### 参数

函数可以接受零个或多个参数。参数列表的每个参数都必须指定类型。

```go
// 一个参数的函数
func greet(name string) {
    fmt.Println("Hello,", name)
}

// 多个参数的函数
func calculate(a, b int, op string) {
    // 函数体
}
```

### 返回值

函数可以返回一个或多个值。如果函数有多个返回值，它们必须用括号括起来。

```go
// 返回单个值的函数
func double(num int) int {
    return num * 2
}

// 返回多个值的函数
func swap(x, y string) (string, string) {
    return y, x
}
```

### 匿名函数

Go语言支持匿名函数，即没有函数名的函数，可以直接使用函数字面量（Function Literal）定义并调用。

```go
package main

import "fmt"

func main() {
    // 定义并调用匿名函数
    func() {
        fmt.Println("Hello from anonymous function!")
    }()

    // 匿名函数赋值给变量，称为函数变量
    add := func(a, b int) int {
        return a + b
    }

    sum := add(3, 5)
    fmt.Println("Sum:", sum)
}
```

### 函数作为参数和返回值

在Go语言中，函数可以作为参数传递给其他函数，也可以作为函数的返回值。

```go
package main

import "fmt"

// 函数作为参数
func apply(a, b int, operation func(int, int) int) int {
    return operation(a, b)
}

// 函数作为返回值
func getOperation(op string) func(int, int) int {
    switch op {
    case "add":
        return func(a, b int) int { return a + b }
    case "subtract":
        return func(a, b int) int { return a - b }
    default:
        return nil
    }
}

func main() {
    // 函数作为参数示例
    result := apply(10, 5, func(a, b int) int { return a * b })
    fmt.Println("Apply result:", result)

    // 函数作为返回值示例
    addOperation := getOperation("add")
    subtractOperation := getOperation("subtract")

    fmt.Println("Add result:", addOperation(3, 2))
    fmt.Println("Subtract result:", subtractOperation(5, 2))
}
```

### 注意事项

- Go语言的函数可以返回多个值，这是一种非常方便的特性。
- 函数是一等公民，可以作为参数传递和返回值。
- 函数名首字母大写表示可以被外部包访问（公共函数），小写则为私有函数。
- Go语言中函数的传递是值传递，即传递的是参数的副本，但如果参数是切片、映射、通道等引用类型，则可以修改其底层数据。

函数是Go语言中的重要组成部分，通过函数可以实现代码的模块化、重用和简化，有效提高代码的可读性和维护性。