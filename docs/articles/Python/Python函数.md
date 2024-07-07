---
comments: true
---

函数在Python中是非常重要和灵活的概念，它允许你组织代码并重复使用特定功能的代码块。下面详细介绍Python函数的各个方面，包括参数、返回值和作用域。

### 1. 定义函数

在Python中，使用 `def` 关键字定义函数。函数的定义通常包括函数名、参数列表、函数体和可选的返回值。

#### 示例：

```python
def greet(name):
    """向指定的名字打招呼"""
    return f"Hello, {name}!"

# 调用函数
message = greet("Alice")
print(message)  # 输出: Hello, Alice!
```

- `def`: 定义函数的关键字。
- `greet`: 函数名，用于调用函数。
- `name`: 参数，用于接收调用函数时传递的值。
- `"""..."""`: 函数的文档字符串，用于描述函数的作用和使用方法。

### 2. 函数的参数

Python函数可以接受多种类型的参数：

#### 2.1 位置参数

位置参数按照定义的顺序依次传递给函数。

```python
def add(x, y):
    return x + y

result = add(3, 5)
print(result)  # 输出: 8
```

#### 2.2 默认参数

在定义函数时，可以为参数指定默认值，调用函数时可以省略对应的参数。

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))  # 输出: Hello, Alice!
print(greet("Bob", "Hi"))  # 输出: Hi, Bob!
```

#### 2.3 可变长参数

Python支持两种类型的可变长参数：

- `*args`: 收集任意数量的位置参数为元组。

```python
def sum_numbers(*args):
    total = 0
    for num in args:
        total += num
    return total

print(sum_numbers(1, 2, 3))  # 输出: 6
```

- `**kwargs`: 收集任意数量的关键字参数为字典。

```python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30)  # 输出: name: Alice \n age: 30
```

### 3. 返回值

Python函数可以使用 `return` 语句返回计算的结果。

```python
def multiply(x, y):
    """返回两个数的乘积"""
    return x * y

result = multiply(4, 5)
print(result)  # 输出: 20
```

如果函数体内没有明确的 `return` 语句，函数默认返回 `None`。

```python
def do_nothing():
    pass

result = do_nothing()
print(result)  # 输出: None
```

### 4. 函数的作用域

Python中函数内外有不同的作用域规则：

#### 4.1 局部作用域

在函数内部定义的变量，只能在函数内部访问，称为局部变量。

```python
def func():
    local_var = 10
    print(local_var)  # 输出: 10

func()
# print(local_var)  # 错误: NameError: name 'local_var' is not defined
```

#### 4.2 全局作用域

在函数外部定义的变量，可以在整个文件范围内访问，称为全局变量。

```python
global_var = 20

def func():
    print(global_var)  # 输出: 20

func()
print(global_var)  # 输出: 20
```

#### 4.3 `global` 关键字

在函数内部使用 `global` 关键字声明全局变量，可以在函数内部修改全局变量的值。

```python
count = 0

def increment():
    global count
    count += 1

increment()
print(count)  # 输出: 1
```

#### 4.4 嵌套作用域

Python支持函数的嵌套定义，内部函数可以访问外部函数的变量，但外部函数不能直接访问内部函数的变量。

```python
def outer():
    outer_var = "outer"

    def inner():
        inner_var = "inner"
        print(inner_var)  # 输出: inner
        print(outer_var)  # 输出: outer
    
    inner()
    # print(inner_var)  # 错误: NameError: name 'inner_var' is not defined

outer()
```

### 总结

函数是Python中组织和重复使用代码的基本单位，通过函数可以实现模块化、结构化的程序设计。合理使用函数的参数、返回值和作用域规则，可以使代码更加清晰、灵活和可维护。