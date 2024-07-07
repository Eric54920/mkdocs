---
comments: true
---

在Go语言中，`defer` 语句用于延迟（或推迟）函数的执行直到周围函数返回之前。`defer` 语句会将函数推迟到所在函数执行完成后再执行，无论函数是通过正常返回、出现错误、或者 panic 异常退出，`defer` 都会确保推迟的函数最终会被调用。

### 基本语法

`defer` 语句由 `defer` 关键字后跟需要延迟执行的函数调用组成。当包含 `defer` 的函数执行到最后时，推迟的函数调用会按照后进先出（LIFO）的顺序执行。

```go
package main

import "fmt"

func main() {
    // defer语句会推迟该函数的执行，直到main函数执行完毕
    defer fmt.Println("World")

    fmt.Println("Hello")

    // defer语句是后进先出的顺序执行
    defer fmt.Println("Deferred 1")
    defer fmt.Println("Deferred 2")
    defer fmt.Println("Deferred 3")
}
```

在上面的例子中，输出将会是：

```
Hello
Deferred 3
Deferred 2
Deferred 1
World
```

### defer的特点和用法

- **执行时机：** 推迟的函数调用直到包含 `defer` 的函数执行完成后才会执行，无论函数是通过正常返回还是 panic 异常退出。
  
- **参数求值：** 推迟函数调用时，会先对参数进行求值。如果函数有多个参数，参数会从左到右依次求值。

- **典型用途：** defer 经常被用于确保某些清理操作被执行。例如，打开文件后立即 defer 关闭文件操作，以确保文件关闭操作在函数返回时执行。

```go
func readFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close() // 确保在函数返回时关闭文件

    // 读取文件内容并进行处理
    // ...

    return nil
}
```

- **注意事项：** 在循环中使用 defer 时，推迟的函数调用会在循环结束后才执行。因此，在迭代过程中推迟调用的函数可能会延迟到循环完成后才执行。

### defer与函数参数

当使用 defer 时，它不仅可以推迟函数的调用，还可以推迟函数执行时对参数的求值。这意味着即使函数的参数是在 defer 语句执行时进行求值的，也可以在函数最终执行时使用这些参数。

```go
func demo() {
    x := 10
    defer fmt.Println("Value of x:", x) // 输出的是10
    x++
}
```

在这个例子中，尽管 `x` 的值在 `defer` 语句被推迟时是 `10`，但是在函数执行结束时，`x` 的值仍然是 `11`