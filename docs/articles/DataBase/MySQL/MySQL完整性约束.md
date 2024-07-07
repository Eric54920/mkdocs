---
comments: true
---

MySQL 提供了一些完整性约束来确保数据库中的数据一致性和准确性。完整性约束包括主键约束、外键约束、唯一约束、非空约束和检查约束。以下是每种约束的详细说明和示例：

### 1. 主键约束 (Primary Key Constraint)

主键约束用于唯一标识表中的每一行。主键列不允许空值，并且每个值必须唯一。

### 示例

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

```

在这个例子中，`id` 列是主键，每个 `id` 必须唯一且不为空。

### 2. 外键约束 (Foreign Key Constraint)

外键约束用于维护表之间的参照完整性。外键是一个或多个列的组合，其值必须匹配另一个表的主键或唯一键。

### 示例

假设我们有一个 `departments` 表和一个 `employees` 表：

```sql
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

```

在这个例子中，`department_id` 列是外键，它引用了 `departments` 表的 `id` 列。这确保了 `employees` 表中的 `department_id` 必须是 `departments` 表中的一个有效 `id`。

### 3. 唯一约束 (Unique Constraint)

唯一约束确保列中的所有值都是唯一的，允许空值，但每个表中的空值只能出现一次。

### 示例

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE
);

```

在这个例子中，`email` 列具有唯一约束，确保每个 `email` 值在表中是唯一的。

### 4. 非空约束 (NOT NULL Constraint)

非空约束确保列中的每个值都不能为空。

### 示例

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

```

在这个例子中，`name` 和 `email` 列具有非空约束，确保每个值都不能为空。

### 5. 检查约束 (CHECK Constraint)

检查约束用于确保列中的所有值满足指定的条件。在 MySQL 8.0.16 及更高版本中支持。

### 示例

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    CHECK (age >= 18)
);

```

在这个例子中，`age` 列具有检查约束，确保每个 `age` 值都大于或等于 18。

### 使用多种约束的示例

综合使用上述约束来创建一个更复杂的表：

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,                        -- 主键约束
    name VARCHAR(100) NOT NULL,                -- 非空约束
    email VARCHAR(100) UNIQUE,                 -- 唯一约束
    age INT CHECK (age >= 18),                 -- 检查约束
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)  -- 外键约束
);

```

### 总结

完整性约束是确保数据库数据一致性和准确性的关键工具。通过合理使用主键约束、外键约束、唯一约束、非空约束和检查约束，可以创建一个健壮的数据库设计，确保数据的完整性和有效性。根据具体应用需求选择合适的约束类型，可以有效防止数据错误和保持数据的一致性。