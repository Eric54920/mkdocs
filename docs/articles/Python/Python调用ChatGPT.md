要在 Python 中调用 ChatGPT API，您可以使用 OpenAI 提供的 Python 客户端库 `openai`。以下是如何设置和使用 ChatGPT API 的详细步骤：

### 1. 安装 OpenAI 客户端库

首先，确保您已经安装了 OpenAI 的 Python 客户端库。可以使用 `pip` 进行安装：

```bash
pip install openai
```

### 2. 设置 OpenAI API 密钥

您需要在 OpenAI 平台上获得 API 密钥，并将其用于身份验证。将您的 API 密钥保存在环境变量中，或者在代码中直接使用（不推荐在生产环境中这样做）。

### 3. 调用 ChatGPT API

以下是一个示例代码，展示了如何使用 OpenAI 的 Python 客户端库调用 ChatGPT API：

```python
import openai

# 设置 OpenAI API 密钥
openai.api_key = 'your-api-key-here'

# 定义调用 ChatGPT 的函数
def chat_with_gpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # 或者使用其他模型，例如 "gpt-4"
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message['content']

# 示例使用
prompt = "告诉我关于Python的基本信息。"
response = chat_with_gpt(prompt)
print(response)
```

### 4. 示例解释

- **导入库**：首先导入 `openai` 库。
- **设置 API 密钥**：将您的 OpenAI API 密钥赋值给 `openai.api_key`。
- **定义函数**：`chat_with_gpt` 函数接收用户输入的 `prompt`，并使用 `openai.ChatCompletion.create` 调用 API。
  - `model` 参数指定使用的模型，例如 `"gpt-3.5-turbo"` 或 `"gpt-4"`.
  - `messages` 参数包含对话的上下文。`role` 可以是 `system`、`user` 或 `assistant`，分别表示系统设置、用户输入和助手回复。
- **示例使用**：定义了一个示例提示 `prompt` 并调用 `chat_with_gpt` 函数，然后打印返回的结果。

### 注意事项

1. **API 密钥安全**：不要在代码中直接硬编码 API 密钥，尤其是在共享或公开的代码库中。使用环境变量或其他安全存储方式。
2. **API 使用限制**：确保您了解并遵守 OpenAI 的使用限制和配额，以避免超出使用限额。

### 5. 使用环境变量存储 API 密钥

为了更安全地存储 API 密钥，建议使用环境变量。以下是如何在代码中使用环境变量存储和读取 API 密钥的示例：

1. **设置环境变量**：
   - 在 Linux/macOS 上，您可以将 API 密钥添加到 `~/.bashrc` 或 `~/.zshrc` 文件：
     ```bash
     export OPENAI_API_KEY='your-api-key-here'
     ```
   - 在 Windows 上，您可以使用命令提示符设置环境变量：
     ```cmd
     setx OPENAI_API_KEY "your-api-key-here"
     ```

2. **在 Python 代码中读取环境变量**：

```python
import os
import openai

# 从环境变量中读取 API 密钥
openai.api_key = os.getenv('OPENAI_API_KEY')

def chat_with_gpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message['content']

prompt = "告诉我关于Python的基本信息。"
response = chat_with_gpt(prompt)
print(response)
```

通过这种方式，您可以确保 API 密钥的安全性，同时保持代码的清洁和可维护性。