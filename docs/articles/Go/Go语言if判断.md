在Go语言中，判断语句主要有两种形式：`if`语句和`switch`语句。这些语句允许根据条件执行不同的代码块。

### 1. if语句

`if`语句用于基于条件执行单个代码块。语法如下：

```go
if condition {
    // 如果条件为真执行的代码块
} else {
    // 如果条件为假执行的代码块（可选）
}
```

其中：

- `condition` 是一个布尔表达式，如果为`true`，则执行`if`后的代码块；否则，如果有`else`，则执行`else`后的代码块。

示例：

```go
package main

import "fmt"

func main() {
    num := 10

    if num > 0 {
        fmt.Println("Number is positive")
    } else if num == 0 {
        fmt.Println("Number is zero")
    } else {
        fmt.Println("Number is negative")
    }
}
```

### 2. switch语句

`switch`语句用于根据表达式的值选择执行多个代码块中的一个。语法如下：

```go
switch expression {
case value1:
    // 当 expression == value1 时执行的代码块
case value2:
    // 当 expression == value2 时执行的代码块
...
default:
    // 当所有 case 都不满足时执行的代码块（可选）
}
```

在Go语言中，每个`case`都会自动包含`break`语句，因此不需要显式使用`break`。如果希望继续执行下一个`case`，可以使用`fallthrough`关键字。

示例：

```go
package main

import "fmt"

func main() {
    num := 2

    switch num {
    case 1:
        fmt.Println("One")
    case 2:
        fmt.Println("Two")
    case 3:
        fmt.Println("Three")
    default:
        fmt.Println("Other")
    }
}
```

### 注意事项

- Go语言中的`if`和`switch`语句可以包含初始化语句，初始化语句作用域仅限于当前的`if`或`switch`语句块。
  
示例：

```go
package main

import "fmt"

func main() {
    if num := 10; num > 0 {
        fmt.Println("Number is positive")
    } else {
        fmt.Println("Number is non-positive")
    }
}
```

- `if`和`switch`语句中的条件不要求用括号包裹，但`switch`语句的表达式必须是常量或者与表达式类型相同的类型的值。

- `switch`语句可以没有表达式，相当于`switch true`，然后根据条件判断执行不同的代码块。