---
comments: true
---

Go 语言在 1.18 版本中引入了对泛型的支持，这使得编写更加灵活和可重用的代码变得可能。泛型允许你编写可以处理多种数据类型的函数和数据结构，而不必为每种类型单独编写代码。

### 泛型函数

泛型函数是指可以接受多种类型参数的函数。以下是一个简单的泛型函数示例，它返回两个参数中的较大者：

```go
package main

import (
    "fmt"
)

// 定义一个通用的比较函数，使用泛型
func Max[T comparable](a, b T) T {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(Max(3, 5))           // 输出 5
    fmt.Println(Max("apple", "pear")) // 输出 pear
}
```

在这个例子中，`Max` 函数使用了一个类型参数 `T`，它必须满足 `comparable` 接口，这意味着该类型必须支持比较操作（例如 `==` 和 `>`）。函数体内的 `a` 和 `b` 参数也都是 `T` 类型。

### 泛型类型

除了泛型函数外，你还可以定义泛型类型。下面是一个简单的泛型栈（stack）实现：

```go
package main

import (
    "fmt"
)

// 定义一个泛型栈
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() T {
    if len(s.items) == 0 {
        var zero T
        return zero
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item
}

func main() {
    intStack := Stack[int]{}
    intStack.Push(1)
    intStack.Push(2)
    fmt.Println(intStack.Pop()) // 输出 2
    fmt.Println(intStack.Pop()) // 输出 1

    stringStack := Stack[string]{}
    stringStack.Push("hello")
    stringStack.Push("world")
    fmt.Println(stringStack.Pop()) // 输出 world
    fmt.Println(stringStack.Pop()) // 输出 hello
}
```

在这个例子中，`Stack` 类型使用了一个类型参数 `T`，并且我们可以创建不同类型的 `Stack` 实例，例如 `Stack[int]` 和 `Stack[string]`。

### 泛型接口

Go 也支持带有类型参数的接口。以下是一个简单的例子，展示了如何定义和使用泛型接口：

```go
package main

import (
    "fmt"
)

// 定义一个泛型接口
type Adder[T any] interface {
    Add(a, b T) T
}

// 实现泛型接口的整数类型
type IntAdder struct{}

func (IntAdder) Add(a, b int) int {
    return a + b
}

// 实现泛型接口的浮点数类型
type FloatAdder struct{}

func (FloatAdder) Add(a, b float64) float64 {
    return a + b
}

func main() {
    var intAdder Adder[int] = IntAdder{}
    fmt.Println(intAdder.Add(1, 2)) // 输出 3

    var floatAdder Adder[float64] = FloatAdder{}
    fmt.Println(floatAdder.Add(1.1, 2.2)) // 输出 3.3
}
```

在这个例子中，我们定义了一个泛型接口 `Adder`，并为不同的类型（`int` 和 `float64`）实现了该接口。

### 约束（Constraints）

约束是对泛型类型参数施加的限制，用于指定可以传递给泛型的类型。你可以使用预定义的接口如 `comparable` 或定义自己的约束。例如：

```go
package main

import (
    "fmt"
)

// 定义一个数字约束
type Number interface {
    int | int32 | int64 | float32 | float64
}

// 使用数字约束的泛型函数
func Sum[T Number](a, b T) T {
    return a + b
}

func main() {
    fmt.Println(Sum(1, 2))           // 输出 3
    fmt.Println(Sum(1.5, 2.5))       // 输出 4
}
```

在这个例子中，`Number` 约束允许 `Sum` 函数接受 `int`、`int32`、`int64`、`float32` 和 `float64` 类型的参数。

### 总结

Go 语言的泛型特性提供了强大的工具，用于编写类型安全且可重用的代码。通过使用泛型函数、泛型类型和泛型接口，你可以创建更通用的代码，而不必为每种数据类型编写重复的实现。使用约束可以进一步控制泛型类型参数，确保它们满足特定的条件或接口。