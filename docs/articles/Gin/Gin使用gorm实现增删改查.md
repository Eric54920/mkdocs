---
comments: true
---

`GORM` 是 Go 语言中功能强大且灵活的对象关系映射（ORM）库，它支持多种数据库（如 MySQL、PostgreSQL、SQLite、SQL Server），并提供了丰富的数据库操作函数。在这篇详细介绍中，我们将讨论 GORM 的核心功能及常用的操作函数，包括模型定义、CRUD（增删改查）操作、关联关系、事务、异常处理、以及高级查询和钩子函数等。每个部分将会附上具体的示例代码和异常处理方式。

### 1. 安装和初始化

#### 1.1 安装 GORM 和数据库驱动

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

#### 1.2 初始化数据库连接

以 MySQL 为例：

```go
package main

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
    "log"
)

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("failed to connect database: %v", err)
    }

    // 检查连接池
    sqlDB, err := db.DB()
    if err != nil {
        log.Fatalf("failed to get db instance: %v", err)
    }
    defer sqlDB.Close()
}
```

在这里，我们创建了数据库连接，并对错误进行了处理。

### 2. 模型定义

GORM 模型是通过结构体与数据库表映射的。模型中的字段通常映射到数据库中的列。GORM 会根据结构体自动创建或更新数据库表。

```go
package main

import (
    "time"
)

type User struct {
    ID        uint      `gorm:"primaryKey"` // 主键
    Name      string    `gorm:"size:100"`   // 字符长度为100
    Email     string    `gorm:"unique"`     // 唯一字段
    Age       int       `gorm:"default:18"` // 默认值
    CreatedAt time.Time
    UpdatedAt time.Time
}
```

#### 2.1 常用标签

- `primaryKey`: 定义主键字段。
- `unique`: 唯一约束。
- `size`: 限制字符串字段的长度。
- `not null`: 字段不能为 `NULL`。
- `default`: 定义字段的默认值。

GORM 会根据这些标签自动生成 SQL 表结构，并确保字段的属性一致。

### 3. 基础 CRUD 操作

#### 3.1 创建记录

**基本创建**：

```go
user := User{Name: "Alice", Email: "alice@example.com"}
result := db.Create(&user)

if result.Error != nil {
    log.Fatalf("failed to create user: %v", result.Error)
}

fmt.Printf("New User ID: %d\n", user.ID)
```

**批量创建**：

```go
users := []User{
    {Name: "Bob", Email: "bob@example.com"},
    {Name: "Charlie", Email: "charlie@example.com"},
}
result := db.Create(&users)
if result.Error != nil {
    log.Fatalf("failed to create users: %v", result.Error)
}

fmt.Printf("Created %d users\n", result.RowsAffected)
```

#### 3.2 查询记录

**查询单条记录**：

```go
var user User
result := db.First(&user, 1) // 根据主键查询

if result.Error != nil {
    if result.Error == gorm.ErrRecordNotFound {
        log.Printf("User not found")
    } else {
        log.Fatalf("failed to query user: %v", result.Error)
    }
}

fmt.Printf("User found: %s\n", user.Name)
```

**条件查询**：

```go
var user User
result := db.First(&user, "email = ?", "alice@example.com")
if result.Error != nil {
    log.Fatalf("failed to query user: %v", result.Error)
}
fmt.Printf("User found: %s\n", user.Name)
```

**查询多条记录**：

```go
var users []User
result := db.Where("age > ?", 18).Find(&users)
if result.Error != nil {
    log.Fatalf("failed to query users: %v", result.Error)
}
fmt.Printf("Found %d users\n", result.RowsAffected)
```

#### 3.3 更新记录

**更新单个字段**：

```go
var user User
db.First(&user, 1)

user.Name = "UpdatedName"
result := db.Save(&user) // 使用 Save 更新整个对象
if result.Error != nil {
    log.Fatalf("failed to update user: %v", result.Error)
}

fmt.Println("User updated")
```

**更新特定字段**：

```go
result := db.Model(&user).Update("name", "UpdatedName")
if result.Error != nil {
    log.Fatalf("failed to update name: %v", result.Error)
}
```

**批量更新**：

