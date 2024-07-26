---
comments: true
---

Go语言的 `crypto` 包及其子包提供了一系列的密码学功能，从哈希计算、加密解密到签名验证。以下是对 `crypto` 包及其主要子包的详细介绍，包括所有重要的方法和使用示例。

### 1. `crypto` 包

`crypto` 包定义了一些通用接口和变量，用于密码学操作。它主要作为子包的入口，定义了常用的加密常量和接口，如 `Hash`、`Signer`、`Decrypter` 等。

### 2. `crypto/md5` 包

`md5` 包实现了MD5哈希算法。

***方法**：

- **`md5.New()`**: 返回一个新的MD5哈希对象。
- **`md5.Sum(data []byte)`**: 返回数据的MD5校验和。

**示例**：

```go
package main

import (
    "crypto/md5"
    "fmt"
    "io"
)

func main() {
    data := []byte("Hello, World!")
    hash := md5.Sum(data)
    fmt.Printf("MD5: %x\n", hash)

    h := md5.New()
    io.WriteString(h, "Hello, ")
    io.WriteString(h, "World!")
    fmt.Printf("MD5: %x\n", h.Sum(nil))
}
```

### 3. `crypto/sha1` 包

`sha1` 包实现了SHA1哈希算法。

**方法**：

- **`sha1.New()`**: 返回一个新的SHA1哈希对象。
- **`sha1.Sum(data []byte)`**: 返回数据的SHA1校验和。

**示例**：

```go
package main

import (
    "crypto/sha1"
    "fmt"
    "io"
)

func main() {
    data := []byte("Hello, World!")
    hash := sha1.Sum(data)
    fmt.Printf("SHA1: %x\n", hash)

    h := sha1.New()
    io.WriteString(h, "Hello, ")
    io.WriteString(h, "World!")
    fmt.Printf("SHA1: %x\n", h.Sum(nil))
}
```

### 4. `crypto/sha256` 包

`sha256` 包实现了SHA256哈希算法。

**方法**：

- **`sha256.New()`**: 返回一个新的SHA256哈希对象。
- **`sha256.Sum256(data []byte)`**: 返回数据的SHA256校验和。

**示例**：

```go
package main

import (
    "crypto/sha256"
    "fmt"
    "io"
)

func main() {
    data := []byte("Hello, World!")
    hash := sha256.Sum256(data)
    fmt.Printf("SHA256: %x\n", hash)

    h := sha256.New()
    io.WriteString(h, "Hello, ")
    io.WriteString(h, "World!")
    fmt.Printf("SHA256: %x\n", h.Sum(nil))
}
```

### 5. `crypto/sha512` 包

`sha512` 包实现了SHA512哈希算法。

**方法**：

- **`sha512.New()`**: 返回一个新的SHA512哈希对象。
- **`sha512.Sum512(data []byte)`**: 返回数据的SHA512校验和。

**示例**：

```go
package main

import (
    "crypto/sha512"
    "fmt"
    "io"
)

func main() {
    data := []byte("Hello, World!")
    hash := sha512.Sum512(data)
    fmt.Printf("SHA512: %x\n", hash)

    h := sha512.New()
    io.WriteString(h, "Hello, ")
    io.WriteString(h, "World!")
    fmt.Printf("SHA512: %x\n", h.Sum(nil))
}
```

### 6. `crypto/hmac` 包

`hmac` 包实现了基于哈希的消息认证码（HMAC）。

**方法**：

- **`hmac.New(hash func() hash.Hash, key []byte)`**: 返回一个新的HMAC哈希对象。
- **`hmac.Sum(data []byte)`**: 返回HMAC校验和。

**示例**：

```go
package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "fmt"
    "io"
)

func main() {
    key := []byte("secret key")
    data := []byte("Hello, World!")
    
    h := hmac.New(sha256.New, key)
    h.Write(data)
    fmt.Printf("HMAC: %x\n", h.Sum(nil))
}
```

### 7. `crypto/rand` 包

`rand` 包实现了用于加密的随机数生成器。

**方法**：

- **`rand.Read(b []byte) (n int, err error)`**: 生成随机字节并写入 `b`。
- **`rand.Int(rand io.Reader, max *big.Int) (n *big.Int, err error)`**: 返回介于 `[0, max)` 之间的一个随机数。

**示例**：

```go
package main

import (
    "crypto/rand"
    "fmt"
    "math/big"
)

func main() {
    n, err := rand.Int(rand.Reader, big.NewInt(100))
    if err != nil {
        fmt.Println("Error:", err)
    }
    fmt.Println("Random number:", n)

    b := make([]byte, 16)
    _, err = rand.Read(b)
    if err != nil {
        fmt.Println("Error:", err)
    }
    fmt.Printf("Random bytes: %x\n", b)
}
```

### 8. `crypto/aes` 包

`aes` 包实现了高级加密标准（AES）对称加密算法。

**方法**：

- **`aes.NewCipher(key []byte) (cipher.Block, error)`**: 创建并返回一个新的AES加密器。

**示例**：

