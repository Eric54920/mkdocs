在 MySQL 中，可以使用正则表达式进行字符串匹配。MySQL 提供了 `REGEXP` 运算符来实现这一功能。在 MySQL 8.0 及以上版本中，还可以使用 `RLIKE` 运算符，它是 `REGEXP` 的同义词。正则表达式用于匹配复杂的字符串模式。

### 使用 `REGEXP` 运算符

#### 基本用法

假设我们有一个表 `contacts`，结构如下：

```sql
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15)
);

INSERT INTO contacts (name, phone) VALUES
('John Doe', '123-456-7890'),
('Jane Smith', '987-654-3210'),
('Alice Johnson', '(123) 456-7890'),
('Bob Brown', '123.456.7890');
```

我们可以使用正则表达式来查找特定模式的电话号码。

#### 匹配简单模式

例如，查找包含连字符的电话号码：

```sql
SELECT * FROM contacts WHERE phone REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';
```

结果：

```
+----+-------------+-------------+
| id | name        | phone       |
+----+-------------+-------------+
|  1 | John Doe    | 123-456-7890|
|  2 | Jane Smith  | 987-654-3210|
+----+-------------+-------------+
```

#### 匹配多种格式

我们可以查找多种格式的电话号码，例如带连字符、点或括号的号码：

```sql
SELECT * FROM contacts WHERE phone REGEXP '^(\([0-9]{3}\)[ ]?|[0-9]{3}[-.])[0-9]{3}[-.][0-9]{4}$';
```

结果：

```
+----+--------------+--------------+
| id | name         | phone        |
+----+--------------+--------------+
|  1 | John Doe     | 123-456-7890 |
|  2 | Jane Smith   | 987-654-3210 |
|  3 | Alice Johnson| (123) 456-7890|
|  4 | Bob Brown    | 123.456.7890 |
+----+--------------+--------------+
```

### 使用 `REGEXP_REPLACE` 函数

`REGEXP_REPLACE` 函数可以用正则表达式替换字符串。假设我们要将所有电话号码中的连字符、点和空格去掉，统一格式化为纯数字：

```sql
SELECT name, phone, REGEXP_REPLACE(phone, '[^0-9]', '') AS formatted_phone FROM contacts;
```

结果：

```
+--------------+--------------+----------------+
| name         | phone        | formatted_phone|
+--------------+--------------+----------------+
| John Doe     | 123-456-7890 | 1234567890     |
| Jane Smith   | 987-654-3210 | 9876543210     |
| Alice Johnson| (123) 456-7890| 1234567890     |
| Bob Brown    | 123.456.7890 | 1234567890     |
+--------------+--------------+----------------+
```

### 使用 `REGEXP_LIKE` 函数

在 MySQL 8.0 及以上版本中，可以使用 `REGEXP_LIKE` 函数来进行正则匹配，这与 `REGEXP` 运算符功能类似，但更灵活。

例如，查找包含 “Doe” 的名字：

```sql
SELECT * FROM contacts WHERE REGEXP_LIKE(name, 'Doe');
```

结果：

```
+----+----------+-------------+
| id | name     | phone       |
+----+----------+-------------+
|  1 | John Doe | 123-456-7890|
+----+----------+-------------+
```

### 总结

在 MySQL 中，可以使用 `REGEXP` 运算符和相关的正则表达式函数（如 `REGEXP_REPLACE` 和 `REGEXP_LIKE`）来匹配和处理复杂的字符串模式。正则表达式是强大的工具，适用于需要复杂模式匹配的查询。了解如何在 SQL 查询中应用正则表达式，可以帮助你更有效地处理和筛选数据。