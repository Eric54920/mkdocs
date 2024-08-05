---
comments: true
---

`PyMySQL` 是一个纯 Python 实现的 MySQL 客户端库，用于连接和操作 MySQL 数据库。它的 API 设计与 MySQL 官方的 `MySQLdb` 库类似，可以方便地执行 SQL 查询和管理数据库连接。下面将详细介绍 `PyMySQL` 包，包括所有常用方法。

### 1. 安装

要使用 `PyMySQL`，首先需要安装它。可以使用 pip 进行安装：
```bash
pip install pymysql
```

### 2. 连接数据库

#### 2.1 创建连接

要连接到 MySQL 数据库，首先需要创建一个连接对象：

```python
import pymysql

connection = pymysql.connect(
    host='localhost',
    user='yourusername',
    password='yourpassword',
    database='yourdatabase',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor  # 可选，返回字典格式的结果
)
```

### 3. 执行 SQL 语句

#### 3.1 创建游标

通过连接对象创建游标对象：
```python
cursor = connection.cursor()
```

#### 3.2 执行查询

使用游标对象执行 SQL 查询：

```python
sql = "SELECT * FROM users WHERE age > %s"
cursor.execute(sql, (25,))
result = cursor.fetchall()  # 获取所有结果
for row in result:
    print(row)
```

#### 3.3 插入数据

```python
sql = "INSERT INTO users (name, age, email) VALUES (%s, %s, %s)"
cursor.execute(sql, ('John Doe', 28, 'john.doe@example.com'))
connection.commit()  # 提交事务
```

#### 3.4 更新数据

```python
sql = "UPDATE users SET age = %s WHERE name = %s"
cursor.execute(sql, (30, 'John Doe'))
connection.commit()
```

#### 3.5 删除数据

```python
sql = "DELETE FROM users WHERE name = %s"
cursor.execute(sql, ('John Doe',))
connection.commit()
```

### 4. 处理事务

#### 4.1 开始事务

事务默认是开启的，每次操作后需要手动提交或回滚：

```python
connection.begin()
```

#### 4.2 提交事务

```python
connection.commit()
```

#### 4.3 回滚事务

```python
connection.rollback()
```

### 5. 关闭连接和游标

执行完数据库操作后，应关闭游标和连接：

```python
cursor.close()
connection.close()
```

### 6. 常用方法总结

#### 6.1 连接对象

- `connect()`: 创建并返回连接对象。
- `cursor()`: 创建并返回游标对象。
- `commit()`: 提交当前事务。
- `rollback()`: 回滚当前事务。
- `close()`: 关闭连接。
- `begin()`: 开始事务。

#### 6.2 游标对象

- `execute(query, args=None)`: 执行单条 SQL 语句。`query` 是 SQL 语句，`args` 是参数元组或字典。
- `executemany(query, args)`: 执行多条 SQL 语句。`args` 是包含参数的序列。
- `fetchone()`: 获取结果集的下一行。
- `fetchall()`: 获取结果集中的所有行。
- `fetchmany(size)`: 获取结果集中的 `size` 行。
- `close()`: 关闭游标。
- `callproc(procname, args=())`: 调用存储过程。

### 7. 示例

以下是一个完整的示例，展示如何使用 `PyMySQL` 执行各种操作：

```python
import pymysql

# 创建连接
connection = pymysql.connect(
    host='localhost',
    user='yourusername',
    password='yourpassword',
    database='yourdatabase',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

try:
    with connection.cursor() as cursor:
        # 创建表
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            age INT NOT NULL,
            email VARCHAR(255)
        )
        """)
        connection.commit()

        # 插入数据
        cursor.execute("INSERT INTO users (name, age, email) VALUES (%s, %s, %s)",
                       ('Alice', 30, 'alice@example.com'))
        cursor.execute("INSERT INTO users (name, age, email) VALUES (%s, %s, %s)",
                       ('Bob', 25, 'bob@example.com'))
        connection.commit()

        # 查询数据
        cursor.execute("SELECT * FROM users WHERE age > %s", (20,))
        result = cursor.fetchall()
        for row in result:
            print(row)

        # 更新数据
        cursor.execute("UPDATE users SET age = %s WHERE name = %s", (35, 'Alice'))
        connection.commit()

        # 删除数据
        cursor.execute("DELETE FROM users WHERE name = %s", ('Bob',))
        connection.commit()

finally:
    connection.close()
```

### 8. 总结

`PyMySQL` 是一个功能强大且易于使用的 MySQL 客户端库，提供了丰富的方法来执行 SQL 操作和管理数据库连接。通过上述示例和方法介绍，你可以快速上手并使用 `PyMySQL` 进行各种数据库操作。