---
comments: true
---

Python 的 `os` 模块提供了许多与操作系统进行交互的功能。它可以用于文件和目录操作、环境变量管理、执行系统命令等。以下是 `os` 模块的一些常用功能及示例。

### 导入 os 模块

```python
import os
```

### 文件和目录操作

#### 获取当前工作目录

```python
cwd = os.getcwd()
print(f"当前工作目录是: {cwd}")
```

#### 改变当前工作目录

```python
os.chdir('/path/to/directory')
print(f"新的工作目录是: {os.getcwd()}")
```

#### 列出目录内容

```python
contents = os.listdir('.')
print(f"当前目录的内容: {contents}")
```

#### 创建目录

```python
os.mkdir('new_directory')
print("目录 new_directory 创建成功")
```

#### 创建多级目录

```python
os.makedirs('parent_directory/child_directory')
print("多级目录 parent_directory/child_directory 创建成功")
```

#### 删除目录

```python
os.rmdir('new_directory')
print("目录 new_directory 删除成功")
```

#### 删除多级目录

```python
os.removedirs('parent_directory/child_directory')
print("多级目录 parent_directory/child_directory 删除成功")
```

#### 删除文件

```python
os.remove('file.txt')
print("文件 file.txt 删除成功")
```

#### 重命名文件或目录

```python
os.rename('old_name.txt', 'new_name.txt')
print("文件 old_name.txt 重命名为 new_name.txt")
```

#### 文件或目录状态

```python
status = os.stat('new_name.txt')
print(f"文件状态: {status}")
```

### 路径操作

`os.path` 子模块提供了许多路径操作函数。

```python
import os.path
```

#### 检查路径是否存在

```python
path_exists = os.path.exists('new_name.txt')
print(f"路径 new_name.txt 存在: {path_exists}")
```

#### 检查是否是文件

```python
is_file = os.path.isfile('new_name.txt')
print(f"new_name.txt 是文件: {is_file}")
```

#### 检查是否是目录

```python
is_dir = os.path.isdir('some_directory')
print(f"some_directory 是目录: {is_dir}")
```

#### 获取文件大小

```python
file_size = os.path.getsize('new_name.txt')
print(f"文件 new_name.txt 的大小: {file_size} 字节")
```

#### 获取绝对路径

```python
abs_path = os.path.abspath('new_name.txt')
print(f"文件 new_name.txt 的绝对路径: {abs_path}")
```

#### 分割路径

```python
directory, filename = os.path.split('/path/to/file.txt')
print(f"目录: {directory}, 文件名: {filename}")
```

#### 获取文件扩展名

```python
root, ext = os.path.splitext('file.txt')
print(f"文件名: {root}, 扩展名: {ext}")
```

### 环境变量

#### 获取环境变量

```python
path = os.getenv('PATH')
print(f"PATH 环境变量: {path}")
```

#### 设置环境变量

```python
os.environ['MY_VAR'] = 'my_value'
print("环境变量 MY_VAR 已设置")
```

### 执行系统命令

#### 使用 `os.system`

```python
os.system('echo Hello, World!')
```

#### 使用 `os.popen`

```python
output = os.popen('echo Hello, World!').read()
print(f"命令输出: {output}")
```

### 文件描述符操作

#### 打开文件

```python
fd = os.open('file.txt', os.O_RDWR | os.O_CREAT)
print(f"文件描述符: {fd}")
```

#### 读写文件

```python
os.write(fd, b'Hello, World!')
os.lseek(fd, 0, os.SEEK_SET)
content = os.read(fd, 12)
print(f"文件内容: {content}")
```

#### 关闭文件

```python
os.close(fd)
print("文件已关闭")
```

### 常用的os模块函数

#### 获取进程ID

```python
pid = os.getpid()
print(f"当前进程ID: {pid}")
```

#### 获取父进程ID

```python
ppid = os.getppid()
print(f"父进程ID: {ppid}")
```

#### 获取用户ID

```python
uid = os.getuid()
print(f"当前用户ID: {uid}")
```

#### 获取组ID

```python
gid = os.getgid()
print(f"当前组ID: {gid}")
```

#### 改变文件权限

```python
os.chmod('file.txt', 0o644)
print("文件权限已更改")
```

### 使用示例

以下是一个使用`os`模块进行文件和目录操作的综合示例：

```python
import os

# 创建目录
os.makedirs('example_dir/sub_dir')

# 创建文件
with open('example_dir/sub_dir/example.txt', 'w') as f:
    f.write('Hello, World!')

# 列出目录内容
print(f"目录内容: {os.listdir('example_dir/sub_dir')}")

# 获取文件状态
print(f"文件状态: {os.stat('example_dir/sub_dir/example.txt')}")

# 获取绝对路径
print(f"绝对路径: {os.path.abspath('example_dir/sub_dir/example.txt')}")

# 重命名文件
os.rename('example_dir/sub_dir/example.txt', 'example_dir/sub_dir/example_renamed.txt')

# 删除文件
os.remove('example_dir/sub_dir/example_renamed.txt')

# 删除目录
os.removedirs('example_dir/sub_dir')
```

### 总结

`os` 模块是一个功能强大的模块，提供了许多与操作系统进行交互的工具。熟练掌握这些工具可以大大提高Python编程的效率和灵活性。无论是文件和目录操作，还是环境变量管理和系统命令执行，`os` 模块都能满足你的需求。