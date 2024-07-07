---
comments: true
---

在Go语言中，数组（Array）是一种固定长度的数据结构，用于存储具有相同数据类型的元素序列。数组的长度是数组类型的一部分，因此在声明数组时必须指定其长度。Go语言的数组具有以下特点：

### 声明数组

在Go语言中，声明数组的基本语法如下：

```go
var arrayName [length]dataType
```

其中：

- `arrayName` 是数组的名称。
- `length` 是数组的长度，必须是一个常量表达式（即在编译时可以确定的值）。
- `dataType` 是数组存储的元素类型，可以是任何有效的数据类型，包括基本类型和结构体等。

示例：

```go
package main

import "fmt"

func main() {
    // 声明一个长度为5的整数数组
    var numbers [5]int
    fmt.Println("Empty Array:", numbers)

    // 声明并初始化一个整数数组
    primes := [5]int{2, 3, 5, 7, 11}
    fmt.Println("Primes Array:", primes)

    // 声明并初始化一个字符串数组
    fruits := [3]string{"Apple", "Banana", "Cherry"}
    fmt.Println("Fruits Array:", fruits)

    // 声明并初始化一个布尔数组
    flags := [4]bool{true, false, true, false}
    fmt.Println("Flags Array:", flags)
}
```

### 访问数组元素

可以使用索引（从0开始）访问数组中的元素。例如，访问数组 `arrayName` 的第 `i` 个元素，语法为 `arrayName[i]`。

```go
package main

import "fmt"

func main() {
    primes := [5]int{2, 3, 5, 7, 11}

    fmt.Println("First prime:", primes[0])
    fmt.Println("Third prime:", primes[2])

    // 修改数组元素
    primes[1] = 13
    fmt.Println("Modified primes:", primes)
}
```

### 数组长度

数组的长度是固定的，一旦定义，无法更改。在声明时指定的长度决定了数组可以存储的元素个数。

### 遍历数组

可以使用 `for` 循环和数组的长度来遍历数组的所有元素。

```go
package main

import "fmt"

func main() {
    numbers := [5]int{1, 2, 3, 4, 5}

    // 使用for循环遍历数组
    for i := 0; i < len(numbers); i++ {
        fmt.Println("Element:", numbers[i])
    }

    // 使用range关键字遍历数组
    for index, value := range numbers {
        fmt.Printf("Index: %d, Value: %d\n", index, value)
    }
}
```

### 注意事项

- Go语言中数组的长度必须是常量，不能是变量或者动态计算的表达式。
- 数组是值类型，在传递给函数时会复制整个数组。如果想在函数中修改数组内容，可以传递数组的指针。
- 数组的元素类型可以是任何合法的数据类型，包括结构体和其他数组类型。

### 零值

在Go语言中，如果声明了一个数组但没有初始化它，数组的每个元素将被初始化为其类型的零值。对于数值类型，零值是0；对于字符串类型，零值是空字符串；对于布尔类型，零值是false。

```go
package main

import "fmt"

func main() {
    var numbers [5]int
    fmt.Println("Zero Value Array:", numbers)
}
```

以上是关于Go语言数组的基本概念、声明、初始化、访问和遍历方法。数组在Go语言中是一种简单但十分有用的数据结构，常用于需要固定大小且类型明确的数据存储场景。