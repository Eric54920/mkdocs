---
comments: true
---

# MySQL内置函数

MySQL 提供了丰富的内置函数，可以用来处理字符串、数值、日期和时间数据，执行聚合操作，以及进行其他各种操作。这些函数大致可以分为以下几类：

1. **字符串函数**
2. **数值函数**
3. **日期和时间函数**
4. **聚合函数**
5. **其他函数**

以下是每类函数的一些常用示例和说明。

## 1. 字符串函数

### `CONCAT`

连接多个字符串：

```sql
SELECT CONCAT('Hello', ' ', 'World');
-- 结果: 'Hello World'

```

### `SUBSTRING`

从字符串中提取子字符串：

```sql
SELECT SUBSTRING('Hello World', 1, 5);
-- 结果: 'Hello'

```

### `LENGTH`

返回字符串的长度：

```sql
SELECT LENGTH('Hello');
-- 结果: 5

```

### `UPPER` 和 `LOWER`

将字符串转换为大写或小写：

```sql
SELECT UPPER('hello');
-- 结果: 'HELLO'

SELECT LOWER('HELLO');
-- 结果: 'hello'

```

### `TRIM`

去除字符串两端的空格：

```sql
SELECT TRIM('  Hello World  ');
-- 结果: 'Hello World'

```

## 2. 数值函数

### `ABS`

返回数值的绝对值：

```sql
SELECT ABS(-5);
-- 结果: 5

```

### `CEIL` 和 `FLOOR`

返回大于等于或小于等于的最小整数：

```sql
SELECT CEIL(4.2);
-- 结果: 5

SELECT FLOOR(4.8);
-- 结果: 4

```

### `ROUND`

对数值进行四舍五入：

```sql
SELECT ROUND(4.567, 2);
-- 结果: 4.57

```

### `MOD`

返回除法运算的余数：

```sql
SELECT MOD(10, 3);
-- 结果: 1

```

### `POW` 或 `POWER`

返回数值的指定次幂：

```sql
SELECT POW(2, 3);
-- 结果: 8

```

## 3. 日期和时间函数

### `NOW`

返回当前日期和时间：

```sql
SELECT NOW();
-- 结果: '2024-06-11 10:15:30' (示例)

```

### `CURDATE` 和 `CURTIME`

分别返回当前日期和时间：

```sql
SELECT CURDATE();
-- 结果: '2024-06-11'

SELECT CURTIME();
-- 结果: '10:15:30' (示例)

```

### `DATE_ADD` 和 `DATE_SUB`

在日期上加减指定的时间间隔：

```sql
SELECT DATE_ADD('2024-06-11', INTERVAL 7 DAY);
-- 结果: '2024-06-18'

SELECT DATE_SUB('2024-06-11', INTERVAL 7 DAY);
-- 结果: '2024-06-04'

```

### `DATEDIFF`

返回两个日期之间的天数差：

```sql
SELECT DATEDIFF('2024-06-18', '2024-06-11');
-- 结果: 7

```

### `YEAR`、`MONTH` 和 `DAY`

分别提取日期的年、月和日：

```sql
SELECT YEAR('2024-06-11');
-- 结果: 2024

SELECT MONTH('2024-06-11');
-- 结果: 6

SELECT DAY('2024-06-11');
-- 结果: 11

```

## 4. 聚合函数

### `COUNT`

返回结果集中行的数量：

```sql
SELECT COUNT(*) FROM employees;

```

### `SUM`

返回数值列的总和：

```sql
SELECT SUM(salary) FROM employees;

```

### `AVG`

返回数值列的平均值：

```sql
SELECT AVG(salary) FROM employees;

```

### `MAX` 和 `MIN`

返回数值列的最大值和最小值：

```sql
SELECT MAX(salary) FROM employees;
SELECT MIN(salary) FROM employees;

```

## 5. 其他函数

### `IF`

根据条件返回不同的结果：

```sql
SELECT IF(salary > 5000, 'High', 'Low') FROM employees;

```

### `COALESCE`

返回第一个非空值：

```sql
SELECT COALESCE(NULL, NULL, 'Default');
-- 结果: 'Default'

```

### `CASE`

实现条件逻辑：

```sql
SELECT
  CASE
    WHEN salary > 5000 THEN 'High'
    WHEN salary > 3000 THEN 'Medium'
    ELSE 'Low'
  END AS salary_level
FROM employees;

```

### 示例综合应用

假设我们有一个 `employees` 表，结构如下：

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    salary DECIMAL(10, 2),
    hire_date DATE
);

```

**插入一些数据：**

```sql
INSERT INTO employees (name, salary, hire_date) VALUES
('Alice', 6000.00, '2020-01-15'),
('Bob', 4000.00, '2019-03-10'),
('Charlie', 3000.00, '2021-07-23');

```

**查询示例：**

```sql
-- 计算员工的总数
SELECT COUNT(*) AS total_employees FROM employees;

-- 计算工资的总和和平均值
SELECT SUM(salary) AS total_salary, AVG(salary) AS average_salary FROM employees;

-- 获取最高和最低工资
SELECT MAX(salary) AS max_salary, MIN(salary) AS min_salary FROM employees;

-- 显示每个员工的名字和工资等级
SELECT name,
  CASE
    WHEN salary > 5000 THEN 'High'
    WHEN salary > 3000 THEN 'Medium'
    ELSE 'Low'
  END AS salary_level
FROM employees;

-- 获取每个员工的姓名和工作年限
SELECT name, DATEDIFF(NOW(), hire_date) / 365 AS years_of_service FROM employees;

```

这些示例展示了如何使用 MySQL 的内置函数进行各种数据处理操作。根据具体需求选择适当的函数，可以大大简化 SQL 查询的编写，提高查询效率和可读性。