//模板配置文件
import { defineConfig } from 'vitepress'
import { genFeed } from './theme/genFeed'
import type { ThemeConfig } from './theme/types'
import mdItCustomAttrs from 'markdown-it-custom-attrs'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'
import { themeConfig } from './theme/config'
import { createSEOPlugin } from './plugins/seo'
import { createPWAPlugin } from './plugins/pwa'

// SEO 插件配置
const seoPlugin = createSEOPlugin({
  // 基础站点信息
  siteName: '爱号卡',
  siteUrl: 'https://hk.aiyvyang.top',
  siteDescription: '专业的手机流量卡推荐平台，为用户提供最优质、最便宜的流量卡选择方案',
  author: '爱宇阳',
  lang: 'zh_CN',

  // 基础SEO关键词
  keywords: ['流量卡', '手机流量卡', '便宜流量卡', '无限流量卡', '流量卡办理', '手机卡', '电话卡', '上网卡'],

  // 图标配置
  favicon: {
    ico: '/icons/favicon.ico',
    png32: '/icons/favicon-32x32.png',
    png16: '/icons/favicon-16x16.png',
    appleTouchIcon: '/icons/apple-icon-180.png',
    manifest: '/manifest.webmanifest'
  },

  // 社交分享图片
  ogImage: '/icons/logo.png',
  twitterHandle: '@aiyvyang',

  // 社交媒体链接
  social: {
    weibo: 'https://weibo.com/thedanyang',
    bilibili: 'https://space.bilibili.com/335600106',
    github: 'https://github.com/aiyvyang'
  },

  // 分析工具配置
  analytics: {
    baidu: 'c8bab594a320d3a6fceb06c5c6f67acc',
    google: 'G-F232JFK99T',
    gtm: 'GTM-NK2T793R',
    vercel: true
  },

  // 站长验证码
  verification: {
    baidu: 'codeva-xt38s7l3mn',
    google: '',
    bing: '25CF9BABEF760A9C07BA79C5089F3E4F',
    yandex: '83ec33d4282bbcc2',
    so360: 'a4ec10a1f93883d5fc61e4215e93d214',
    sougou: 'xmgTajDyqL',
    shenma: '3c30193fc3bf52dcc4fe98469edb96a7_1755676794'
  },

  // 推广专项配置（流量卡推广重点）
  promotion: {
    // 推广专用关键词
    keywords: [
      '移动流量卡',
      '联通流量卡',
      '电信流量卡',
      '物联网卡',
      '流量卡推荐',
      '流量卡比较',
      '流量卡评测',
      '流量卡优惠',
      '月租便宜流量卡',
      '大流量卡',
      '不限速流量卡'
    ],

    // 转化追踪
    conversion: {
      trackingId: 'conversion-tracker-001',
      events: ['apply_card', 'consult_service', 'download_app']
    }
  },

  // 结构化数据
  structuredData: {
    organization: {
      logo: 'https://hk.aiyvyang.top/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '17633331204',
        contactType: '客服中心',
        availableLanguage: 'Chinese'
      }
    },
    website: {
      author: {
        '@type': 'Organization',
        name: '爱号卡'
      }
    },
    breadcrumb: true,
    article: true
  }
})

export default defineConfig<ThemeConfig>({
  base: '/',
  title: '爱号卡',
  description: '爱号卡 - 基于 VitePress 打造的流量卡推广与分享平台，支持图文介绍、优惠套餐展示、在线申请与推广分销，帮助用户快速选择合适的流量卡方案。',

  // 使用 SEO 插件生成的 head 配置
  head: seoPlugin.generateHead(),

  // 站点配置
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  // 主题配置
  themeConfig: themeConfig,
  srcExclude: ['README.md'],

  vite: {
    plugins: [
      pagefindPlugin({
        //使用 pagefind搜索插件 https://www.npmjs.com/package/vitepress-plugin-pagefind
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: '搜索文档',
        placeholder: '搜索文档',
        emptyText: '没有内容',
        heading: '共 {{searchResult}} 条结果'
      }),
      createPWAPlugin()
    ],
    server: {
      port: 5000,
      host: '0.0.0.0'
    }
  },
  buildEnd: genFeed,

  // 转换钩子
  transformHead: ({ pageData, siteData }) => {
    // 页面级别的 head 配置
    const pageHead = seoPlugin.generateHead({
      title: pageData.title,
      description: pageData.description || pageData.frontmatter?.description,
      path: pageData.relativePath.replace(/\.md$/, '.html')
    })

    // 特殊页面的额外配置
    if (pageData.relativePath.includes('recommend/')) {
      pageHead.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: pageData.title,
          description: pageData.description,
          category: '流量卡',
          brand: {
            '@type': 'Brand',
            name: '爱号卡'
          }
        })
      ])
    }

    return pageHead
  },

  // 站点地图配置
  sitemap: {
    hostname: 'https://hk.aiyvyang.top',
    transformItems: (items) => {
      // 自定义站点地图项
      return items.map((item) => ({
        ...item,
        changefreq: 'daily',
        priority: item.url === '/' ? 1.0 : 0.8
      }))
    }
  },

  // Markdown 配置
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': 'gallery'
      })
    }
  }
})