```go
package main

import (
    "crypto/aes"
    "crypto/cipher"
    "crypto/rand"
    "fmt"
    "io"
)

func main() {
    key := []byte("example key 1234") // 16, 24, or 32 bytes
    plaintext := []byte("exampleplaintext")

    block, err := aes.NewCipher(key)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    ciphertext := make([]byte, aes.BlockSize+len(plaintext))
    iv := ciphertext[:aes.BlockSize]
    if _, err := io.ReadFull(rand.Reader, iv); err != nil {
        fmt.Println("Error:", err)
        return
    }

    stream := cipher.NewCFBEncrypter(block, iv)
    stream.XORKeyStream(ciphertext[aes.BlockSize:], plaintext)

    fmt.Printf("Ciphertext: %x\n", ciphertext)
}
```

### 9. `crypto/cipher` 包

`cipher` 包定义了一些底层接口和常用实现，用于分组密码、流密码和哈希函数。

**方法**：

- **`cipher.NewCFBEncrypter(block cipher.Block, iv []byte) cipher.Stream`**: 返回一个CFB加密流。
- **`cipher.NewCFBDecrypter(block cipher.Block, iv []byte) cipher.Stream`**: 返回一个CFB解密流。
- **`cipher.NewGCM(block cipher.Block) (cipher.AEAD, error)`**: 返回一个AES-GCM模式的AEAD。

**示例**：

```go
package main

import (
    "crypto/aes"
    "crypto/cipher"
    "crypto/rand"
    "fmt"
    "io"
)

func main() {
    key := []byte("example key 1234") // 16, 24, or 32 bytes
    plaintext := []byte("exampleplaintext")

    block, err := aes.NewCipher(key)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    gcm, err := cipher.NewGCM(block)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    nonce := make([]byte, gcm.NonceSize())
    if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
        fmt.Println("Error:", err)
        return
    }

    ciphertext := gcm.Seal(nonce, nonce, plaintext, nil)
    fmt.Printf("Ciphertext: %x\n", ciphertext)

    decrypted, err := gcm.Open(nil, nonce, ciphertext[gcm.NonceSize():], nil)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Decrypted: %s\n", decrypted)
}
```

### 10. `crypto/rsa` 包

`rsa` 包实现了RSA加密算法。

**方法**：

- **`rsa.GenerateKey(random io.Reader, bits int) (*rsa.PrivateKey, error)`**: 生成一个RSA私钥。
- **`rsa.EncryptOAEP(hash hash.Hash, random io.Reader, pub *rsa.PublicKey, msg []byte, label []byte) ([]byte, error)`**: 使用OAEP模式加密消息。
- **`rsa.DecryptOAEP(hash hash.Hash, random io.Reader, priv *rsa.PrivateKey, ciphertext []byte, label []byte) ([]byte, error)`**: 使用OAEP模式解密消息。

**示例**：

```go
package main

import (
    "crypto/rand"
    "crypto/rsa"
    "crypto/sha256"
    "fmt"
)



func main() {
    // 生成密钥对
    privKey, err := rsa.GenerateKey(rand.Reader, 2048)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    pubKey := &privKey.PublicKey

    // 加密
    message := []byte("Hello, RSA!")
    hash := sha256.New()
    ciphertext, err := rsa.EncryptOAEP(hash, rand.Reader, pubKey, message, nil)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Ciphertext: %x\n", ciphertext)

    // 解密
    decryptedMessage, err := rsa.DecryptOAEP(hash, rand.Reader, privKey, ciphertext, nil)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Decrypted: %s\n", decryptedMessage)
}
```

### 11. `crypto/ecdsa` 包

`ecdsa` 包实现了椭圆曲线数字签名算法（ECDSA）。

**方法**：

- **`ecdsa.GenerateKey(c elliptic.Curve, rand io.Reader) (*ecdsa.PrivateKey, error)`**: 生成一个ECDSA私钥。
- **`ecdsa.Sign(rand io.Reader, priv *ecdsa.PrivateKey, hash []byte) (r, s *big.Int, err error)`**: 对消息进行签名。
- **`ecdsa.Verify(pub *ecdsa.PublicKey, hash []byte, r, s *big.Int) bool`**: 验证签名。

**示例**：

```go
package main

import (
    "crypto/ecdsa"
    "crypto/elliptic"
    "crypto/rand"
    "crypto/sha256"
    "fmt"
    "math/big"
)

func main() {
    // 生成密钥对
    privKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    pubKey := &privKey.PublicKey

    // 对消息进行哈希
    message := []byte("Hello, ECDSA!")
    hash := sha256.Sum256(message)

    // 签名
    r, s, err := ecdsa.Sign(rand.Reader, privKey, hash[:])
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Signature: (r: %s, s: %s)\n", r, s)

    // 验证签名
    valid := ecdsa.Verify(pubKey, hash[:], r, s)
    fmt.Println("Signature valid:", valid)
}
```

### 12. `crypto/elliptic` 包

`elliptic` 包实现了用于ECDSA的椭圆曲线。

**方法**：

- **`elliptic.P256()`**: 返回P-256椭圆曲线。
- **`elliptic.P384()`**: 返回P-384椭圆曲线。
- **`elliptic.P521()`**: 返回P-521椭圆曲线。

**示例**：

```go
package main

import (
    "crypto/elliptic"
    "fmt"
)

func main() {
    curve := elliptic.P256()
    fmt.Println("Curve:", curve.Params().Name)
}
```

### 13. 总结

Go语言的 `crypto` 包及其子包提供了广泛的密码学功能，包括哈希算法、对称和非对称加密、消息认证码、数字签名等。熟练掌握这些包的使用，可以帮助你在Go中实现安全和高效的加密方案。在实际应用中，合理选择和组合这些包，可以帮助你构建可靠和安全的应用程序。