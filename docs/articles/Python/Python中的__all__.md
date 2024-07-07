---
comments: true
---

在 Python 中，`__all__` 是一个特殊的变量，它用于定义一个模块中哪些属性（包括变量、函数、类等）在使用 `from module import *` 语法时应该被导入。如果一个模块定义了 `__all__`，那么只有 `__all__` 中列出的名称才会被导入。

### 使用 `__all__`

#### 1. 定义 `__all__`

假设有一个名为 `mymodule.py` 的模块，其中包含几个函数和一个类：

```python
# mymodule.py

def func1():
    print("This is func1")

def func2():
    print("This is func2")

def func3():
    print("This is func3")

class MyClass:
    def __init__(self):
        print("This is MyClass")
```

如果你想控制 `from mymodule import *` 导入时的行为，可以定义 `__all__`：

```python
# mymodule.py

__all__ = ['func1', 'func2', 'MyClass']

def func1():
    print("This is func1")

def func2():
    print("This is func2")

def func3():
    print("This is func3")

class MyClass:
    def __init__(self):
        print("This is MyClass")
```

#### 2. 使用 `__all__`

在另一个模块中使用 `from mymodule import *`：

```python
# main.py

from mymodule import *

func1()  # This is func1
func2()  # This is func2
# func3()  # NameError: name 'func3' is not defined
my_obj = MyClass()  # This is MyClass
```

在这个示例中，只有 `func1`、`func2` 和 `MyClass` 被导入，而 `func3` 没有被导入，因为它不在 `__all__` 列表中。

### `__all__` 的作用

1. **控制导出**：通过 `__all__`，你可以明确控制模块的公共 API，使模块的使用者清楚哪些部分是公开的，哪些部分是内部实现的细节。
2. **避免命名冲突**：在使用 `from module import *` 导入时，限制导入的名称可以减少命名冲突的风险。
3. **提高可读性**：显式列出公开的名称可以提高代码的可读性和可维护性。

### 注意事项

1. **`__all__` 仅影响 `from module import *` 语法**：直接使用 `import module` 或 `from module import specific_name` 时不受 `__all__` 影响。
2. **通用做法**：不推荐频繁使用 `from module import *`，因为它会导入所有未以下划线开头的名称，容易造成命名空间污染。应尽量使用显式导入，例如 `from module import func1, func2`。
3. **文档与注释**：除了使用 `__all__` 明确模块的公共 API，适当的文档和注释也能帮助模块的使用者理解哪些部分是公开的，哪些部分是内部实现。

### 示例：带有内部实现的模块

假设我们有一个包含内部实现细节的模块 `mymodule`：

```python
# mymodule.py

__all__ = ['public_function']

def public_function():
    print("This is a public function")

def _internal_function():
    print("This is an internal function")
```

在另一个模块中：

```python
# main.py

from mymodule import *

public_function()  # This is a public function
# _internal_function()  # NameError: name '_internal_function' is not defined
```

在这个示例中，`_internal_function` 以单下划线开头，表示它是模块的内部实现细节，不应该被导入和使用。在定义了 `__all__` 之后，`from mymodule import *` 只会导入 `public_function`，而不会导入 `_internal_function`。