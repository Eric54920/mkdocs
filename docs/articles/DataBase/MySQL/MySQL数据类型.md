---
comments: true
---

在 MySQL 中，数据类型用于指定表列中可以存储的数据的类型。不同的数据类型具有不同的存储要求和特性。MySQL 支持多种数据类型，主要分为以下几类：数值类型、日期和时间类型、字符串类型以及JSON类型。以下是每种数据类型的详细说明和示例。

### 1. 数值类型

### 整数类型

- `TINYINT`：1 字节，范围 -128 到 127 或 0 到 255（无符号）
- `SMALLINT`：2 字节，范围 -32768 到 32767 或 0 到 65535（无符号）
- `MEDIUMINT`：3 字节，范围 -8388608 到 8388607 或 0 到 16777215（无符号）
- `INT` 或 `INTEGER`：4 字节，范围 -2147483648 到 2147483647 或 0 到 4294967295（无符号）
- `BIGINT`：8 字节，范围 -9223372036854775808 到 9223372036854775807 或 0 到 18446744073709551615（无符号）

### 示例

```sql
CREATE TABLE example_integers (
    id INT PRIMARY KEY,
    age TINYINT UNSIGNED,
    score MEDIUMINT,
    salary BIGINT
);
```

### 浮点数类型

- `FLOAT`：4 字节，单精度浮点数
- `DOUBLE`：8 字节，双精度浮点数
- `DECIMAL` 或 `NUMERIC`：用于存储精确的小数，定义时指定精度和标度，如 `DECIMAL(10, 2)` 表示总共10位数字，其中2位小数。

### 示例

```sql
CREATE TABLE example_floats (
    id INT PRIMARY KEY,
    price FLOAT,
    rating DOUBLE,
    balance DECIMAL(10, 2)
);
```

### 2. 日期和时间类型

- `DATE`：日期值，格式为 `YYYY-MM-DD`
- `TIME`：时间值，格式为 `HH:MM:SS`
- `DATETIME`：日期和时间，格式为 `YYYY-MM-DD HH:MM:SS`
- `TIMESTAMP`：自动更新的日期和时间戳，格式为 `YYYY-MM-DD HH:MM:SS`
- `YEAR`：年份值，格式为 `YYYY`

### 示例

```sql
CREATE TABLE example_datetime (
    id INT PRIMARY KEY,
    birthdate DATE,
    appointment TIME,
    created_at DATETIME,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    year_of_joining YEAR
);
```

### 3. 字符串类型

- `CHAR`：固定长度字符串，最多 255 个字符
- `VARCHAR`：可变长度字符串，最多 65535 个字符
- `TEXT`：长文本数据，最多 65535 个字符
- `MEDIUMTEXT`：中等长度文本数据，最多 16777215 个字符
- `LONGTEXT`：非常长的文本数据，最多 4294967295 个字符
- `BINARY`：固定长度二进制数据
- `VARBINARY`：可变长度二进制数据
- `BLOB`：二进制大对象，最多 65535 字节
- `MEDIUMBLOB`：中等长度二进制数据，最多 16777215 字节
- `LONGBLOB`：非常长的二进制数据，最多 4294967295 字节

### 示例

```sql
CREATE TABLE example_strings (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    password CHAR(32),
    description TEXT,
    profile_picture BLOB
);
```

### 4. JSON 类型

- `JSON`：用于存储 JSON 格式的数据

### 示例

```sql
CREATE TABLE example_json (
    id INT PRIMARY KEY,
    data JSON
);
```

### 5. 枚举和集合类型

- `ENUM`：枚举类型，存储预定义的字符串值中的一个
- `SET`：集合类型，存储预定义的字符串值的任意组合

### 示例

```sql
CREATE TABLE example_enum_set (
    id INT PRIMARY KEY,
    status ENUM('active', 'inactive', 'banned'),
    roles SET('admin', 'user', 'guest')
);
```

### 总结

选择合适的数据类型对于优化数据库性能和存储空间至关重要。不同的数据类型有各自的优点和局限，根据具体应用需求选择合适的数据类型，可以有效提高数据库的性能和数据存储效率。如果有更多问题或特定需求，欢迎继续提问。