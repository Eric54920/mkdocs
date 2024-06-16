为了对图片进行压缩，可以使用Python中的`Pillow`库。这种压缩可以是有损压缩（减少图像质量以减小文件大小）或无损压缩（不损失图像质量但优化文件大小）。以下是两个示例：一个是有损压缩，另一个是无损压缩。

首先，确保你已经安装了`Pillow`库。如果没有安装，可以使用以下命令安装：

```sh
pip install pillow
```

### 有损压缩示例

有损压缩通常用于JPEG格式，可以通过降低图像质量来显著减小文件大小。

```python
from PIL import Image

def compress_image_lossy(input_path, output_path, quality=85):
    # 打开图像
    img = Image.open(input_path)
    
    # 保存图像，使用JPEG格式并降低质量
    img.save(output_path, format='JPEG', quality=quality, optimize=True)

# 示例用法
input_path = 'input_image.jpg'  # 输入图像路径
output_path = 'compressed_image_lossy.jpg'  # 输出图像路径

compress_image_lossy(input_path, output_path, quality=85)
```

!!! warning "可能出现以下问题"

    OSError: cannot write mode RGBA as JPEG

`OSError: cannot write mode RGBA as JPEG` 这个错误表明你试图将一个包含透明度通道（即RGBA模式）的图像保存为JPEG格式。JPEG格式不支持透明度，所以你需要将图像转换为RGB模式，这样就不会有透明度。

这里是一个示例代码，展示了如何将图像从RGBA转换为RGB并保存为JPEG格式：

```python
from PIL import Image

def compress_image_lossy(input_path, output_path, quality=85):
    # 打开图像
    img = Image.open(input_path)

    # 如果图像有透明度（即RGBA模式），将其转换为RGB模式
    if img.mode == 'RGBA':
        img = img.convert('RGB')
    
    # 保存图像，使用JPEG格式并降低质量
    img.save(output_path, format='JPEG', quality=quality, optimize=True)

# 示例用法
input_path = 'input_image.png'  # 输入图像路径
output_path = 'compressed_image_lossy.jpg'  # 输出图像路径

compress_image_lossy(input_path, output_path, quality=85)
```

这个代码在保存JPEG图像之前会检查图像模式，如果图像模式是`RGBA`（即包含透明度），它会将图像转换为`RGB`模式（去掉透明度）。这样可以避免`OSError`错误。

### 无损压缩示例

无损压缩通常用于PNG格式，优化文件大小但不损失图像质量。

```python
from PIL import Image

def compress_image_lossless(input_path, output_path):
    # 打开图像
    img = Image.open(input_path)
    
    # 保存图像，使用PNG格式并启用优化
    img.save(output_path, format='PNG', optimize=True)

# 示例用法
input_path = 'input_image.png'  # 输入图像路径
output_path = 'compressed_image_lossless.png'  # 输出图像路径

compress_image_lossless(input_path, output_path)
```

### 使用示例

1. 创建一个名为`compress_image.py`的文件，并将以上代码粘贴到文件中。
2. 将你要压缩的图像放在与脚本相同的目录中，并确保输入路径和输出路径正确。
3. 运行脚本：

```sh
python compress_image.py
```

这两个示例分别展示了如何进行有损和无损压缩。根据你的需求选择合适的压缩方法。