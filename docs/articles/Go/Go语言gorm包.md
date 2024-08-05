---
comments: true
---

GORM（Golang ORM）是一个强大的 Go 语言对象关系映射（ORM）库。它支持主流数据库，如 MySQL、PostgreSQL、SQLite 和 SQL Server 等。GORM 提供了丰富的特性，包括自动迁移、查询构建、预加载、事务处理等。以下是详细介绍 GORM 的使用方法及其各个功能模块。

### 1. 安装 GORM

首先，安装 GORM 及其数据库驱动程序（以 MySQL 为例）：

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

### 2. 连接数据库

创建一个 `main.go` 文件，并初始化数据库连接。

```go
package main

import (
    "log"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

var DB *gorm.DB

func initDB() {
    dsn := "username:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    var err error
    DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("failed to connect database: %v", err)
    }
}

func main() {
    initDB()
}
```

### 3. 定义模型

定义一个模型，并使用 GORM 标签进行配置。

```go
package main

import (
    "time"
    "gorm.io/gorm"
)

type User struct {
    ID        uint           `gorm:"primaryKey"`
    Name      string         `gorm:"size:100"`
    Email     string         `gorm:"uniqueIndex;size:100"`
    Age       int            `gorm:"default:18"`
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt gorm.DeletedAt `gorm:"index"`
}
```

### 4. 自动迁移

GORM 提供自动迁移功能，可以根据模型自动创建或更新数据库表。

```go
func initDB() {
    // Previous database connection code

    // 自动迁移
    DB.AutoMigrate(&User{})
}
```

### 5. CRUD 操作

#### 5.1 创建记录

```go
func createUser() {
    user := User{Name: "Alice", Email: "alice@example.com", Age: 25}
    result := DB.Create(&user)
    if result.Error != nil {
        log.Fatalf("failed to create user: %v", result.Error)
    }
    log.Printf("User ID: %d", user.ID)
}
```

#### 5.2 查询记录

```go
func getUserByID(id uint) {
    var user User
    result := DB.First(&user, id)
    if result.Error != nil {
        if result.Error == gorm.ErrRecordNotFound {
            log.Println("User not found")
        } else {
            log.Fatalf("failed to get user: %v", result.Error)
        }
    }
    log.Printf("User: %#v", user)
}
```

#### 5.3 更新记录

```go
func updateUser(id uint) {
    var user User
    result := DB.First(&user, id)
    if result.Error != nil {
        log.Fatalf("failed to get user: %v", result.Error)
    }

    user.Age = 30
    DB.Save(&user)
    log.Printf("Updated User: %#v", user)
}
```

#### 5.4 删除记录

```go
func deleteUser(id uint) {
    result := DB.Delete(&User{}, id)
    if result.Error != nil {
        log.Fatalf("failed to delete user: %v", result.Error)
    }
    log.Println("User deleted")
}
```

### 6. 高级查询

#### 6.1 条件查询

```go
func getUsersByName(name string) {
    var users []User
    DB.Where("name = ?", name).Find(&users)
    log.Printf("Users: %#v", users)
}
```

#### 6.2 原生 SQL 查询

```go
func getUserByEmail(email string) {
    var user User
    DB.Raw("SELECT * FROM users WHERE email = ?", email).Scan(&user)
    log.Printf("User: %#v", user)
}
```

#### 6.3 链式查询

```go
func getAdultUsers() {
    var users []User
    DB.Where("age >= ?", 18).Order("age desc").Limit(10).Find(&users)
    log.Printf("Users: %#v", users)
}
```

### 7. 关联关系

GORM 支持一对一、一对多、多对多和嵌套结构。

#### 7.1 一对多关系

定义 `User` 和 `Post` 模型：

```go
type User struct {
    ID    uint    `gorm:"primaryKey"`
    Name  string  `gorm:"size:100"`
    Posts []Post
}

type Post struct {
    ID     uint   `gorm:"primaryKey"`
    Title  string `gorm:"size:100"`
    UserID uint
}
```

自动迁移：

```go
func initDB() {
    // Previous database connection code

    DB.AutoMigrate(&User{}, &Post{})
}
```

创建关联记录：

```go
func createPost() {
    user := User{Name: "Alice"}
    post := Post{Title: "First Post"}
    user.Posts = append(user.Posts, post)
    DB.Create(&user)
}
```

查询关联记录：

```go
func getUserWithPosts(id uint) {
    var user User
    DB.Preload("Posts").First(&user, id)
    log.Printf("User: %#v", user)
}
```

#### 7.2 多对多关系

定义 `User` 和 `Role` 模型：

```go
type User struct {
    ID    uint    `gorm:"primaryKey"`
    Name  string  `gorm:"size:100"`
    Roles []Role  `gorm:"many2many:user_roles;"`
}

type Role struct {
    ID   uint   `gorm:"primaryKey"`
    Name string `gorm:"size:100"`
}
```

自动迁移：

```go
func initDB() {
    // Previous database connection code

    DB.AutoMigrate(&User{}, &Role{})
}
```

创建多对多记录：

```go
func createUserWithRoles() {
    role1 := Role{Name: "Admin"}
    role2 := Role{Name: "User"}
    user := User{Name: "Bob", Roles: []Role{role1, role2}}
    DB.Create(&user)
}
```

查询多对多记录：

```go
func getUserWithRoles(id uint) {
    var user User
    DB.Preload("Roles").First(&user, id)
    log.Printf("User: %#v", user)
}
```

### 8. 事务处理

使用事务可以保证一组操作要么全部成功，要么全部失败。

```go
func createUserWithTransaction() {
    err := DB.Transaction(func(tx *gorm.DB) error {
        user := User{Name: "Alice"}
        if err := tx.Create(&user).Error; err != nil {
            return err
        }

        post := Post{Title: "First Post", UserID: user.ID}
        if err := tx.Create(&post).Error; err != nil {
            return err
        }

        return nil
    })

    if err != nil {
        log.Fatalf("transaction failed: %v", err)
    }
}
```

### 9. 使用钩子函数

GORM 支持模型的钩子函数，在创建、更新、删除等操作前后自动调用。

```go
type User struct {
    ID        uint      `gorm:"primaryKey"`
    Name      string    `gorm:"size:100"`
    Email     string    `gorm:"uniqueIndex;size:100"`
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt gorm.DeletedAt `gorm:"index"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
    log.Println("Before creating user")
    return
}

func (u *User) AfterCreate(tx *gorm.DB) (err error) {
    log.Println("After creating user")
    return
}
```

### 10. 日志和调试

GORM 提供了详细的日志记录功能，可以帮助调试 SQL 查询。

```go
import (
    "gorm.io/gorm/logger"
)

DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
    Logger: logger.Default.LogMode(logger.Info),
})
```

通过以上内容，你可以全面了解和使用 GORM 来进行数据库操作。这些示例涵盖了从基础的 CRUD 操作到高级查询、关联关系、事务处理等各个方面。根据实际项目的需要，可以进一步扩展和优化这些功能。