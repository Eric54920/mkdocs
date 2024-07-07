---
comments: true
---

Go语言的`fmt`包提供了格式化I/O的函数，类似于C语言的`printf`和`scanf`系列函数。`fmt`包中的函数可以用于格式化字符串并输出到控制台或者其他输出设备，以及从输入设备读取格式化输入。

### 输出函数

#### 1. `Print`系列

- `fmt.Print(a ...interface{}) (n int, err error)`：直接输出参数，不带格式。
- `fmt.Println(a ...interface{}) (n int, err error)`：输出参数，并在最后加上换行符。
- `fmt.Printf(format string, a ...interface{}) (n int, err error)`：按照指定的格式输出参数。

```go
package main

import "fmt"

func main() {
    // 使用Print输出
    fmt.Print("Hello, ")
    fmt.Print("World!")
    fmt.Print("\n")

    // 使用Println输出
    fmt.Println("Hello, World!")
    fmt.Println("Number:", 42)

    // 使用Printf输出
    name := "Alice"
    age := 30
    fmt.Printf("Name: %s, Age: %d\n", name, age)
}
```

#### 2. `Fprint`系列

- `fmt.Fprint(w io.Writer, a ...interface{}) (n int, err error)`：将格式化的字符串写入`w`，`w`可以是文件、缓冲区等。
- `fmt.Fprintln(w io.Writer, a ...interface{}) (n int, err error)`：类似`Fprint`，但会在最后添加换行符。
- `fmt.Fprintf(w io.Writer, format string, a ...interface{}) (n int, err error)`：格式化后写入`w`。

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    f, _ := os.Create("output.txt")
    defer f.Close()

    fmt.Fprint(f, "Hello, ")
    fmt.Fprintln(f, "World!")
    fmt.Fprintf(f, "Name: %s, Age: %d\n", "Alice", 30)
}
```

#### 3. `Sprint`系列

- `fmt.Sprint(a ...interface{}) string`：返回格式化后的字符串。
- `fmt.Sprintln(a ...interface{}) string`：类似`Sprint`，但会在最后添加换行符。
- `fmt.Sprintf(format string, a ...interface{}) string`：返回格式化后的字符串。

```go
package main

import "fmt"

func main() {
    str := fmt.Sprint("Hello, ", "World!")
    fmt.Println(str)

    str = fmt.Sprintln("Hello, World!")
    fmt.Print(str)

    name := "Alice"
    age := 30
    str = fmt.Sprintf("Name: %s, Age: %d\n", name, age)
    fmt.Print(str)
}
```

### 输入函数

#### 1. `Scan`系列

- `fmt.Scan(a ...interface{}) (n int, err error)`：从标准输入读取内容，存入参数中。
- `fmt.Scanln(a ...interface{}) (n int, err error)`：类似`Scan`，但会在遇到换行符时停止读取。
- `fmt.Scanf(format string, a ...interface{}) (n int, err error)`：按照指定格式从标准输入读取内容。

```go
package main

import "fmt"

func main() {
    var name string
    var age int

    // 使用Scan
    fmt.Print("Enter your name and age: ")
    fmt.Scan(&name, &age)
    fmt.Println("Name:", name, "Age:", age)

    // 使用Scanln
    fmt.Print("Enter your name: ")
    fmt.Scanln(&name)
    fmt.Println("Name:", name)

    // 使用Scanf
    fmt.Print("Enter your age: ")
    fmt.Scanf("%d", &age)
    fmt.Println("Age:", age)
}
```

#### 2. `Fscan`系列

- `fmt.Fscan(r io.Reader, a ...interface{}) (n int, err error)`：从`r`中读取内容，存入参数中。
- `fmt.Fscanln(r io.Reader, a ...interface{}) (n int, err error)`：类似`Fscan`，但会在遇到换行符时停止读取。
- `fmt.Fscanf(r io.Reader, format string, a ...interface{}) (n int, err error)`：按照指定格式从`r`中读取内容。

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    f, _ := os.Open("input.txt")
    defer f.Close()

    var name string
    var age int

    fmt.Fscan(f, &name, &age)
    fmt.Println("Name:", name, "Age:", age)

    fmt.Fscanln(f, &name)
    fmt.Println("Name:", name)

    fmt.Fscanf(f, "%d", &age)
    fmt.Println("Age:", age)
}
```

#### 3. `Sscan`系列