```go
result := db.Model(&User{}).Where("age < ?", 18).Updates(map[string]interface{}{"age": 18})
if result.Error != nil {
    log.Fatalf("failed to update users: %v", result.Error)
}
```

#### 3.4 删除记录

**删除单条记录**：

```go
var user User
db.First(&user, 1)

result := db.Delete(&user)
if result.Error != nil {
    log.Fatalf("failed to delete user: %v", result.Error)
}
```

**批量删除**：

```go
result := db.Where("age < ?", 18).Delete(&User{})
if result.Error != nil {
    log.Fatalf("failed to delete users: %v", result.Error)
}
```

### 4. 高级查询

#### 4.1 排序

```go
var users []User
db.Order("age desc").Find(&users)
```

#### 4.2 限制条数和偏移量

```go
var users []User
db.Limit(10).Offset(5).Find(&users) // 从第 6 条开始，查询 10 条记录
```

#### 4.3 聚合函数

```go
var count int64
db.Model(&User{}).Where("age > ?", 18).Count(&count)
fmt.Printf("Number of users older than 18: %d\n", count)
```

### 5. 关联关系

#### 5.1 一对多关系

```go
type User struct {
    ID    uint
    Name  string
    Posts []Post `gorm:"foreignKey:UserID"`
}

type Post struct {
    ID     uint
    Title  string
    UserID uint
}

var user User
db.Preload("Posts").First(&user)
```

#### 5.2 多对多关系

```go
type User struct {
    ID      uint
    Name    string
    Friends []*User `gorm:"many2many:user_friends"`
}
```

#### 5.3 创建关联记录

```go
user := User{
    Name: "Alice",
    Posts: []Post{
        {Title: "First Post"},
        {Title: "Second Post"},
    },
}
db.Create(&user)
```

### 6. 事务

GORM 支持事务管理，用来确保多个操作在同一事务中执行。

```go
func CreateUserWithTransaction(db *gorm.DB) error {
    return db.Transaction(func(tx *gorm.DB) error {
        if err := tx.Create(&User{Name: "Tom"}).Error; err != nil {
            return err // 事务会自动回滚
        }

        if err := tx.Create(&Post{Title: "Hello"}).Error; err != nil {
            return err // 事务会自动回滚
        }

        return nil // 提交事务
    })
}
```

如果函数返回 `nil`，事务将会提交；否则，事务会自动回滚。

### 7. 钩子函数

GORM 支持钩子函数，可以在模型的生命周期中插入逻辑操作。

#### 7.1 常见的钩子函数

- `BeforeCreate`
- `AfterCreate`
- `BeforeUpdate`
- `AfterUpdate`
- `BeforeDelete`
- `AfterDelete`

**示例**：

```go
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
    if u.Name == "" {
        return errors.New("name cannot be empty")
    }
    return nil
}
```

在 `BeforeCreate` 钩子中，检查 `Name` 字段是否为空，如果为空则返回错误，阻止用户创建。

### 8. 软删除

GORM 支持软删除，通过在模型中添加 `gorm.DeletedAt` 字段实现。

```go
type User struct {
    ID        uint
    Name      string
    DeletedAt gorm.DeletedAt `gorm:"index"`
}
```

调用 `db.Delete` 时，记录不会真正删除，而是更新 `DeletedAt` 字段。查询时默认会忽略这些软删除的记录。可以通过 `Unscoped` 查询被软删除的记录：

```go
var users []

User
db.Unscoped().Where("name = ?", "Tom").Find(&users) // 包括软删除的记录
```

### 9. 总结

GORM 是一个功能丰富的 ORM 框架，提供了包括模型定义、CRUD、关联关系、事务管理、钩子函数、软删除等功能。通过这些操作函数，可以高效地与数据库交互并处理数据。常见的操作如：

1. **创建** (`Create`)
2. **查询** (`First`, `Find`, `Where`)
3. **更新** (`Save`, `Update`)
4. **删除** (`Delete`)
5. **关联关系** (`Preload`)
6. **事务管理** (`Transaction`)
7. **钩子函数**（`BeforeCreate` 等）

在 GORM 中，异常处理至关重要。每个数据库操作函数返回一个 `*gorm.DB` 类型的结果对象，可以通过 `Error` 属性检查操作是否成功。