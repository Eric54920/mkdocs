---
comments: true
---

Go语言的 `io` 包提供了基本的接口和函数，用于I/O操作。它定义了一些核心的接口，如 `Reader`、`Writer` 等，这些接口被标准库中的许多其他包使用。以下是对 `io` 包中主要接口、类型和函数的详细介绍。

### 1. `io.Reader` 接口

**`Reader`** 接口表示从数据流中读取数据的能力。

**方法**：

- `Read(p []byte) (n int, err error)`: 从数据流中读取最多 `len(p)` 字节的数据并写入 `p`，返回读取的字节数和错误信息。`err` 在正常读取完毕时会返回 `io.EOF`。

**示例**：

```go
package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Go!")
	buf := make([]byte, 4)

	for {
		n, err := r.Read(buf)
		if err == io.EOF {
			break
		}
		fmt.Printf("Read %d bytes: %s\n", n, buf[:n])
	}
}
```

### 2. `io.Writer` 接口

**`Writer`** 接口表示向数据流中写入数据的能力。

**方法**：

- `Write(p []byte) (n int, err error)`: 将 `p` 中的数据写入数据流，返回写入的字节数和错误信息。

**示例**：

```go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	data := []byte("Hello, Go!")
	n, err := os.Stdout.Write(data)
	if err != nil {
		fmt.Println("Error:", err)
	}
	fmt.Printf("\nWrote %d bytes\n", n)
}
```

### 3. `io.ReadWriter` 接口

**`ReadWriter`** 接口组合了 `Reader` 和 `Writer` 接口，表示既可以读取也可以写入的能力。

```go
type ReadWriter interface {
    Reader
    Writer
}
```

### 4. `io.ReadCloser` 接口

**`ReadCloser`** 接口组合了 `Reader` 和 `Closer` 接口，表示可以读取和关闭的能力。

```go
type ReadCloser interface {
    Reader
    Closer
}
```

### 5. `io.WriteCloser` 接口

**`WriteCloser`** 接口组合了 `Writer` 和 `Closer` 接口，表示可以写入和关闭的能力。

```go
type WriteCloser interface {
    Writer
    Closer
}
```

### 6. `io.ReadWriteCloser` 接口

**`ReadWriteCloser`** 接口组合了 `Reader`、`Writer` 和 `Closer` 接口，表示可以读取、写入和关闭的能力。

```go
type ReadWriteCloser interface {
    Reader
    Writer
    Closer
}
```

### 7. `io.ReaderAt` 接口

**`ReaderAt`** 接口表示从特定位置读取数据的能力。

**方法**：

- `ReadAt(p []byte, off int64) (n int, err error)`: 从指定的偏移量 `off` 开始读取数据。

**示例**：

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Go!")
	buf := make([]byte, 5)
	n, err := r.ReadAt(buf, 7)
	if err != nil {
		fmt.Println("Error:", err)
	}
	fmt.Printf("Read %d bytes: %s\n", n, buf)
}
```

### 8. `io.WriterAt` 接口

**`WriterAt`** 接口表示从特定位置写入数据的能力。

**方法**：

- `WriteAt(p []byte, off int64) (n int, err error)`: 从指定的偏移量 `off` 开始写入数据。

**示例**：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	f, err := os.Create("example.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer f.Close()

	data := []byte("Hello, Go!")
	n, err := f.WriteAt(data, 5)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Printf("Wrote %d bytes\n", n)
}
```

### 9. `io.Closer` 接口

**`Closer`** 接口表示关闭资源的能力。

**方法**：

- `Close() error`: 关闭资源并返回错误信息。

### 10. `io.Seeker` 接口

**`Seeker`** 接口表示定位到特定位置的能力。

**方法**：

- `Seek(offset int64, whence int) (int64, error)`: 根据 `whence` 的值设置偏移量，可以是 `SeekStart`、`SeekCurrent` 或 `SeekEnd`。

