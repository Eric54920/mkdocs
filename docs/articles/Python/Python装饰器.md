---
comments: true
---

Python 中的装饰器（Decorator）是一种高级功能，用于修改或扩展函数或类的行为。装饰器本质上是一个函数，它接受一个函数作为参数，并返回一个新的函数。装饰器可以在不修改原函数定义的情况下，添加额外的功能，比如日志记录、性能测试、权限验证等。以下是装饰器的基本用法和一些常见的应用场景：

### 1. 装饰器基本语法

```python
def decorator_function(original_function):
    def wrapper_function(*args, **kwargs):
        # 在调用原函数之前的额外操作
        print(f"Wrapper executed this before {original_function.__name__}()")
        return original_function(*args, **kwargs)
        # 在调用原函数之后的额外操作
    return wrapper_function

@decorator_function
def display():
    print('Display function ran')

display()
```

### 2. 装饰器链

装饰器可以链式调用，一个函数可以被多个装饰器修饰，按照从上到下的顺序执行。

```python
def decorator_one(original_function):
    def wrapper_function(*args, **kwargs):
        print('Decorator one executed')
        return original_function(*args, **kwargs)
    return wrapper_function

def decorator_two(original_function):
    def wrapper_function(*args, **kwargs):
        print('Decorator two executed')
        return original_function(*args, **kwargs)
    return wrapper_function

@decorator_one
@decorator_two
def display():
    print('Display function ran')

display()
```

输出结果：
```
Decorator one executed
Decorator two executed
Display function ran
```

### 3. 带参数的装饰器

装饰器本身也可以接受参数，这种装饰器可以用来传递额外的信息给装饰器函数。

```python
def prefix_decorator(prefix):
    def decorator_function(original_function):
        def wrapper_function(*args, **kwargs):
            print(f'{prefix} Wrapper executed this before {original_function.__name__}()')
            return original_function(*args, **kwargs)
        return wrapper_function
    return decorator_function

@prefix_decorator('LOG:')
def display_info(name, age):
    print(f'Display_info ran with arguments ({name}, {age})')

display_info('John', 25)
```

输出结果：
```
LOG: Wrapper executed this before display_info()
Display_info ran with arguments (John, 25)
```

### 4. 类装饰器

除了函数装饰器，Python 还支持类装饰器，类装饰器需要实现 `__init__()` 和 `__call__()` 方法。

```python
class DecoratorClass:
    def __init__(self, original_function):
        self.original_function = original_function
    
    def __call__(self, *args, **kwargs):
        print(f'Call method executed this before {self.original_function.__name__}()')
        return self.original_function(*args, **kwargs)

@DecoratorClass
def display():
    print('Display function ran')

display()
```

输出结果：
```
Call method executed this before display()
Display function ran
```

### 5. 应用场景

常见的装饰器应用场景包括：

- **日志记录**：记录函数调用的输入、输出或运行时间。
- **性能测试**：测量函数运行的时间。
- **权限验证**：检查用户是否有执行函数的权限。
- **缓存**：缓存函数的结果，避免重复计算。
- **事务处理**：确保函数的所有步骤都成功完成或全部撤销。

### 总结

装饰器是 Python 强大且灵活的特性，可以用于增强函数和类的功能，提高代码的重用性和可维护性。合理使用装饰器可以有效地降低代码耦合度，使得代码更加清晰和易于理解。