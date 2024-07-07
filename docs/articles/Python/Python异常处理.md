---
comments: true
---

在Python中，异常处理是一种用于应对运行时错误的机制。异常处理可以捕获错误并采取适当的措施，而不是让程序因未处理的错误而崩溃。Python提供了`try-except`语句来处理异常，以及`else`和`finally`子句来进一步控制异常处理的流程。

### 基本语法

#### `try-except` 语句

基本的异常处理结构如下：

```python
try:
    # 可能引发异常的代码块
    risky_code()
except ExceptionType as e:
    # 异常处理代码块
    handle_exception(e)
```

- `try` 块：放置可能引发异常的代码。
- `except` 块：定义处理异常的代码，`ExceptionType`是要捕获的异常类型。

#### 示例：

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"An error occurred: {e}")
```

### 捕获多个异常

可以通过多个 `except` 块来捕获不同类型的异常：

```python
try:
    result = int("abc")
except ValueError as e:
    print(f"ValueError occurred: {e}")
except TypeError as e:
    print(f"TypeError occurred: {e}")
```

或者使用单个 `except` 块捕获多个异常类型：

```python
try:
    result = int("abc")
except (ValueError, TypeError) as e:
    print(f"An error occurred: {e}")
```

### `else` 和 `finally` 子句

- **`else` 块**：如果 `try` 块中的代码没有引发异常，则执行 `else` 块中的代码。

```python
try:
    result = 10 / 2
except ZeroDivisionError as e:
    print(f"An error occurred: {e}")
else:
    print(f"Result is {result}")
```

- **`finally` 块**：无论是否引发异常，`finally` 块中的代码都会被执行。常用于清理资源。

```python
try:
    file = open('example.txt', 'r')
    content = file.read()
except IOError as e:
    print(f"An error occurred: {e}")
finally:
    file.close()
```

### 自定义异常

可以通过继承内置的 `Exception` 类来创建自定义异常：

```python
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

try:
    raise CustomError("This is a custom error message")
except CustomError as e:
    print(f"Caught a custom error: {e}")
```

### 异常的传播

如果在一个函数中没有处理异常，异常会传播到调用该函数的地方，直到找到一个处理该异常的 `except` 块。如果没有找到，程序会终止，并打印回溯信息。

```python
def function_that_raises():
    raise ValueError("An error occurred")

def function_that_calls():
    function_that_raises()

try:
    function_that_calls()
except ValueError as e:
    print(f"Caught an exception: {e}")
```

### 使用`raise`重新引发异常

在异常处理代码块中可以使用 `raise` 关键字重新引发异常，使其继续传播：

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"An error occurred: {e}")
    raise
```

### 总结

异常处理是编写健壮的Python程序的重要组成部分。通过使用`try-except`语句，可以捕获和处理异常，避免程序崩溃。同时，`else`和`finally`子句提供了进一步控制异常处理流程的方式。自定义异常和异常传播机制则增强了程序的灵活性和可维护性。