**示例**：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	f, err := os.Open("example.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer f.Close()

	f.Seek(5, io.SeekStart)
	buf := make([]byte, 5)
	n, err := f.Read(buf)
	if err != nil {
		fmt.Println("Error:", err)
	}
	fmt.Printf("Read %d bytes: %s\n", n, buf)
}
```

### 11. `io.LimitedReader` 结构体

**`LimitedReader` 结构体**用于限制读取的字节数。

**字段**：

- `R io.Reader`: 底层的 `Reader`。
- `N int64`: 剩余允许读取的字节数。

**方法**：

- `Read(p []byte) (n int, err error)`: 从 `R` 中读取，但不超过 `N` 字节。

**示例**：

```go
package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Go!")
	lr := &io.LimitedReader{R: r, N: 5}
	buf := make([]byte, 10)
	n, err := lr.Read(buf)
	if err != nil && err != io.EOF {
		fmt.Println("Error:", err)
	}
	fmt.Printf("Read %d bytes: %s\n", n, buf[:n])
}
```

### 12. `io.SectionReader` 结构体

**`SectionReader` 结构体**用于从 `ReaderAt` 接口的部分区域读取数据。

**字段**：

- `r io.ReaderAt`: 底层的 `ReaderAt`。
- `off int64`: 偏移量。
- `n int64`: 读取区域的字节数。

**方法**：

- `Read(p []byte) (n int, err error)`: 从指定区域读取数据。
- `Seek(offset int64, whence int) (int64, error)`: 改变读取位置。
- `ReadAt(p []byte, off int64) (n int, err error)`: 从指定偏移量开始读取数据。

**示例**：

```go
package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Go!")
	sr := io.NewSectionReader(r, 7, 2)
	buf := make([]byte, 10)
	n, err := sr.Read(buf)
	if err != nil && err != io.EOF {
		fmt.Println("Error:", err)
	}
	fmt.Printf("Read %d bytes: %s\n", n, buf[:n])
}
```

### 13. `io.PipeReader` 和 `io.PipeWriter`

**`PipeReader` 和 `PipeWriter`** 用于创建内存管道，允许 `Reader` 和 `Writer` 进行同步通信。

**方法**：

- `Pipe() (r *PipeReader, w *PipeWriter)`: 创建一个新的 `PipeReader` 和 `PipeWriter`。

**示例**：

```go
package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r, w := io.Pipe()

	go func() {
		defer w.Close()
		io.Copy(w, strings.NewReader("Hello, Go!"))
	}()

	buf := make([]byte, 10)
	n, err := r.Read(buf)
	if err != nil && err != io.EOF {
		fmt.Println("Error:", err)
	}
	fmt.Printf("Read %d bytes: %s\n", n, buf[:n])
}
```

### 14. `io.TeeReader`

**`TeeReader`** 复制读取的数据到一个 `Writer`，同时返回读取的数据。

**方法**：

- `TeeReader(r Reader, w Writer) Reader`: 创建一个 `TeeReader`，将读取的数据写入 `Writer`。

**示例**：

```go
package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Go!")
	tr := io.TeeReader(r, os.Stdout)
	buf := make([]byte, 10)
	n, err := tr.Read(buf)
	if err

 != nil && err != io.EOF {
		fmt.Println("Error:", err)
	}
	fmt.Printf("\nRead %d bytes: %s\n", n, buf[:n])
}
```

### 15. `io.MultiReader`

**`MultiReader`** 将多个 `Reader` 连接成一个 `Reader`，依次读取。

**方法**：

- `MultiReader(readers ...Reader) Reader`: 创建一个 `MultiReader`。

**示例**：

```go
package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r1 := strings.NewReader("Hello, ")
	r2 := strings.NewReader("Go!")
	mr := io.MultiReader(r1, r2)
	buf := make([]byte, 10)
	n, err := mr.Read(buf)
	if err != nil && err != io.EOF {
		fmt.Println("Error:", err)
	}
	fmt.Printf("Read %d bytes: %s\n", n, buf[:n])
}
```

### 16. `io.MultiWriter`

**`MultiWriter`** 将多个 `Writer` 连接成一个 `Writer`，数据写入时会被复制到所有 `Writer`。

**方法**：

- `MultiWriter(writers ...Writer) Writer`: 创建一个 `MultiWriter`。

**示例**：

```go
package main

import (
	"io"
	"os"
)

func main() {
	f, err := os.Create("example.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer f.Close()

	mw := io.MultiWriter(os.Stdout, f)
	_, err = mw.Write([]byte("Hello, Go!"))
	if err != nil {
		fmt.Println("Error:", err)
	}
}
```

### 17. 其他辅助函数

- **`io.Copy`**: 从 `src` 复制数据到 `dst`，直到 `src` 达到 `EOF` 或发生错误。
```go
func Copy(dst Writer, src Reader) (written int64, err error)
```

- **`io.CopyN`**: 从 `src` 复制 `n` 字节数据到 `dst`。
```go
func CopyN(dst Writer, src Reader, n int64) (written int64, err error)
```

- **`io.ReadAll`**: 读取 `r` 的所有数据并返回。
```go
func ReadAll(r Reader) ([]byte, error)
```

- **`io.ReadFull`**: 完全填充 `buf`，从 `r` 读取数据。
```go
func ReadFull(r Reader, buf []byte) (n int, err error)
```

- **`io.WriteString`**: 将字符串 `s` 写入 `w`。
```go
func WriteString(w Writer, s string) (n int, err error)
```

### 18. 总结

Go语言的 `io` 包提供了一系列接口和函数，用于处理I/O操作。这些接口和函数是构建更复杂的I/O操作的基础，在标准库和第三方库中得到了广泛应用。理解这些接口和函数的用法是掌握Go语言并发编程和高性能编程的关键。