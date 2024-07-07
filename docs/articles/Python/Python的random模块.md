---
comments: true
---

`random` 模块是 Python 标准库中用于生成随机数的模块，提供了多种生成随机数的函数和方法。它可以用于模拟、密码学、游戏开发等多种应用场景。以下是 `random` 模块中常用的函数和方法：

### 导入 random 模块

```python
import random
```

### 常用函数和方法

#### `random.random()`

生成一个 [0.0, 1.0) 范围内的随机浮点数。

```python
rand_float = random.random()
print(f"随机浮点数: {rand_float}")
```

#### `random.randint(a, b)`

生成一个 [a, b] 范围内的随机整数。

```python
rand_int = random.randint(1, 10)
print(f"随机整数: {rand_int}")
```

#### `random.choice(seq)`

从序列 `seq` 中随机选择一个元素。

```python
seq = ['apple', 'banana', 'cherry']
rand_item = random.choice(seq)
print(f"随机选择的元素: {rand_item}")
```

#### `random.shuffle(seq)`

随机打乱序列 `seq` 中元素的顺序（就地修改）。

```python
seq = ['apple', 'banana', 'cherry']
random.shuffle(seq)
print(f"打乱后的序列: {seq}")
```

#### `random.sample(population, k)`

从 `population` 中随机选择 `k` 个独立的元素返回列表。

```python
population = ['apple', 'banana', 'cherry', 'date', 'elderberry']
sample_list = random.sample(population, k=3)
print(f"随机样本列表: {sample_list}")
```

#### `random.uniform(a, b)`

生成一个 [a, b] 范围内的随机浮点数。

```python
rand_uniform = random.uniform(1.0, 10.0)
print(f"随机浮点数: {rand_uniform}")
```

#### `random.seed(a=None)`

初始化随机数生成器的种子。如果不指定种子，系统会使用当前时间。

```python
random.seed(42)  # 设置种子为 42
rand1 = random.randint(1, 100)
rand2 = random.randint(1, 100)
print(f"第一个随机数: {rand1}")
print(f"第二个随机数: {rand2}")
```

### 示例用法

以下是一个简单的示例，展示了 `random` 模块中几个常用函数的基本用法：

```python
import random

# 生成随机浮点数
rand_float = random.random()
print(f"随机浮点数: {rand_float}")

# 生成随机整数
rand_int = random.randint(1, 10)
print(f"随机整数: {rand_int}")

# 随机选择元素
seq = ['apple', 'banana', 'cherry']
rand_item = random.choice(seq)
print(f"随机选择的元素: {rand_item}")

# 打乱序列
random.shuffle(seq)
print(f"打乱后的序列: {seq}")

# 随机选择样本
sample_list = random.sample(seq, k=2)
print(f"随机样本列表: {sample_list}")

# 生成随机浮点数
rand_uniform = random.uniform(1.0, 10.0)
print(f"随机浮点数: {rand_uniform}")
```

### 总结

`random` 模块提供了多种生成随机数的函数和方法，可以满足不同场景下的随机数需求，包括生成随机浮点数、整数、随机选择元素、打乱序列等操作。使用这些函数和方法能够有效地进行随机数生成和随机化处理，是进行随机数操作的重要工具。