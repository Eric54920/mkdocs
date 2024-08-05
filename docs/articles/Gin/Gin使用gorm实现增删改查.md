---
comments: true
---

在 Go 中使用 Gin 和 GORM 操作 MySQL 是一种常见的组合，适用于构建高效的 RESTful API。下面是一个详细的指南，介绍如何使用 Gin 和 GORM 进行 MySQL 操作，包括所有常见的操作。

### 1. 安装依赖

首先，确保你已经安装了 `gin` 和 `gorm` 及其 MySQL 驱动程序。

```bash
go get -u github.com/gin-gonic/gin
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

### 2. 连接到 MySQL 数据库

在你的项目中，创建一个文件 `main.go`，并设置 MySQL 连接。

```go
package main

import (
    "log"
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
)

var DB *gorm.DB

// 初始化数据库连接
func initDB() {
    dsn := "username:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    var err error
    DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        log.Fatalf("failed to connect database: %v", err)
    }

    // 自动迁移
    DB.AutoMigrate(&User{})
}

// 用户模型
type User struct {
    ID        uint      `gorm:"primaryKey"`
    Name      string    `gorm:"size:100"`
    Email     string    `gorm:"uniqueIndex;size:100"`
    CreatedAt time.Time
    UpdatedAt time.Time
}

func main() {
    r := gin.Default()
    initDB()

    r.GET("/users", getUsers)
    r.GET("/users/:id", getUser)
    r.POST("/users", createUser)
    r.PUT("/users/:id", updateUser)
    r.DELETE("/users/:id", deleteUser)

    r.Run(":8080")
}

```

### 3. CRUD 操作

#### 3.1 获取所有用户

```go
// 获取所有用户
func getUsers(c *gin.Context) {
    var users []User
    result := DB.Find(&users)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, users)
}
```

#### 3.2 获取单个用户

```go
// 获取单个用户
func getUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    result := DB.First(&user, id)
    if result.Error != nil {
        if result.Error == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        }
        return
    }
    c.JSON(http.StatusOK, user)
}
```

#### 3.3 创建用户

```go
// 创建用户
func createUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    result := DB.Create(&user)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, user)
}
```

#### 3.4 更新用户

```go
// 更新用户
func updateUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    if err := DB.First(&user, id).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        }
        return
    }

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := DB.Save(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, user)
}
```

#### 3.5 删除用户

```go
// 删除用户
func deleteUser(c *gin.Context) {
    id := c.Param("id")
    if err := DB.Delete(&User{}, id).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
}
```

### 4. 完整代码示例

将上述所有代码整合在一起，形成一个完整的示例项目：

```go
package main

import (
    "log"
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
)

var DB *gorm.DB

// 初始化数据库连接
func initDB() {
    dsn := "username:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    var err error
    DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        log.Fatalf("failed to connect database: %v", err)
    }

    // 自动迁移
    DB.AutoMigrate(&User{})
}

// 用户模型
type User struct {
    ID        uint      `gorm:"primaryKey"`
    Name      string    `gorm:"size:100"`
    Email     string    `gorm:"uniqueIndex;size:100"`
    CreatedAt time.Time
    UpdatedAt time.Time
}

func main() {
    r := gin.Default()
    initDB()

    r.GET("/users", getUsers)
    r.GET("/users/:id", getUser)
    r.POST("/users", createUser)
    r.PUT("/users/:id", updateUser)
    r.DELETE("/users/:id", deleteUser)

    r.Run(":8080")
}

// 获取所有用户
func getUsers(c *gin.Context) {
    var users []User
    result := DB.Find(&users)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, users)
}

// 获取单个用户
func getUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    result := DB.First(&user, id)
    if result.Error != nil {
        if result.Error == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        }
        return
    }
    c.JSON(http.StatusOK, user)
}

// 创建用户
func createUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    result := DB.Create(&user)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, user)
}

// 更新用户
func updateUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    if err := DB.First(&user, id).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        }
        return
    }

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := DB.Save(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, user)
}

// 删除用户
func deleteUser(c *gin.Context) {
    id := c.Param("id")
    if err := DB.Delete(&User{}, id).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
}
```

### 5. 测试 API

启动你的应用程序：

```bash
go run main.go
```

使用工具如 `curl` 或 Postman 来测试你的 API。例如，使用 `curl` 创建一个用户：

```bash
curl -X POST http://localhost:8080/users -d '{"Name":"Alice", "Email":"alice@example.com"}' -H "Content-Type:

 application/json"
```

这个指南展示了如何使用 Gin 和 GORM 进行基本的 CRUD 操作。你可以根据需要扩展和优化这个基础结构来适应更复杂的业务逻辑和需求。