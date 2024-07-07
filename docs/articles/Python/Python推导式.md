---
comments: true
---

在Python中，推导式（Comprehensions）是一种简洁而强大的语法，用于从一个或多个可迭代对象（iterables）创建新的可迭代对象（如列表、集合、字典等）。推导式可以大大简化代码，使得在一行内生成数据结构变得更加直观和高效。

Python支持以下几种推导式：列表推导式、集合推导式、字典推导式和生成器表达式。下面分别介绍每种推导式的语法和示例用法：

### 1. 列表推导式（List Comprehension）

列表推导式允许根据一定规则快速生成列表。

#### 基本语法：

```python
[expression for item in iterable if condition]
```

- `expression` 是一个可以使用 `item` 计算出来的值。
- `item` 是可迭代对象中的每个元素。
- `iterable` 是一个可迭代对象，如列表、元组、字符串等。
- `if condition` 是一个可选的条件，用于过滤要包含在结果列表中的元素。

#### 示例：

```python
# 生成一个包含1到10的平方数的列表
squares = [x**2 for x in range(1, 11)]
print(squares)  # 输出: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 只包含偶数的列表
even_numbers = [x for x in range(1, 11) if x % 2 == 0]
print(even_numbers)  # 输出: [2, 4, 6, 8, 10]
```

### 2. 集合推导式（Set Comprehension）

集合推导式类似于列表推导式，但是生成的是集合而不是列表。

#### 基本语法：

```python
{expression for item in iterable if condition}
```

#### 示例：

```python
# 生成一个包含1到10的平方数的集合
squares_set = {x**2 for x in range(1, 11)}
print(squares_set)  # 输出: {64, 1, 4, 36, 100, 9, 16, 49, 81, 25}
```

### 3. 字典推导式（Dictionary Comprehension）

字典推导式允许从一个可迭代对象生成一个字典，可以指定键和值的生成规则。

#### 基本语法：

```python
{key_expression: value_expression for item in iterable if condition}
```

#### 示例：

```python
# 生成一个将数字映射到其平方数的字典
squares_dict = {x: x**2 for x in range(1, 6)}
print(squares_dict)  # 输出: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```

### 4. 生成器表达式（Generator Expression）

生成器表达式与列表推导式类似，但是生成的是一个生成器对象，延迟生成元素，逐个产生值，节省内存。

#### 基本语法：

```python
(expression for item in iterable if condition)
```

#### 示例：

```python
# 生成一个包含1到10的平方数的生成器对象
squares_gen = (x**2 for x in range(1, 11))
print(squares_gen)  # 输出: <generator object <genexpr> at 0x7fa3827e5d00>

# 使用生成器表达式逐个输出平方数
for square in squares_gen:
    print(square)
```

生成器表达式可以通过迭代逐个生成元素，适合处理大数据集合或者需要逐个处理结果的情况。

### 总结

推导式是Python中强大而简洁的语法特性，能够快速创建列表、集合、字典以及生成器对象。选择合适的推导式取决于具体的需求和数据类型，能够有效提升代码的可读性和运行效率。