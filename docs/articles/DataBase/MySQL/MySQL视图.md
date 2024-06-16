MySQL 视图是一个虚拟的表，实际上并不存储任何数据，而是根据存储在数据库中的查询结果动态生成的。视图可以简化复杂的查询、隐藏表的结构、提供安全性和简化应用程序代码。以下是 MySQL 视图的基本概念和用法：

### 创建视图

创建视图使用 `CREATE VIEW` 语句。基本语法如下：

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;

```

示例：

```sql
CREATE VIEW customer_list AS
SELECT customer_id, CONCAT(first_name, ' ', last_name) AS full_name, email
FROM customers
WHERE status = 'active';

```

### 查看视图

可以使用 `SHOW CREATE VIEW` 语句查看视图的定义：

```sql
SHOW CREATE VIEW view_name;

```

### 使用视图

创建视图后，就可以像使用表一样查询视图：

```sql
SELECT * FROM view_name;

```

### 更新视图

可以使用 `CREATE OR REPLACE VIEW` 语句来更新视图的定义：

```sql
CREATE OR REPLACE VIEW view_name AS
SELECT new_columns
FROM new_table
WHERE new_condition;

```

### 删除视图

使用 `DROP VIEW` 语句删除视图：

```sql
DROP VIEW view_name;

```

### 视图示例

假设有一个名为 `employees` 的表，包含员工的信息，我们可以创建一个视图来显示活跃员工的列表：

```sql
CREATE VIEW active_employees AS
SELECT employee_id, CONCAT(first_name, ' ', last_name) AS full_name, department
FROM employees
WHERE status = 'active';

```

然后，可以像查询表一样使用这个视图：

```sql
SELECT * FROM active_employees;

```

### 总结

MySQL 视图是虚拟的表，可以简化复杂的查询、隐藏表的结构并提供安全性。通过创建视图，可以将复杂的查询逻辑封装在视图中，提高查询的可读性和可维护性。