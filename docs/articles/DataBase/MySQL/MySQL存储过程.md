# MySQL存储过程

MySQL 存储过程是一组预编译的 SQL 语句，可以保存和重复使用。存储过程能够接受参数，执行复杂的操作，并返回结果。使用存储过程可以提高代码的复用性、简化数据库管理任务以及提升性能。以下是 MySQL 存储过程的详细说明和示例：

### 创建存储过程

创建存储过程使用 `CREATE PROCEDURE` 语句。以下是创建一个简单存储过程的基本语法：

```sql
CREATE PROCEDURE procedure_name ([parameter_list])
BEGIN
    -- SQL 语句
END;

```

### 示例 1: 无参数存储过程

创建一个不接受任何参数的存储过程，简单地返回表中的所有记录：

```sql
DELIMITER //

CREATE PROCEDURE GetAllEmployees()
BEGIN
    SELECT * FROM employees;
END //

DELIMITER ;

```

调用存储过程：

```sql
CALL GetAllEmployees();

```

### 示例 2: 带输入参数的存储过程

创建一个接受输入参数并根据参数返回结果的存储过程：

```sql
DELIMITER //

CREATE PROCEDURE GetEmployeeById(IN emp_id INT)
BEGIN
    SELECT * FROM employees WHERE id = emp_id;
END //

DELIMITER ;

```

调用存储过程：

```sql
CALL GetEmployeeById(1);

```

### 示例 3: 带输出参数的存储过程

创建一个接受输入参数并返回输出参数的存储过程：

```sql
DELIMITER //

CREATE PROCEDURE GetEmployeeSalary(IN emp_id INT, OUT emp_salary DECIMAL(10, 2))
BEGIN
    SELECT salary INTO emp_salary FROM employees WHERE id = emp_id;
END //

DELIMITER ;

```

调用存储过程并获取输出参数的值：

```sql
CALL GetEmployeeSalary(1, @salary);
SELECT @salary;

```

### 示例 4: 带输入和输出参数的存储过程

创建一个带有输入和输出参数的存储过程，可以根据输入参数进行计算并返回结果：

```sql
DELIMITER //

CREATE PROCEDURE CalculateBonus(IN emp_id INT, IN bonus_rate DECIMAL(5, 2), OUT bonus_amount DECIMAL(10, 2))
BEGIN
    SELECT salary * bonus_rate INTO bonus_amount FROM employees WHERE id = emp_id;
END //

DELIMITER ;

```

调用存储过程并获取输出参数的值：

```sql
CALL CalculateBonus(1, 0.10, @bonus);
SELECT @bonus;

```

### 修改存储过程

要修改现有的存储过程，需要先删除然后重新创建，因为 MySQL 不支持直接修改存储过程。

```sql
DROP PROCEDURE IF EXISTS procedure_name;
CREATE PROCEDURE procedure_name ...

```

### 删除存储过程

使用 `DROP PROCEDURE` 语句删除存储过程：

```sql
DROP PROCEDURE IF EXISTS GetAllEmployees;

```

### 综合示例

假设我们有一个 `employees` 表，结构如下：

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    salary DECIMAL(10, 2),
    hire_date DATE
);

```

我们可以创建一个存储过程来管理员工数据，如添加新员工、更新员工信息以及删除员工记录。

**创建添加新员工的存储过程：**

```sql
DELIMITER //

CREATE PROCEDURE AddEmployee(IN emp_name VARCHAR(100), IN emp_salary DECIMAL(10, 2), IN emp_hire_date DATE)
BEGIN
    INSERT INTO employees (name, salary, hire_date) VALUES (emp_name, emp_salary, emp_hire_date);
END //

DELIMITER ;

```

调用存储过程：

```sql
CALL AddEmployee('John Doe', 5000.00, '2023-06-01');

```

**创建更新员工信息的存储过程：**

```sql
DELIMITER //

CREATE PROCEDURE UpdateEmployee(IN emp_id INT, IN emp_name VARCHAR(100), IN emp_salary DECIMAL(10, 2))
BEGIN
    UPDATE employees SET name = emp_name, salary = emp_salary WHERE id = emp_id;
END //

DELIMITER ;

```

调用存储过程：

```sql
CALL UpdateEmployee(1, 'Jane Doe', 5500.00);

```

**创建删除员工记录的存储过程：**

```sql
DELIMITER //

CREATE PROCEDURE DeleteEmployee(IN emp_id INT)
BEGIN
    DELETE FROM employees WHERE id = emp_id;
END //

DELIMITER ;

```

调用存储过程：

```sql
CALL DeleteEmployee(1);

```

### 存储过程中的控制结构

在存储过程中，可以使用控制结构（如条件判断和循环）来执行更复杂的操作。

**使用 IF 语句：**

```sql
DELIMITER //

CREATE PROCEDURE CheckEmployeeSalary(IN emp_id INT, OUT result VARCHAR(50))
BEGIN
    DECLARE emp_salary DECIMAL(10, 2);

    SELECT salary INTO emp_salary FROM employees WHERE id = emp_id;

    IF emp_salary > 5000 THEN
        SET result = 'High Salary';
    ELSE
        SET result = 'Low Salary';
    END IF;
END //

DELIMITER ;

```

调用存储过程并获取输出参数的值：

```sql
CALL CheckEmployeeSalary(1, @result);
SELECT @result;

```

**使用 WHILE 循环：**

```sql
DELIMITER //

CREATE PROCEDURE IncreaseSalaries(IN percentage DECIMAL(5, 2))
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE emp_id INT;
    DECLARE emp_salary DECIMAL(10, 2);

    DECLARE cur CURSOR FOR SELECT id, salary FROM employees;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO emp_id, emp_salary;
        IF done THEN
            LEAVE read_loop;
        END IF;

        UPDATE employees SET salary = salary * (1 + percentage / 100) WHERE id = emp_id;
    END LOOP;

    CLOSE cur;
END //

DELIMITER ;

```

调用存储过程：

```sql
CALL IncreaseSalaries(10);  -- 所有员工加薪 10%

```

### 总结

MySQL 存储过程为处理复杂的业务逻辑提供了强大的工具。通过使用存储过程，可以将常用的 SQL 逻辑封装起来，提高代码的重用性和可维护性。希望以上示例能帮助你理解如何创建和使用存储过程。如果有更多问题或特定需求，欢迎继续提问。