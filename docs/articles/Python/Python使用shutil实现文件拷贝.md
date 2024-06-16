在Python中，可以使用`shutil`模块来拷贝文件。`shutil`模块提供了多个用于文件操作的函数，如`shutil.copy`、`shutil.copy2`和`shutil.copyfile`。下面是一些示例，展示了如何使用这些函数来拷贝文件。

### 使用 `shutil.copy`

`shutil.copy` 函数将文件从源路径复制到目标路径。此函数会拷贝文件的内容以及权限，但不会拷贝文件的元数据（例如最后修改时间）。

```python
import shutil

def copy_file(src, dst):
    try:
        shutil.copy(src, dst)
        print(f"File copied from {src} to {dst}")
    except IOError as e:
        print(f"Unable to copy file. {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# 示例用法
src = 'path/to/source/file.txt'  # 源文件路径
dst = 'path/to/destination/file.txt'  # 目标文件路径

copy_file(src, dst)
```

### 使用 `shutil.copy2`

`shutil.copy2` 函数与 `shutil.copy` 类似，但它会拷贝文件的内容、权限以及元数据（例如最后修改时间和创建时间）。

```python
import shutil

def copy_file_with_metadata(src, dst):
    try:
        shutil.copy2(src, dst)
        print(f"File copied from {src} to {dst} with metadata")
    except IOError as e:
        print(f"Unable to copy file. {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# 示例用法
src = 'path/to/source/file.txt'  # 源文件路径
dst = 'path/to/destination/file.txt'  # 目标文件路径

copy_file_with_metadata(src, dst)
```

### 使用 `shutil.copyfile`

`shutil.copyfile` 函数仅拷贝文件内容，不拷贝权限和元数据。目标文件必须是一个新文件，不能是一个目录。

```python
import shutil

def copy_file_content_only(src, dst):
    try:
        shutil.copyfile(src, dst)
        print(f"File content copied from {src} to {dst}")
    except IOError as e:
        print(f"Unable to copy file. {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# 示例用法
src = 'path/to/source/file.txt'  # 源文件路径
dst = 'path/to/destination/file.txt'  # 目标文件路径

copy_file_content_only(src, dst)
```

### 示例使用说明

1. 将代码保存到一个Python文件中，例如 `copy_file.py`。
2. 确保源文件路径和目标文件路径是正确的。
3. 运行Python脚本：

```sh
python copy_file.py
```

根据你的需求选择合适的函数来拷贝文件。如果你只需要拷贝文件内容，使用 `shutil.copyfile`；如果需要拷贝文件内容和权限，使用 `shutil.copy`；如果需要拷贝文件内容、权限以及元数据，使用 `shutil.copy2`。