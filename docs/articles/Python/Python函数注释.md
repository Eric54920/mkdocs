---
comments: true
---

在 Python 中，函数注释（Docstring 和 类型注解）有助于提高代码的可读性和可维护性。下面介绍 Python 函数注释的几种方式：

### 1. 类型注解（Type Hints）

Python 3 提供了 **类型注解** 来指明函数参数和返回值的类型：
```python
def add(a: int, b: int) -> int:
    return a + b
```

#### 1.1 说明

- `a: int` 和 `b: int` 表示参数 `a` 和 `b` 需要是整数
- `-> int` 表示返回值类型是 `int`

Python **不会强制类型检查**，但可以借助工具（如 `mypy`）进行静态检查：
```sh
mypy script.py  # 检查类型
```

### 2. Docstring（文档字符串）

Docstring 用于提供详细的函数说明，通常使用三重引号 `""" """` 或 `''' '''`：
```python
def add(a: int, b: int) -> int:
    """
    计算两个整数的和。

    参数:
    - a (int): 第一个整数
    - b (int): 第二个整数

    返回:
    - int: 两个整数的和

    示例:
    >>> add(3, 5)
    8
    """
    return a + b
```

#### 2.1 说明

- 说明 **函数用途**
- 列出 **参数及类型**
- 指明 **返回值**
- 给出 **示例**

### 3. 不同风格的 Docstring

Python 没有强制使用某种格式，但以下几种风格常见：

#### 3.1 Google 风格

```python
def add(a: int, b: int) -> int:
    """
    计算两个整数的和。

    Args:
        a (int): 第一个整数
        b (int): 第二个整数

    Returns:
        int: 两个整数的和

    Example:
        >>> add(3, 5)
        8
    """
    return a + b
```

#### 3.2 NumPy 风格

```python
def add(a: int, b: int) -> int:
    """
    计算两个整数的和。

    Parameters
    ----------
    a : int
        第一个整数
    b : int
        第二个整数

    Returns
    -------
    int
        两个整数的和

    Examples
    --------
    >>> add(3, 5)
    8
    """
    return a + b
```

#### 3.3 reStructuredText (Sphinx) 风格

```python
def add(a: int, b: int) -> int:
    """
    计算两个整数的和。

    :param a: 第一个整数
    :type a: int
    :param b: 第二个整数
    :type b: int
    :return: 两个整数的和
    :rtype: int

    :example:
        >>> add(3, 5)
        8
    """
    return a + b
```

### 4. 使用 `help()` 查看注释

在 Python 交互式环境或脚本中，可以用 `help()` 查看函数的 Docstring：
```python
help(add)
```
输出：
```
Help on function add in module __main__:

add(a: int, b: int) -> int
    计算两个整数的和。

    参数:
    - a (int): 第一个整数
    - b (int): 第二个整数

    返回:
    - int: 两个整数的和
```

### 5. 结合 `typing` 进行更复杂的注解

Python `typing` 模块提供了更多高级的类型注解：
```python
from typing import List, Tuple, Union

def process_data(data: List[Union[int, float]]) -> Tuple[int, float]:
    """
    处理数据列表。

    参数:
    - data (List[Union[int, float]]): 由整数和浮点数组成的列表

    返回:
    - Tuple[int, float]: (整数个数, 浮点数总和)
    """
    int_count = sum(1 for x in data if isinstance(x, int))
    float_sum = sum(x for x in data if isinstance(x, float))
    return int_count, float_sum
```

### 6. 总结

| 方法 | 作用 |
|------|------|
| **类型注解** | 指定参数和返回值类型 |
| **Docstring** | 提供函数的详细描述 |
| **Google 风格** | `Args / Returns` 结构清晰 |
| **NumPy 风格** | 适用于科学计算 |
| **Sphinx 风格** | 适合自动生成文档 |

**推荐写法：**
- **简单函数** 直接用类型注解即可
- **复杂函数** 结合 **Docstring + 类型注解**
- **团队开发** 统一使用 **Google/NumPy/Sphinx 风格**

这样既能提高代码的可读性，也方便自动化文档工具解析！🚀
