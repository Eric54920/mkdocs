在Python中，字符串格式化是一种将变量插入字符串中的方法，使得输出的字符串更加具有可读性和美观性。Python提供了多种字符串格式化的方法，包括使用 `%` 操作符、`str.format()` 方法和 f-string（格式化字符串字面值）。下面逐个介绍这些方法的用法和示例。

### 1. 使用 % 操作符进行字符串格式化

`%` 操作符可以将变量插入字符串中，并指定格式化的方式。

#### 基本语法：

```python
formatted_string = "format string % (value1, value2, ...)"
```

- `%` 后面跟着格式化字符串，其中 `%` 后的括号中包含要插入的变量。
- 格式化字符串中使用 `%` 后面的占位符来表示变量的位置和格式化方式。

#### 示例：

```python
name = "Alice"
age = 25
formatted_string = "My name is %s and I am %d years old." % (name, age)
print(formatted_string)
```

#### 输出结果：

```
My name is Alice and I am 25 years old.
```

在上面的示例中，`%s` 表示字符串格式，`%d` 表示整数格式。具体的占位符及其格式化规则如下：

- `%s`：字符串
- `%d`：带符号的十进制整数
- `%f`：浮点数
- `%x`、`%X`：十六进制表示的整数

### 2. 使用 str.format() 方法进行字符串格式化

`str.format()` 方法允许更灵活和强大的字符串格式化，支持指定变量的位置和格式。

#### 基本语法：

```python
formatted_string = "format string {}".format(value1, value2, ...)"
```

- 大括号 `{}` 用于表示要插入变量的位置。
- 可以使用 `{}` 中的数字或命名字段来指定变量的位置或名称。
- 可以在 `{}` 中使用 `:` 指定格式化选项。

#### 示例：

```python
name = "Bob"
age = 30
formatted_string = "My name is {} and I am {} years old.".format(name, age)
print(formatted_string)
```

#### 输出结果：

```
My name is Bob and I am 30 years old.
```

指定位置和格式化选项：

```python
pi = 3.141592653589793
formatted_string = "The value of pi is {:.2f}".format(pi)
print(formatted_string)
```

#### 输出结果：

```
The value of pi is 3.14
```

在上面的示例中，`:.2f` 表示格式化为保留两位小数的浮点数。

### 3. 使用 f-string 进行字符串格式化（Python 3.6+）

f-string 是从 Python 3.6 开始引入的一种更简洁、更直观的字符串格式化方式，允许在字符串中直接插入变量。

#### 基本语法：

```python
formatted_string = f"format string {value1} {value2} ..."
```

- 在字符串前加上 `f` 或 `F`，然后在字符串中用 `{}` 插入变量。
- 可以在 `{}` 中使用表达式和函数调用。

#### 示例：

```python
name = "Charlie"
age = 35
formatted_string = f"My name is {name} and I am {age} years old."
print(formatted_string)
```

#### 输出结果：

```
My name is Charlie and I am 35 years old.
```

支持表达式和函数调用：

```python
a = 10
b = 5
formatted_string = f"The sum of {a} and {b} is {a + b}"
print(formatted_string)
```

#### 输出结果：

```
The sum of 10 and 5 is 15
```

### 总结

以上是Python中常用的字符串格式化方法：使用 `%` 操作符、`str.format()` 方法和 f-string。f-string 是最推荐的方法，因为它更简洁、更直观，并且在性能上有所优化。根据个人习惯和项目需求，选择合适的字符串格式化方式来使代码更具可读性和易维护性。