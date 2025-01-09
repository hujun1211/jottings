import Shiki from '@shikijs/markdown-it'
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'
import markdownit from 'markdown-it'
import { markdownText } from './markdown'
import 'github-markdown-css'
import './shiki.css'

export default async function Page() {
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
  }).use(await Shiki({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
    ],
  }))

  const code = md.render(markdownText)

  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: code }} />
  )
}
