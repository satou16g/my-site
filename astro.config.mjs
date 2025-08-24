import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap'
import yaml from '@rollup/plugin-yaml'
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import {remarkModifiedTime} from './src/plugins/remark-modified-time.mjs'
import remarkPanGu from 'remark-pangu'
import UnoCSS from 'unocss/astro'
import expressiveCode from 'astro-expressive-code'
import {ExpressiveCodeTheme} from '@expressive-code/core'
import {readFileSync} from 'fs'
import {parse} from 'jsonc-parser'
import remarkDirective from "remark-directive";
import {RDNotePlugin, RDBilibiliPlugin} from "./src/plugins/remark-directive.mjs";
import {PandaConfig} from "./src/config.js";

const nightOwlDark = new ExpressiveCodeTheme(
    parse(readFileSync('./src/styles/expressive-code/night-owl-dark.jsonc', 'utf-8'))
)
const nightOwlLight = new ExpressiveCodeTheme(
    parse(readFileSync('./src/styles/expressive-code/night-owl-light.jsonc', 'utf-8'))
)




const {site, defaultLocale} = PandaConfig
// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [yaml()],
    },
    prefetch: true,
    site,
    scopedStyleStrategy: 'class',
    trailingSlash: 'always',
    build: {
        format: 'directory'
    },
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [remarkDirective, RDNotePlugin, RDBilibiliPlugin, remarkModifiedTime],
        remarkRehype: {
            footnoteLabel: ' '
        }
    },
    integrations: [
        UnoCSS(),
        sitemap(),
        expressiveCode({
            themes: [nightOwlDark, nightOwlLight],
            // デフォルトテーマを 'nightOwlLight' に設定
            defaultTheme: 'nightOwlLight',
            // CSSセレクタをテーマのタイプ（light/dark）に合わせる
            themeCssSelector: (theme) => {
                // nightOwlLight のタイプは 'light'
                return `[data-theme='${theme.type}']`
            }
        }),
        mdx(),
        partytown()
    ],
    output: 'static',
    // 画像処理の設定
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp',
        },
    }
    i18n: {
        defaultLocale: 'ja', // ★ ここを 'ja' に変更
        locales: ['ja', 'en'], // ★ 優先順位を考慮して 'ja' を先頭に
        routing: {
          prefixDefaultLocale: false,
        },
      },
})