- `fmt.Sscan(str string, a ...interface{}) (n int, err error)`：从字符串`str`中读取内容，存入参数中。
- `fmt.Sscanln(str string, a ...interface{}) (n int, err error)`：类似`Sscan`，但会在遇到换行符时停止读取。
- `fmt.Sscanf(str string, format string, a ...interface{}) (n int, err error)`：按照指定格式从字符串`str`中读取内容。

```go
package main

import "fmt"

func main() {
    str := "Alice 30"
    var name string
    var age int

    fmt.Sscan(str, &name, &age)
    fmt.Println("Name:", name, "Age:", age)

    str = "Bob\n"
    fmt.Sscanln(str, &name)
    fmt.Println("Name:", name)

    str = "40"
    fmt.Sscanf(str, "%d", &age)
    fmt.Println("Age:", age)
}
```

### 格式化占位符

`fmt`包中的格式化函数使用占位符来指定格式。常见的占位符如下：

- `%v`：值的默认格式表示。
- `%+v`：类似`%v`，但输出结构体时会添加字段名。
- `%#v`：值的Go语法表示。
- `%T`：值的类型。
- `%%`：字面上的百分号。

#### 布尔类型

- `%t`：单词`true`或`false`。

#### 整数类型

- `%b`：二进制表示。
- `%c`：相应Unicode码点表示。
- `%d`：十进制表示。
- `%o`：八进制表示。
- `%O`：带零的八进制表示。
- `%q`：单引号围绕的字符字面值，必要时会采用安全的转义表示。
- `%x`：十六进制表示，使用a-f。
- `%X`：十六进制表示，使用A-F。
- `%U`：Unicode格式：U+1234，等同于"U+%04X"。

#### 浮点数和复数

- `%b`：无小数部分的科学计数法，如-123456p-78。
- `%e`：科学计数法，如-1.234456e+78。
- `%E`：科学计数法，如-1.234456E+78。
- `%f`：有小数部分但无指数部分，如123.456。
- `%F`：等同于`%f`。
- `%g`：根据实际情况采用%e或%f格式（以获得更简洁、准确的输出）。
- `%G`：根据实际情况采用%E或%F格式（以获得更简洁、准确的输出）。

#### 字符串和字节切片

- `%s`：字符串或字节切片。
- `%q`：双引号围绕的字符串字面值，必要时会采用安全的转义表示。
- `%x`：每个字节用两字符十六进制数表示（使用a-f）。
- `%X`：每个字节用两字符十六进制数表示（使用A-F）。

#### 指针

- `%p`：十六进制表示，前缀0x。

### 示例

以下是一个综合示例，展示了`fmt`包的常用功能和占位符的用法：

```go
package main

import "fmt"

func main() {
    // Print 系列函数
    fmt.Print("Hello, ")
    fmt.Print("World!\n")

    // Println 系列函数
    fmt.Println("Hello, World!")
    fmt.Println("Number:", 42)

    // Printf 系列函数
    name := "Alice"
    age := 30
    fmt.Printf("Name: %s, Age: %d\n", name, age)

    // Fprint 系列函数
    fmt.Fprint(os.Stdout, "Hello, ")
    fmt.Fprintln(os.Stdout, "World!")
    fmt.Fprintf(os.Stdout, "Name: %s, Age: %d\n", name, age)

    // Sprint 系列函数
    str := fmt.Sprint("Hello, ", "World!")
    fmt.Println(str)
    str = fmt.Sprintln("Hello, World!")
    fmt.Print(str)
    str = fmt.Sprintf("Name: %s, Age: %d\n", name, age)
    fmt.Print(str)

    // 格式化占位符
    boolVal := true
    intVal := 42
    floatVal := 3.14159
    strVal := "Go"
    ptrVal := &intVal

    fmt.Printf("bool: %t\n", boolVal)
    fmt.Printf("int (dec): %d\n", intVal)
    fmt.Printf("int (bin): %b\n", intVal)
    fmt.Printf("int (hex): %x\n", intVal)
    fmt.Printf("float: %f\n", floatVal)
    fmt.Printf("float (exp): %e\n", floatVal)
    fmt.Printf("string: %s\n", strVal)
    fmt.Printf("pointer: %p\n", ptrVal)
    fmt.Printf("struct: %+v\n", struct{ Name string }{"Go"})
}
```

这个示例展示了如何使用`fmt`包进行各种格式化和输入输出操作，是Go语言中处理I/O的基础。