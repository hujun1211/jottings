import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'
import markdownit from 'markdown-it'
import { codeToHtml, createHighlighter } from 'shiki'
import { markdownText } from './markdown'
import 'github-markdown-css'
import './shiki.css'

export default async function Page() {
  const highlighter = await createHighlighter({
    themes: ['vitesse-light', 'vitesse-dark'],
    langs: ['ts'],
  })
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code, lang) => {
      if (!lang) {
        return code
      }
      return highlighter.codeToHtml(code, {
        lang,
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        },
        transformers: [
          transformerNotationHighlight(),
          transformerNotationDiff(),
        ],
      })
    },
  })

  const code = md.render(markdownText)

  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: code }} />
  )
}
