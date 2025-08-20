//模板配置文件
import { defineConfig } from 'vitepress'
import { genFeed } from './theme/genFeed'
import { head } from './theme/head'
import type { ThemeConfig } from './theme/types'
import mdItCustomAttrs from 'markdown-it-custom-attrs'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'
import { themeConfig } from './theme/config'

export default defineConfig<ThemeConfig>({
  lang: 'zh-cn',
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': 'gallery'
      })
    }
  },
  title: '爱号卡',
  base: '/',
  head,
  description: '爱号卡 - 基于 VitePress 打造的流量卡推广与分享平台，支持图文介绍、优惠套餐展示、在线申请与推广分销，帮助用户快速选择合适的流量卡方案。',
  ignoreDeadLinks: true,
  themeConfig: themeConfig,
  srcExclude: ['README.md'],
  vite: {
    server: {
      port: 5000,
      host: '0.0.0.0'
    },
    plugins: [
      pagefindPlugin({
        //使用 pagefind搜索插件 https://www.npmjs.com/package/vitepress-plugin-pagefind
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: '搜索文档',
        placeholder: '搜索文档',
        emptyText: '没有内容',
        heading: '共 {{searchResult}} 条结果'
      })
    ]
  },
  buildEnd: genFeed
})
