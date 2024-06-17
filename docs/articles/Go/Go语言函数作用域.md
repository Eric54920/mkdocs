在Go语言中，函数作用域是指变量在程序中可见和访问的区域。在Go语言中，函数作用域遵循以下基本规则：

### 函数内部声明的变量

在函数内部声明的变量称为局部变量（Local Variables）。局部变量的作用域仅限于声明它们的函数内部。这意味着在函数外部无法访问或引用这些变量。

```go
package main

import "fmt"

func main() {
    // 局部变量 num 在 main 函数内部可见
    num := 10
    fmt.Println("Inside main function:", num)

    // 在这里无法访问 num，因为它是局部变量
}

func anotherFunction() {
    // 在这里也无法访问 num，因为它是 main 函数的局部变量
}
```

### 函数外部声明的变量

在函数外部声明的变量称为全局变量（Global Variables）。全局变量的作用域是整个包（package）。在同一个包中的所有函数都可以访问和修改这些全局变量。

```go
package main

import "fmt"

// 全局变量可以在包内所有函数中访问
var globalNum = 20

func main() {
    fmt.Println("Inside main function:", globalNum)

    // 修改全局变量的值
    globalNum = 30
    fmt.Println("Inside main function, after modification:", globalNum)
}

func anotherFunction() {
    // 可以在其他函数中访问和修改全局变量
    fmt.Println("Inside anotherFunction:", globalNum)
}
```

### 块作用域

在Go语言中，if、for、switch等代码块可以创建块作用域（Block Scope）。在这些代码块中声明的变量，其作用域仅限于该代码块内部。

```go
package main

import "fmt"

func main() {
    // 块作用域例子
    if true {
        blockVar := "Inside if block"
        fmt.Println(blockVar)
    }

    // 无法访问 blockVar，因为它是 if 语句块内部的局部变量
    // fmt.Println(blockVar) // Uncommenting this line will cause a compilation error
}
```

### 函数闭包

Go语言支持闭包（Closure），闭包是一个函数值，它引用了其函数体之外的变量。这些变量可以是定义在闭包函数体内的，也可以是该函数外部定义的变量。闭包使得函数可以访问和更新其作用域之外的变量，而不受变量生命周期的限制。

```go
package main

import "fmt"

func main() {
    // 闭包示例
    add := func(x, y int) int {
        return x + y
    }

    fmt.Println("Sum:", add(3, 5))

    // 访问和更新外部变量
    base := 10
    increment := func() int {
        base++
        return base
    }

    fmt.Println("Incremented value:", increment())
    fmt.Println("Incremented value:", increment())
}
```

### 总结

- 在Go语言中，变量的作用域由其声明的位置决定。
- 局部变量的作用域限定在声明它们的函数内部。
- 全局变量的作用域是整个包。
- 块作用域由代码块（如if、for、switch）决定，代码块内部声明的变量只在该代码块内部可见。
- 闭包函数可以访问并修改其作用域之外的变量，形成了更灵活和功能强大的函数。

理解和掌握变量的作用域是编写清晰、高效和可维护代码的重要一环。