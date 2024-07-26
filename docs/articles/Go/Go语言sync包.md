---
comments: true
---

Go语言的 `sync` 包提供了多种用于实现并发同步的工具。下面是 `sync` 包中所有主要类型及其方法的详细介绍，并包括代码示例以展示其使用方法。

### 1. `sync.Mutex`

**`sync.Mutex`** 是一个互斥锁，用于保护临界区，确保同一时间只有一个 goroutine 可以访问被保护的资源。

**方法**：

- `Lock()`: 上锁，阻塞当前 goroutine 直到锁可用。
- `Unlock()`: 解锁，释放对互斥锁的持有。

**示例**：

```go
package main

import (
	"fmt"
	"sync"
)

var (
	mu    sync.Mutex
	count int
)

func increment() {
	mu.Lock()
	defer mu.Unlock()
	count++
}

func main() {
	var wg sync.WaitGroup

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			increment()
		}()
	}

	wg.Wait()
	fmt.Println("Final count:", count)
}
```

### 2. `sync.RWMutex`

**`sync.RWMutex`** 是一个读写互斥锁，允许多个 goroutine 同时进行读操作，但写操作是独占的。

**方法**：

- `RLock()`: 获取读锁。
- `RUnlock()`: 释放读锁。
- `Lock()`: 获取写锁。
- `Unlock()`: 释放写锁。

**示例**：

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var (
	rwMutex  sync.RWMutex
	data     int
)

func read() {
	rwMutex.RLock()
	defer rwMutex.RUnlock()
	fmt.Println("Reading data:", data)
}

func write(newData int) {
	rwMutex.Lock()
	defer rwMutex.Unlock()
	data = newData
}

func main() {
	var wg sync.WaitGroup

	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			write(i)
			time.Sleep(1 * time.Second)
			read()
		}(i)
	}

	wg.Wait()
}
```

### 3. `sync.WaitGroup`

**`sync.WaitGroup`** 用于等待一组 goroutine 完成执行。

**方法**：

- `Add(delta int)`: 增加或减少等待计数。
- `Done()`: 表示一个 goroutine 完成工作。
- `Wait()`: 阻塞当前 goroutine，直到计数器变为零。

**示例**：

```go
package main

import (
	"fmt"
	"sync"
)

func worker(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Printf("Worker %d started\n", id)
	// 模拟工作
}

func main() {
	var wg sync.WaitGroup
	workers := 5

	for i := 1; i <= workers; i++ {
		wg.Add(1)
		go worker(i, &wg)
	}

	wg.Wait()
	fmt.Println("All workers completed")
}
```

### 4. `sync.Once`

**`sync.Once`** 确保某些操作仅执行一次。

**方法**：

- `Do(f func())`: 执行 `f`，确保 `f` 只被执行一次。

**示例**：

```go
package main

import (
	"fmt"
	"sync"
)

var once sync.Once

func initConfig() {
	fmt.Println("Config initialized")
}

func main() {
	for i := 0; i < 3; i++ {
		go func() {
			once.Do(initConfig)
		}()
	}

	// 等待所有 goroutine 完成
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		once.Do(initConfig)
	}()
	wg.Wait()
}
```

### 5. `sync.Pool`

**`sync.Pool`** 用于临时对象的池，用于减少垃圾回收压力。

**方法**：

- `Get()`: 从池中获取一个对象。
- `Put(x interface{})`: 将对象放回池中以供重用。

**示例**：

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var pool sync.Pool

	// 设置池中的创建函数
	pool.New = func() interface{} {
		return "new object"
	}

	// 从池中获取对象
	obj := pool.Get()
	fmt.Println("Object from pool:", obj)

	// 将对象放回池中
	pool.Put("reused object")
	obj = pool.Get()
	fmt.Println("Object from pool:", obj)
}
```

### 6. `sync.Cond`

**`sync.Cond`** 提供了一个条件变量，用于协调多个 goroutine。

**方法**：

- `Wait()`: 阻塞调用的 goroutine，直到条件变量被广播或通知。
- `Signal()`: 唤醒等待条件变量的一个 goroutine。
- `Broadcast()`: 唤醒所有等待条件变量的 goroutine。

**示例**：

```go
package main

import (
	"fmt"
	"sync"
)

var (
	cond   *sync.Cond
	counter int
)

func worker(id int) {
	cond.L.Lock()
	for counter < 5 {
		cond.Wait()
	}
	fmt.Printf("Worker %d got the signal\n", id)
	cond.L.Unlock()
}

func main() {
	mutex := &sync.Mutex{}
	cond = sync.NewCond(mutex)

	for i := 1; i <= 3; i++ {
		go worker(i)
	}

	// 模拟工作
	for i := 0; i < 5; i++ {
		mutex.Lock()
		counter++
		cond.Signal() // 或者使用 cond.Broadcast()
		mutex.Unlock()
	}
}
```

### 7. `sync.Map`

**`sync.Map`** 是一个并发安全的 map 实现，适合在并发环境中进行读写操作。

**方法**：

- `Store(key, value interface{})`: 存储一个键值对。
- `Load(key interface{}) (value interface{}, ok bool)`: 加载键对应的值。
- `LoadOrStore(key, value interface{}) (actual interface{}, loaded bool)`: 如果键存在，则返回现有的值；如果不存在，则存储新值并返回。
- `Delete(key interface{})`: 删除键及其对应的值。
- `Range(f func(key, value interface{}) bool)`: 遍历 map 中的所有键值对。

**示例**：

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var m sync.Map

	// 存储键值对
	m.Store("name", "John")
	m.Store("age", 30)

	// 加载键值对
	if value, ok := m.Load("name"); ok {
		fmt.Println("Name:", value)
	}

	// 加载或存储键值对
	if value, loaded := m.LoadOrStore("age", 31); loaded {
		fmt.Println("Age already stored:", value)
	} else {
		fmt.Println("Age stored:", value)
	}

	// 删除键值对
	m.Delete("name")

	// 遍历 map
	m.Range(func(key, value interface{}) bool {
		fmt.Printf("%s: %v\n", key, value)
		return true
	})
}
```

这些示例展示了 `sync` 包中各种同步原语的基本用法和用途。在并发编程中，理解和使用这些工具能够帮助你有效地管理 goroutine 之间的同步和资源共享。