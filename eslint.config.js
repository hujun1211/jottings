import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import ReactCompiler from 'eslint-plugin-react-compiler'
import tailwindcss from 'eslint-plugin-tailwindcss'

const compat = new FlatCompat({
  // 基准目录：当前文件所在目录
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

export default antfu(
  {
    ignores: ['supabase/*', 'src/shadcn/*', 'src/types/types_db.ts'],
    plugins: {
      'react-compiler': ReactCompiler,
    },
    formatters: true,
    react: true,
    rules: {
      'curly': ['error', 'all'], // 要求使用大括号
      'no-console': 'warn', // console
      'sort-imports': 'off', // import排序
      'n/prefer-global/process': 'off', // 取消process警告
      'style/jsx-max-props-per-line': [1, { maximum: 3 }], // jsx一行最多3个属性
      'react-compiler/react-compiler': 'error', // react compiler

      // i18n 导航
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `@/i18n/routing` instead.',
        },
        {
          name: 'next/navigation',
          importNames: ['redirect', 'permanentRedirect', 'useRouter', 'usePathname'],
          message: 'Please import from `@/i18n/routing` instead.',
        },
      ],
    },
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
  },
  // tailwind
  ...tailwindcss.configs['flat/recommended'],
  // nextjs
  ...compat.config({
    extends: ['plugin:@next/next/recommended'],
  }),
)
