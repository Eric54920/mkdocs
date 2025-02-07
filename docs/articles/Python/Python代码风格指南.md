---
comments: true
---

### 1. PEP 8：Python 代码风格指南

Python Enhancement Proposal 8（PEP 8）是 Python 代码的官方风格指南，定义了编写 Python 代码的规范，提高代码的可读性和一致性。以下是 PEP 8 的整理和翻译，帮助更好地理解和实践 Python 编码规范。

### 2. 代码布局

#### 2.1 缩进

- 使用 **4 个空格** 作为缩进，避免使用 Tab。
- 不要混用 Tab 和空格。

#### 2.2 每行字符长度

- 每行代码 **最长 79 个字符**（docstring 和注释最长 72 个字符）。
- 长表达式可以使用 **反斜杠 `\`** 或 **括号包裹** 进行换行：
  
  ```python
  # 推荐：使用括号
  result = (first_variable + second_variable + third_variable 
            + fourth_variable + fifth_variable)

  # 不推荐：使用反斜杠
  result = first_variable + second_variable + \
           third_variable + fourth_variable
  ```

#### 2.3 空行

- **顶级定义（类、函数）之前** 用 **两个空行** 分隔：
  
  ```python
  def function_one():
      pass


  def function_two():
      pass
  ```

- **类内方法之间** 用 **一个空行** 分隔：
  
  ```python
  class MyClass:
      def method_one(self):
          pass

      def method_two(self):
          pass
  ```

- **函数内部逻辑块之间** 可添加 **空行** 增强可读性。

### 3. 导入（Imports）

#### 3.1 导入顺序

按照以下顺序组织 `import` 语句：

1. **标准库**（如 `os`, `sys`）
2. **第三方库**（如 `numpy`, `pandas`）
3. **本地应用或自定义模块**
4. **每个部分用一个空行分隔**

```python
import os
import sys

import numpy as np
import pandas as pd

from mymodule import my_function
```

#### 3.2 禁止通配符导入

不推荐 `from module import *`，避免命名空间污染。

#### 3.3 推荐使用别名

对于长模块名，建议使用简短的别名：

```python
import numpy as np
import pandas as pd
```

### 4. 代码编写规范

#### 4.1 变量和函数命名

- **变量、函数**：使用 `snake_case`（小写 + 下划线）。
  
  ```python
  def calculate_total_price():
      pass
  ```

- **类名**：使用 `PascalCase`（大驼峰）。
  
  ```python
  class DataProcessor:
      pass
  ```

- **常量**：使用 `UPPER_CASE`（全大写 + 下划线）。
  
  ```python
  MAX_RETRIES = 3
  ```

- **私有变量**：前置下划线 `_var`（非严格私有，仅用于提示不要外部访问）。
  
  ```python
  _internal_value = 42
  ```

#### 4.2 函数与方法

- **函数/方法之间应有两个空行**。
- **类方法的第一个参数**：
  - 实例方法的第一个参数应为 `self`
  - 类方法的第一个参数应为 `cls`
  
  ```python
  class Example:
      def instance_method(self):
          pass

      @classmethod
      def class_method(cls):
          pass
  ```

### 5. 代码风格建议

#### 5.1 条件表达式

- **推荐：**
  
  ```python
  if condition:
      do_something()
  ```

- **避免：**
  
  ```python
  if condition: do_something()  # 不推荐
  ```

#### 5.2 布尔值判断

- **推荐：**
  
  ```python
  if my_list:  # 空列表会被视为 False
      print("List is not empty")
  ```

- **避免：**
  
  ```python
  if len(my_list) > 0:  # 不推荐
      print("List is not empty")
  ```

### 6. 注释

#### 6.1 行内注释

行内注释需与代码至少 **两个空格** 分隔，并以 `#` 开头：

```python
x = x + 1  # 递增 x
```

#### 6.2 块注释

使用 `#` 开头，适用于多行注释：

```python
# 计算用户的折扣
# 基于他们的购买历史和会员等级
discount = calculate_discount(user)
```

#### 6.3 文档字符串（Docstring）

使用三引号 `"""` 为函数、类添加说明：

```python
def add(a, b):
    """返回两个数的和。"""
    return a + b
```

### 7. 空格使用

#### 7.1 推荐的空格用法

- **二元运算符**（=, `+`, `-`, `==`, `<` 等）两侧添加空格：
  
  ```python
  result = x + y
  ```

- **函数参数** 内部不加空格：
  
  ```python
  function(arg1, arg2)  # 推荐
  function( arg1 , arg2 )  # 不推荐
  ```

#### 7.2 不推荐的空格用法

- **不要在行尾添加多余的空格**。
- **不要在逗号、冒号、分号前添加空格**：
  
  ```python
  print(x, y)  # 推荐
  print(x , y)  # 不推荐
  ```

### 8. 其他建议

#### 8.1 避免使用可变默认参数

**错误示例**：

```python
def append_to_list(value, my_list=[]):  # 不推荐
    my_list.append(value)
    return my_list
```

**正确做法**：

```python
def append_to_list(value, my_list=None):  # 推荐
    if my_list is None:
        my_list = []
    my_list.append(value)
    return my_list
```

#### 8.2 避免多重嵌套

嵌套层级过深会降低可读性，应尽量简化：

```python
# 不推荐：嵌套过深
if condition:
    if another_condition:
        if yet_another_condition:
            do_something()

# 推荐：使用早返回（Guard Clause）
if not condition:
    return
if not another_condition:
    return
if not yet_another_condition:
    return
do_something()
```

### 9. 结论

- 遵循 PEP 8 代码风格可以提高可读性和一致性。
- 使用合适的缩进、空格、命名规范，使代码更清晰。
- 注释应简洁有力，避免冗余。

良好的代码风格能够提升团队协作和代码维护的效率。