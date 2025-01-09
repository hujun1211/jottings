const markdownText = `
---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

\`\`\`ts
import js from '@shikijs/langs/javascript'
import nord from '@shikijs/themes/nord'
import { createHighlighterCoreSync } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

// 在之前某个地方加载
const engine = await createOnigurumaEngine(import('shiki/wasm'))

const shiki = createHighlighterCoreSync({
  themes: [nord],
  langs: [js],
  engine, // 如果传入已解析的引擎，其他部分仍然可以同步执行。
})

const html = shiki.highlight('console.log(1)', { lang: 'js', theme: 'nord' })
\`\`\`

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules
`

export {
  markdownText,
}
