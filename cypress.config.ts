import pkg from '@next/env'
import { defineConfig } from 'cypress'

const { loadEnvConfig } = pkg
const { combinedEnv } = loadEnvConfig(process.cwd(), true)

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      ...combinedEnv,
    },
    baseUrl: combinedEnv.NEXT_PUBLIC_SITE_URL,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
