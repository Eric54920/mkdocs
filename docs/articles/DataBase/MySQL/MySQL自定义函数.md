---
comments: true
---

在 MySQL 中，自定义函数（UDF, User-Defined Function）允许你创建可以在查询中调用的自定义代码块。自定义函数在需要重复使用特定逻辑时非常有用。以下是创建、使用和管理自定义函数的详细指南。

### 创建自定义函数

自定义函数的语法如下：

```sql
CREATE FUNCTION function_name(parameter1 type, parameter2 type, ...)
RETURNS return_type
BEGIN
    -- function body
    RETURN value;
END;
```

#### 示例：计算两个数的平方和

创建一个自定义函数 `square_sum`，用于计算两个数的平方和：

```sql
DELIMITER //

CREATE FUNCTION square_sum(a INT, b INT) RETURNS INT
BEGIN
    RETURN a * a + b * b;
END //

DELIMITER ;
```

### 使用自定义函数

创建自定义函数后，你可以像使用内置函数一样在查询中使用它。以下是使用自定义函数 `square_sum` 的示例：

```sql
SELECT square_sum(3, 4) AS result;
-- 结果: 25
```

### 更多示例

#### 示例 1：返回员工的全名

假设有一个员工表 `employees`，包含 `first_name` 和 `last_name` 列。我们可以创建一个函数来返回员工的全名：

```sql
DELIMITER //

CREATE FUNCTION get_full_name(first_name VARCHAR(255), last_name VARCHAR(255)) RETURNS VARCHAR(255)
BEGIN
    RETURN CONCAT(first_name, ' ', last_name);
END //

DELIMITER ;
```

使用该函数：

```sql
SELECT get_full_name(first_name, last_name) AS full_name FROM employees;
```

#### 示例 2：计算两个日期之间的工作日数

创建一个函数来计算两个日期之间的工作日数：

```sql
DELIMITER //

CREATE FUNCTION business_days(start_date DATE, end_date DATE) RETURNS INT
BEGIN
    DECLARE counter INT DEFAULT 0;
    DECLARE current_date DATE;

    SET current_date = start_date;

    WHILE current_date <= end_date DO
        IF DAYOFWEEK(current_date) NOT IN (1, 7) THEN
            SET counter = counter + 1;
        END IF;
        SET current_date = DATE_ADD(current_date, INTERVAL 1 DAY);
    END WHILE;

    RETURN counter;
END //

DELIMITER ;
```

使用该函数：

```sql
SELECT business_days('2024-06-01', '2024-06-12') AS workdays;
```

### 管理自定义函数

#### 查看已有的自定义函数

要查看数据库中已有的自定义函数，可以查询 `information_schema`：

```sql
SELECT ROUTINE_NAME, DATA_TYPE, DTD_IDENTIFIER
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_TYPE='FUNCTION' AND ROUTINE_SCHEMA='your_database_name';
```

#### 修改自定义函数

MySQL 不支持直接修改函数。要修改函数，你需要先删除它，然后重新创建。

#### 删除自定义函数

要删除自定义函数，使用 `DROP FUNCTION` 语句：

```sql
DROP FUNCTION IF EXISTS function_name;
```

示例：

```sql
DROP FUNCTION IF EXISTS square_sum;
```

### 注意事项

1. **权限**：创建或删除自定义函数需要适当的权限。确保你有 `CREATE ROUTINE` 和 `ALTER ROUTINE` 权限。
2. **错误处理**：自定义函数中不能使用 `DECLARE EXIT HANDLER` 进行错误处理。如果需要处理错误，考虑使用存储过程。
3. **性能**：自定义函数的性能可能不如内置函数。对于性能要求高的操作，尽量使用 MySQL 内置函数。

通过以上步骤，你可以在 MySQL 中创建和管理自定义函数，以实现特定的业务逻辑和数据处理需求。