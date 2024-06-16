在 MySQL 中，流程控制是指通过使用存储过程、函数或触发器等功能来实现逻辑控制和处理。MySQL 支持多种流程控制语句，包括条件语句、循环语句、标签和控制转移语句等。以下是一些常用的 MySQL 流程控制语句及其用法示例：

### 1. 条件语句

### IF 语句

```sql
IF condition THEN
    statements;
ELSE
    statements;
END IF;

```

示例：

```sql
IF amount > 1000 THEN
    SET discount = 0.1 * amount;
ELSE
    SET discount = 0;
END IF;

```

### CASE 语句

```sql
CASE expression
    WHEN value1 THEN
        statements;
    WHEN value2 THEN
        statements;
    ...
    ELSE
        statements;
END CASE;

```

示例：

```sql
CASE
    WHEN score >= 90 THEN SET grade = 'A';
    WHEN score >= 80 THEN SET grade = 'B';
    WHEN score >= 70 THEN SET grade = 'C';
    ELSE SET grade = 'D';
END CASE;

```

### 2. 循环语句

### WHILE 循环

```sql
WHILE condition DO
    statements;
END WHILE;

```

示例：

```sql
SET counter = 0;
WHILE counter < 10 DO
    SET counter = counter + 1;
END WHILE;

```

### REPEAT...UNTIL 循环

```sql
REPEAT
    statements;
UNTIL condition;

```

示例：

```sql
SET counter = 0;
REPEAT
    SET counter = counter + 1;
UNTIL counter >= 10;

```

### LOOP 循环

```sql
label: LOOP
    statements;
END LOOP label;

```

示例：

```sql
SET counter = 0;
my_loop: LOOP
    SET counter = counter + 1;
    IF counter >= 10 THEN
        LEAVE my_loop;
    END IF;
END LOOP my_loop;

```

### 3. 控制转移语句

### LEAVE

用于从循环中提前退出。

```sql
LEAVE label;

```

### ITERATE

用于从循环的当前迭代中跳过剩余的代码并开始下一次迭代。

```sql
ITERATE label;

```

### GOTO

MySQL 不支持 GOTO 语句。

### 示例综合应用

假设我们有一个存储过程，用于计算斐波那契数列的前 n 项并将结果插入到一个表中：

```sql
DELIMITER //

CREATE PROCEDURE CalculateFibonacci(n INT)
BEGIN
    DECLARE a INT DEFAULT 0;
    DECLARE b INT DEFAULT 1;
    DECLARE i INT DEFAULT 0;
    DECLARE fib INT;

    TRUNCATE TABLE fibonacci_result;

    my_loop: LOOP
        IF i >= n THEN
            LEAVE my_loop;
        END IF;

        IF i <= 1 THEN
            SET fib = i;
        ELSE
            SET fib = a + b;
            SET a = b;
            SET b = fib;
        END IF;

        INSERT INTO fibonacci_result (fibonacci_number) VALUES (fib);

        SET i = i + 1;
    END LOOP my_loop;
END //

DELIMITER ;

```

在这个例子中，我们使用了 WHILE 循环来计算斐波那契数列，并使用 IF 条件语句来处理边界条件。通过这个存储过程，可以方便地计算和插入斐波那契数列的前 n 项。

### 总结

MySQL 的流程控制语句提供了灵活的逻辑控制和处理功能，可以在存储过程、函数或触发器中使用。合理地使用流程控制语句可以简化代码逻辑、提高程序的可读性和可维护性。