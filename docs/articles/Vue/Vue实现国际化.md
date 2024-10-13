---
comments: true
---

在 Vue 3 中使用 TypeScript 实现国际化（i18n）可以结合 `vue-i18n` 插件来进行配置。`vue-i18n` 提供了完善的国际化支持，并且与 TypeScript 兼容，确保在开发中可以获得类型安全的提示。

### 1. 安装 `vue-i18n`

首先，使用 npm 或 yarn 安装 `vue-i18n`：

```bash
npm install vue-i18n
```

或者使用 yarn：

```bash
yarn add vue-i18n
```

### 2. 项目结构

你可以将不同语言的翻译文本存储在单独的文件中，常见的项目结构如下：

```
src/
├── locales/
│   ├── en.json
│   ├── zh.json
├── App.vue
├── main.ts
└── i18n.ts
```

### 3. 创建 i18n 配置文件

为了更好地管理 i18n 配置，可以单独创建一个文件 `i18n.ts`，在这个文件中初始化和配置 `vue-i18n`。

#### 3.1 `i18n.ts`

```typescript
import { createI18n } from 'vue-i18n';

// 导入语言文件
import en from './locales/en.json';
import zh from './locales/zh.json';

// 配置 i18n 实例并导出
const i18n = createI18n({
  legacy: false, // 使用 Composition API 的方式
  locale: 'en',  // 设置默认语言
  fallbackLocale: 'en',  // 当语言不存在时回退到指定的语言
  globalInjection: true, // 全局模式使用 $t 函数
  messages: {
    en,
    zh
  }
});

export default i18n;
```

### 4. 配置 `main.ts`

在 `main.ts` 中引入 `i18n`，并将其添加到 Vue 应用中。

#### 4.1 `main.ts`

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n'; // 引入 i18n 配置

const app = createApp(App);

// 使用 i18n
app.use(i18n);

app.mount('#app');
```

### 5. 创建翻译文件

在 `src/locales/` 目录下创建不同语言的翻译文件。我们可以使用 JSON 文件来存储每种语言的翻译字符串。

#### 5.1 `en.json` (英语)

```json
{
  "welcomeMessage": "Welcome to our application!",
  "language": "Language"
}
```

#### 5.2 `zh.json` (中文)

```json
{
  "welcomeMessage": "欢迎使用我们的应用！",
  "language": "语言"
}
```

### 6. 在组件中使用国际化

在 Vue 组件中，使用 `$t` 函数来访问翻译文本。

#### 6.1 `App.vue`

```vue
<template>
  <div>
    <h1>{{ $t('welcomeMessage') }}</h1>
    <select v-model="currentLang" @change="changeLanguage">
      <option value="en">{{ $t('language') }}: English</option>
      <option value="zh">{{ $t('language') }}: 中文</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { t, locale } = useI18n(); // 使用 Composition API
    const currentLang = locale.value;

    // 切换语言
    const changeLanguage = (event: Event) => {
      locale.value = (event.target as HTMLSelectElement).value;
    };

    return {
      t,
      currentLang,
      changeLanguage,
    };
  }
});
</script>
```

### 7. 使用 TypeScript 类型提示

通过 TypeScript，你可以为翻译文本添加类型定义，避免因为拼写错误而引发的错误。可以通过为 JSON 翻译文件创建类型来实现这一点。

```typescript
import { createI18n } from 'vue-i18n';
import { MessageSchema } from './locales/i18n.d.ts'; // 导入类型定义

import en from './locales/en.json';
import zh from './locales/zh.json';

// 设置语言类型，这里使用 Record<string, string> 来支持动态键值对
type MessageSchema = typeof en;

const i18n = createI18n<MessageSchema>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
});

export default i18n;
```

现在，Vue 的 `t` 函数将会有类型检查，并根据 `MessageSchema` 类型提供自动补全。

### 8. 其他高级功能

#### 8.1 动态加载语言

如果你的项目支持很多语言，可能需要懒加载语言文件。可以使用 `import` 动态导入语言文件。

```typescript
const loadLanguageAsync = async (lang: string) => {
  if (!i18n.global.availableLocales.includes(lang)) {
    const messages = await import(`./locales/${lang}.json`);
    i18n.global.setLocaleMessage(lang, messages.default);
  }
  i18n.global.locale.value = lang;
};
```

#### 8.2 持久化用户语言选择

你可以将用户的语言选择存储在 `localStorage` 中，下次用户访问时自动恢复之前的语言选择。

```typescript
// main.ts
const savedLocale = localStorage.getItem('locale') || 'en';

const i18n = createI18n({
  locale: savedLocale,  // 使用 localStorage 中保存的语言
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
});

app.use(i18n);

// App.vue
const changeLanguage = (event: Event) => {
  const lang = (event.target as HTMLSelectElement).value;
  i18n.global.locale.value = lang;
  localStorage.setItem('locale', lang);  // 保存选择的语言
};
```

### 9. 总结

通过 `vue-i18n` 和 TypeScript，你可以在 Vue 3 应用中轻松实现国际化功能。我们通过以下步骤实现了多语言支持：
- 安装并配置 `vue-i18n`。
- 使用 JSON 文件来管理不同语言的翻译。
- 在 Vue 组件中使用 `$t` 函数动态获取翻译内容。
- 使用 TypeScript 提供类型安全的翻译管理。
- 实现了动态语言切换和用户语言持久化。

这样可以确保应用更易于维护和扩展，同时为用户提供更好的国际化体验。
