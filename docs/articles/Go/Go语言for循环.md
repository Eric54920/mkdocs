---
comments: true
---

在Go语言中，`for` 语句是唯一的循环结构。`for` 语句非常灵活，可以用来实现各种循环模式，包括条件循环、无限循环、集合迭代等。以下是对 Go 语言中 `for` 语句的详细介绍，包括语法、使用示例和注意事项。

### 1. 基本语法

`for` 语句的基本语法形式如下：

```go
for init; condition; post {
    // 执行语句块
}
```

- `init`：初始化语句，在第一次迭代前执行。
- `condition`：条件表达式，在每次迭代前求值。如果为 `true`，则执行循环体，否则退出循环。
- `post`：后置语句，在每次迭代后执行。

### 2. 基本用法

```go
package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        fmt.Println(i)
    }
}
```
这个示例将在控制台输出0到4的数字。

### 3. 无限循环

`for` 语句可以用来创建一个无限循环：

```go
package main

import "fmt"

func main() {
    for {
        fmt.Println("This will print forever")
    }
}
```
这个循环永远不会结束。通常，您会在循环体内使用 `break` 语句来退出循环。

### 4. 条件循环

可以省略 `init` 和 `post`，只保留 `condition`：

```go
package main

import "fmt"

func main() {
    i := 0
    for i < 5 {
        fmt.Println(i)
        i++
    }
}
```
这个循环在 `i` 小于5时继续执行。

### 5. 集合迭代

使用 `range` 关键字可以方便地迭代数组、切片、映射、字符串和通道：

#### 5.1 迭代数组或切片

```go
package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    for index, value := range numbers {
        fmt.Printf("Index: %d, Value: %d\n", index, value)
    }
}
```

#### 5.2 迭代映射

```go
package main

import "fmt"

func main() {
    colors := map[string]string{
        "red":   "#FF0000",
        "green": "#00FF00",
        "blue":  "#0000FF",
    }
    for key, value := range colors {
        fmt.Printf("Key: %s, Value: %s\n", key, value)
    }
}
```

#### 5.3 迭代字符串

```go
package main

import "fmt"

func main() {
    str := "hello"
    for index, char := range str {
        fmt.Printf("Index: %d, Char: %c\n", index, char)
    }
}
```

### 6. 使用 `break` 和 `continue`

- `break`：立即退出循环。
- `continue`：跳过本次迭代，开始下一次迭代。

#### 6.1 示例

```go
package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        if i == 5 {
            break // 当 i 等于 5 时退出循环
        }
        fmt.Println(i)
    }

    for j := 0; j < 10; j++ {
        if j%2 == 0 {
            continue // 当 j 是偶数时跳过本次迭代
        }
        fmt.Println(j)
    }
}
```

### 7. 多重循环

Go语言支持多重循环，即在一个循环体内嵌套另一个循环：

```go
package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            fmt.Printf("i: %d, j: %d\n", i, j)
        }
    }
}
```

### 8. 标签和跳转

标签可以与 `break` 和 `continue` 结合使用，以控制多重循环的跳转：

```go
package main

import "fmt"

func main() {
OuterLoop:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if i == 1 && j == 1 {
                break OuterLoop // 跳出标签 OuterLoop 标识的循环
            }
            fmt.Printf("i: %d, j: %d\n", i, j)
        }
    }
}
```

### 9. 总结

`for` 语句在 Go 语言中非常灵活和强大，能够实现多种循环模式。通过不同的组合方式，您可以方便地实现各种循环控制逻辑。在编写循环代码时，要注意循环条件的控制，以避免进入无限循环或意外的跳转行为。