---
comments: true
---

在Go语言中，`for`循环用于重复执行某段代码，其语法形式灵活且功能强大。Go语言的`for`循环有多种形式，可以用于不同的迭代需求。

### 1. 基本形式

最常见的`for`循环形式类似于C语言的`for`循环，语法如下：

```go
for initialization; condition; post {
    // 循环体
}
```

其中：

- `initialization`：循环开始前的初始化语句（可选），一般用于初始化循环变量。
- `condition`：循环条件表达式，每次迭代前都会计算。
- `post`：每次迭代后执行的语句（可选），一般用于更新循环变量。

示例：

```go
package main

import "fmt"

func main() {
    // 示例1：基本的for循环
    for i := 0; i < 5; i++ {
        fmt.Println(i)
    }

    // 示例2：省略初始化语句和后置语句
    sum := 0
    for ; sum < 10; {
        sum += 2
    }
    fmt.Println("Sum:", sum)

    // 示例3：无限循环，类似于while(true)
    n := 0
    for {
        n++
        if n > 3 {
            break // 使用break语句退出循环
        }
    }
    fmt.Println("n:", n)
}
```

### 2. 省略初始化和后置语句的for循环

Go语言中可以省略`for`循环的初始化语句和后置语句，相当于`while`循环的形式。例如：

```go
package main

import "fmt"

func main() {
    // 省略初始化语句和后置语句的for循环
    sum := 1
    for sum < 1000 {
        sum += sum
    }
    fmt.Println("Sum:", sum)
}
```

### 3. 遍历数组、切片、映射和字符串

Go语言的`for`循环可以用于遍历数组、切片、映射和字符串等数据结构。使用`range`关键字可以简化遍历过程。

- **数组和切片：**

```go
package main

import "fmt"

func main() {
    // 遍历数组
    numbers := [5]int{1, 2, 3, 4, 5}
    for index, value := range numbers {
        fmt.Printf("Index: %d, Value: %d\n", index, value)
    }

    // 遍历切片
    colors := []string{"Red", "Green", "Blue"}
    for index, value := range colors {
        fmt.Printf("Index: %d, Value: %s\n", index, value)
    }
}
```

- **映射：**

```go
package main

import "fmt"

func main() {
    // 遍历映射
    person := map[string]string{
        "name": "Alice",
        "age":  "30",
        "city": "New York",
    }
    for key, value := range person {
        fmt.Printf("Key: %s, Value: %s\n", key, value)
    }
}
```

- **字符串：**

```go
package main

import "fmt"

func main() {
    // 遍历字符串（Unicode代码点）
    message := "Hello, 世界"
    for index, runeValue := range message {
        fmt.Printf("%#U starts at byte position %d\n", runeValue, index)
    }
}
```

### 4. 循环控制语句

Go语言的循环中可以使用`break`、`continue`和`goto`语句来控制循环的执行流程。

- **break**：退出循环。
- **continue**：跳过当前循环的剩余语句，开始下一次循环。
- **goto**：用于无条件地转移到程序中的另一个语句，通常与标签一起使用。

示例：

```go
package main

import "fmt"

func main() {
    // 示例：使用break和continue
    sum := 0
    for i := 0; i < 10; i++ {
        if i%2 == 0 {
            continue // 跳过偶数
        }
        sum += i
        if sum > 5 {
            break // 当累加和大于5时退出循环
        }
    }
    fmt.Println("Sum:", sum)
}
```

### 5. 标签和goto语句

Go语言支持标签（label）和无条件的`goto`语句，但在实际中应慎用，因为滥用`goto`可能会导致程序难以理解和维护。

```go
package main

import "fmt"

func main() {
    // 示例：使用goto语句和标签
    i := 0
Loop:
    for {
        i++
        if i == 5 {
            goto EndLoop
        }
        fmt.Println("Iteration", i)
    }
EndLoop:
    fmt.Println("End of loop")
}
```

### 总结

以上是Go语言中`for`循环的基本用法及高级特性，可以根据具体的迭代需求选择合适的`for`循环形式，或者使用`range`关键字遍历复杂数据结构。在编写代码时，应根据具体情况选择最合适的循环形式，以提高代码的可读性和效率。