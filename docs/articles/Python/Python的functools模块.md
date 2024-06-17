`functools` 模块是 Python 标准库的一部分，它提供了一些用于高阶函数操作的工具，即操作或返回其他函数的函数。这些工具非常有用，可以提高代码的可读性和可重用性。以下是 `functools` 模块的一些主要功能和示例：

### 1. `functools.reduce`

`reduce` 函数用于对序列中的元素进行累积操作。它从序列的第一个元素开始，将前两个元素应用于一个函数，然后将结果与下一个元素应用于该函数，以此类推。

```python
from functools import reduce

# 计算列表的累积乘积
numbers = [1, 2, 3, 4, 5]
result = reduce(lambda x, y: x * y, numbers)
print(result)  # 输出: 120
```

### 2. `functools.partial`

`partial` 函数用于创建一个新的函数，这个新的函数是一个部分应用了参数的旧函数。它用于固定函数的某些参数，使其变得更简单。

```python
from functools import partial

def power(base, exponent):
    return base ** exponent

# 创建一个平方函数
square = partial(power, exponent=2)
print(square(5))  # 输出: 25

# 创建一个立方函数
cube = partial(power, exponent=3)
print(cube(3))  # 输出: 27
```

### 3. `functools.update_wrapper`

`update_wrapper` 函数用于更新一个包装函数，使其看起来像原始函数。这通常在装饰器中使用。

```python
from functools import wraps

def my_decorator(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        print("Something is happening before the function is called.")
        result = f(*args, **kwargs)
        print("Something is happening after the function is called.")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}")

say_hello("Alice")
# 输出:
# Something is happening before the function is called.
# Hello, Alice
# Something is happening after the function is called.
```

### 4. `functools.lru_cache`

`lru_cache` 是一种缓存技术，用于存储函数的结果以便后续调用时直接返回结果，而不需要重新计算。它可以显著提高函数的性能，特别是对于计算密集型函数。

```python
from functools import lru_cache

@lru_cache(maxsize=100)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(50))  # 输出: 12586269025
```

### 5. `functools.total_ordering`

`total_ordering` 装饰器用于简化类的比较操作。只需定义一个或两个基本比较方法，装饰器会自动生成其他比较方法。

```python
from functools import total_ordering

@total_ordering
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __eq__(self, other):
        if not isinstance(other, Person):
            return NotImplemented
        return self.age == other.age

    def __lt__(self, other):
        if not isinstance(other, Person):
            return NotImplemented
        return self.age < other.age

# 现在 Person 类支持所有的比较操作
alice = Person('Alice', 30)
bob = Person('Bob', 25)

print(alice > bob)  # 输出: True
print(alice <= bob)  # 输出: False
```

### 6. `functools.singledispatch`

`singledispatch` 是一个实现单分派泛型函数的装饰器。它允许根据第一个参数的类型来选择执行的具体函数。

```python
from functools import singledispatch

@singledispatch
def fun(arg):
    print(f"Default implementation for type {type(arg)}")

@fun.register(int)
def _(arg):
    print(f"Implementation for int: {arg}")

@fun.register(str)
def _(arg):
    print(f"Implementation for str: {arg}")

fun(10)    # 输出: Implementation for int: 10
fun("hi")  # 输出: Implementation for str: hi
fun([1, 2, 3])  # 输出: Default implementation for type <class 'list'>
```

### 总结

`functools` 模块提供了许多强大的工具，可以显著提高 Python 编程的效率和灵活性。了解并熟练使用这些工具，可以使代码更简洁、高效和易于维护。