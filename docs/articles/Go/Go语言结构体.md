---
comments: true
---

在Go语言中，结构体（struct）是一种复合类型，用于将多个不同类型的数据字段组合在一起，形成一个新的数据类型。结构体在Go语言中是非常重要和常用的数据结构，用于表示复杂的数据模型和实体。

### 1. 定义结构体

结构体通过 `type` 关键字和 `struct` 关键字来定义。结构体定义了一个类型，可以包含多个字段（field），每个字段可以是任意类型，包括基本类型、复合类型（如数组、切片、结构体等）或者其他自定义类型。

#### 1.1 定义一个简单的结构体

```go
package main

import "fmt"

// 定义一个结构体 Person
type Person struct {
    FirstName string
    LastName  string
    Age       int
}

func main() {
    // 创建一个 Person 类型的变量
    var p1 Person
    p1.FirstName = "Alice"
    p1.LastName = "Smith"
    p1.Age = 30

    // 访问结构体字段
    fmt.Println("First Name:", p1.FirstName)
    fmt.Println("Last Name:", p1.LastName)
    fmt.Println("Age:", p1.Age)
}
```

在上面的例子中，定义了一个名为 `Person` 的结构体，它有三个字段 `FirstName`、`LastName` 和 `Age`，分别表示人的姓、名和年龄。通过 `var p1 Person` 创建了一个 `Person` 类型的变量 `p1`，并分别为其字段赋值。通过点号 `.` 来访问结构体的字段。

### 2. 匿名结构体

在Go语言中，可以定义没有名字的结构体，即匿名结构体，用于临时存储数据或进行简单的数据封装。

#### 2.1 定义匿名结构体并初始化

```go
package main

import "fmt"

func main() {
    // 定义并初始化一个匿名结构体
    person := struct {
        FirstName string
        LastName  string
        Age       int
    }{
        FirstName: "Bob",
        LastName:  "Johnson",
        Age:       25,
    }

    fmt.Println("Person:", person)
}
```

在上面的例子中，定义了一个匿名结构体，并在结构体定义的同时初始化了结构体的字段。匿名结构体通常用于临时的数据封装或测试时的数据构造。

### 3. 结构体字段的访问和赋值

结构体的字段可以通过点号 `.` 来访问和赋值。可以使用点号 `.` 操作符来访问和修改结构体中的字段。

#### 3.1 访问和修改结构体字段

```go
package main

import "fmt"

// 定义一个结构体 Person
type Person struct {
    FirstName string
    LastName  string
    Age       int
}

func main() {
    // 创建一个 Person 类型的变量
    var p1 Person
    p1.FirstName = "Alice"
    p1.LastName = "Smith"
    p1.Age = 30

    // 访问结构体字段
    fmt.Println("First Name:", p1.FirstName)
    fmt.Println("Last Name:", p1.LastName)
    fmt.Println("Age:", p1.Age)

    // 修改结构体字段的值
    p1.Age = 31
    fmt.Println("Updated Age:", p1.Age)
}
```

### 4. 结构体方法

在Go语言中，可以为结构体定义方法（Methods）。方法是一种特殊类型的函数，它与结构体类型关联，并可以操作该类型的实例。

#### 4.1 为结构体定义方法

```go
package main

import "fmt"

// 定义一个结构体 Circle
type Circle struct {
    Radius float64
}

// 为 Circle 结构体定义一个方法 Area，用于计算圆的面积
func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

func main() {
    // 创建一个 Circle 类型的变量
    c1 := Circle{Radius: 5.0}

    // 调用 Circle 结构体的方法 Area
    fmt.Println("Area of circle:", c1.Area())
}
```

在上面的例子中，为 `Circle` 结构体定义了一个方法 `Area()`，用于计算圆的面积。方法的接收者（Receiver）为 `Circle` 结构体，即 `(c Circle)`，可以通过 `c.Radius` 访问结构体的字段。

### 5. 结构体嵌套

在Go语言中，结构体可以嵌套在其他结构体中，形成嵌套结构体。嵌套结构体允许我们创建更复杂的数据模型，其中一个结构体可以包含另一个结构体作为其字段。

#### 5.1 结构体嵌套

```go
package main

import "fmt"

// 定义一个 Address 结构体
type Address struct {
    Street     string
    City       string
    State      string
    PostalCode string
}

// 定义一个 Person 结构体，包含一个 Address 结构体作为其字段
type Person struct {
    FirstName string
    LastName  string
    Age       int
    Address   Address // 嵌套的结构体
}

func main() {
    // 创建一个 Person 类型的变量
    p := Person{
        FirstName: "Alice",
        LastName:  "Smith",
        Age:       30,
        Address: Address{
            Street:     "123 Main St",
            City:       "Anytown",
            State:      "CA",
            PostalCode: "12345",
        },
    }

    // 访问嵌套结构体的字段
    fmt.Println("First Name:", p.FirstName)
    fmt.Println("Last Name:", p.LastName)
    fmt.Println("Age:", p.Age)
    fmt.Println("Street:", p.Address.Street)
    fmt.Println("City:", p.Address.City)
    fmt.Println("State:", p.Address.State)
    fmt.Println("Postal Code:", p.Address.PostalCode)
}
```

在上面的例子中，`Person` 结构体包含一个 `Address` 结构体作为其字段。通过嵌套结构体，可以更清晰地表示人的详细信息及其地址信息。

### 6. 结构体标签（Struct Tags）

结构体可以附加一个或多个标签（Tags），标签是结构体字段的元信息，用于描述字段的特性或配置。标签通常在序列化和反序列化、数据库映射等场景中使用。

#### 6.1 结构体标签

```go
package main

import (
    "fmt"
    "reflect"
)

// 定义一个 Person 结构体，带有标签
type Person struct {
    FirstName string `json:"first_name"`
    LastName  string `json:"last_name"`
    Age       int    `json:"age"`
}

func main() {
    // 创建一个 Person 类型的变量
    p := Person{
        FirstName: "Alice",
        LastName:  "Smith",
        Age:       30,
    }

    // 使用反射获取结构体标签
    t := reflect.TypeOf(p)
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        fmt.Printf("Field: %s, Tag: %s\n", field.Name, field.Tag.Get("json"))
    }
}
```

在上面的例子中，`Person` 结构体的字段 `FirstName`、`LastName` 和 `Age` 分别带有 `json` 标签，用于指定字段在JSON序列化时的名称。通过反射可以获取结构体的标签信息。

### 7. 总结

- 结构体是一种复合类型，用于将多个不同类型的数据字段组合在一起。
- 可以通过 `type` 和 `struct` 关键字定义结构体。
- 结构体可以包含任意类型的字段，包括基本类型、复合类型或其他自定义类型。
- 结构体字段可以通过点号 `.` 进行访问和赋值。
- 可以为结构体定义方法，方法与结构体类型关联并操作其实例。
- 结构体可以嵌套在其他结构体中，形成嵌套结构体。
- 结构体标签（Struct Tags）是结构体字段的元信息。