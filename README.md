Fasterviewのアンケート埋め込みで利用できるSDKです。  

## インストール

```bash
npm install fasterview-sdk
```

## 使い方

### React

```tsx
import { Embed } from 'fasterview-sdk/react';

function App() {
  return (
    <Embed id="recruitmentId" />
  )
}
```

### Vue

```vue
<script setup lang="ts">
import Embed from 'fasterview-sdk/vue';
</script>

<template>
  <Embed id="recruitmentId" />
</template>
```

### Web

```js
import { embed } from 'fasterview-sdk/web';

embed({ id: 'recruitmentId' });
```
