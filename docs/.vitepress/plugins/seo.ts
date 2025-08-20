import type { HeadConfig, TransformContext } from 'vitepress'

export interface SEOConfig {
  // 网站基础信息
  siteName: string
  siteUrl: string
  siteDescription: string
  author: string
  lang?: string

  // SEO 配置
  keywords?: string[]
  ogImage?: string
  twitterHandle?: string
  favicon?: {
    ico?: string
    png32?: string
    png16?: string
    appleTouchIcon?: string
    manifest?: string
  }

  // 社交媒体
  social?: {
    weibo?: string
    bilibili?: string
    github?: string
    twitter?: string
  }

  // 分析工具
  analytics?: {
    baidu?: string
    google?: string
    gtm?: string
    vercel?: boolean
    vercelInsights?: boolean
  }

  // 站长验证
  verification?: {
    baidu?: string
    google?: string
    bing?: string
    yandex?: string
    so360?: string
  }

  // 推广配置（针对流量卡等推广站点）
  promotion?: {
    keywords?: string[]
    conversion?: {
      trackingId?: string
      events?: string[]
    }
  }

  // 结构化数据
  structuredData?: {
    organization?: any
    website?: any
    breadcrumb?: boolean
    article?: boolean
  }
}

export class VitePressSEO {
  private config: SEOConfig

  constructor(config: SEOConfig) {
    this.config = {
      lang: 'zh-CN',
      keywords: [],
      ...config
    }
  }

  // 生成基础 Head 配置
  generateBaseHead(): HeadConfig[] {
    const head: HeadConfig[] = []

    // 基础 Meta
    head.push(['meta', { charset: 'utf-8' }])
    head.push(['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }])
    head.push(['meta', { name: 'description', content: this.config.siteDescription }])
    head.push(['meta', { name: 'author', content: this.config.author }])

    // 关键词
    if (this.config.keywords?.length) {
      head.push(['meta', { name: 'keywords', content: this.config.keywords.join(',') }])
    }

    // 推广关键词
    if (this.config.promotion?.keywords?.length) {
      const allKeywords = [...(this.config.keywords || []), ...this.config.promotion.keywords]
      head.push(['meta', { name: 'keywords', content: allKeywords.join(',') }])
    }

    // Favicon
    if (this.config.favicon) {
      const { ico, png32, png16, appleTouchIcon, manifest } = this.config.favicon
      if (ico) head.push(['link', { rel: 'icon', type: 'image/x-icon', href: ico }])
      if (png32) head.push(['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: png32 }])
      if (png16) head.push(['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: png16 }])
      if (appleTouchIcon) head.push(['link', { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIcon }])
      if (manifest) head.push(['link', { rel: 'manifest', href: manifest }])
    }

    return head
  }

  // 生成 Open Graph 配置
  generateOpenGraph(pageTitle?: string, pageDescription?: string, pagePath?: string): HeadConfig[] {
    const head: HeadConfig[] = []
    const title = pageTitle ? `${pageTitle} - ${this.config.siteName}` : this.config.siteName
    const description = pageDescription || this.config.siteDescription
    const url = pagePath ? `${this.config.siteUrl}${pagePath}` : this.config.siteUrl

    head.push(['meta', { property: 'og:type', content: 'website' }])
    head.push(['meta', { property: 'og:title', content: title }])
    head.push(['meta', { property: 'og:description', content: description }])
    head.push(['meta', { property: 'og:url', content: url }])
    head.push(['meta', { property: 'og:site_name', content: this.config.siteName }])
    head.push(['meta', { property: 'og:locale', content: this.config.lang || 'zh_CN' }])

    if (this.config.ogImage) {
      const imageUrl = this.config.ogImage.startsWith('http')
        ? this.config.ogImage
        : `${this.config.siteUrl}${this.config.ogImage}`

      head.push(['meta', { property: 'og:image', content: imageUrl }])
      head.push(['meta', { property: 'og:image:width', content: '1200' }])
      head.push(['meta', { property: 'og:image:height', content: '630' }])
      head.push(['meta', { property: 'og:image:alt', content: title }])
    }

    return head
  }

  // 生成 Twitter Card 配置
  generateTwitterCard(pageTitle?: string, pageDescription?: string): HeadConfig[] {
    const head: HeadConfig[] = []
    const title = pageTitle ? `${pageTitle} - ${this.config.siteName}` : this.config.siteName
    const description = pageDescription || this.config.siteDescription

    head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    head.push(['meta', { name: 'twitter:title', content: title }])
    head.push(['meta', { name: 'twitter:description', content: description }])

    if (this.config.twitterHandle) {
      head.push(['meta', { name: 'twitter:site', content: this.config.twitterHandle }])
      head.push(['meta', { name: 'twitter:creator', content: this.config.twitterHandle }])
    }

    if (this.config.ogImage) {
      const imageUrl = this.config.ogImage.startsWith('http')
        ? this.config.ogImage
        : `${this.config.siteUrl}${this.config.ogImage}`
      head.push(['meta', { name: 'twitter:image', content: imageUrl }])
    }

    return head
  }

  // 生成结构化数据
  generateStructuredData(): HeadConfig[] {
    const head: HeadConfig[] = []

    if (!this.config.structuredData) return head

    // 组织信息
    if (this.config.structuredData.organization) {
      const orgData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: this.config.siteName,
        url: this.config.siteUrl,
        description: this.config.siteDescription,
        ...this.config.structuredData.organization
      }

      if (this.config.social) {
        orgData.sameAs = Object.values(this.config.social).filter(Boolean)
      }

      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(orgData)])
    }

    // 网站搜索
    if (this.config.structuredData.website) {
      const websiteData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: this.config.siteName,
        url: this.config.siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${this.config.siteUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        },
        ...this.config.structuredData.website
      }

      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(websiteData)])
    }

    return head
  }

  // 生成分析工具配置
  generateAnalytics(): HeadConfig[] {
    const head: HeadConfig[] = []

    if (!this.config.analytics) return head

    // 百度统计
    if (this.config.analytics.baidu) {
      head.push([
        'script',
        { async: '', defer: '' },
        `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?${this.config.analytics.baidu}";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();`
      ])
    }

    // Google Analytics 4(Google tag (gtag.js))
    if (this.config.analytics.google) {
      head.push(['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${this.config.analytics.google}` }])
      head.push([
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${this.config.analytics.google}');`
      ])
    }

    // Google Tag Manager
    if (this.config.analytics.gtm) {
      head.push([
        'script',
        { async: '', defer: '' },
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${this.config.analytics.gtm}');`
      ])
    }

    // Vercel Analytics
    if (this.config.analytics.vercel) {
      head.push(['script', {}, `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`])
      head.push(['script', { defer: '', src: '/_vercel/insights/script.js' }])
    }

    // Vercel Speed Analytics
    if (this.config.analytics.vercelInsights) {
      head.push(['script', {}, `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`])
      head.push(['script', { defer: '', src: '/_vercel/speed-insights/script.js' }])
    }

    return head
  }

  // 生成站长验证配置
  generateVerification(): HeadConfig[] {
    const head: HeadConfig[] = []

    if (!this.config.verification) return head

    const verifications = [
      { name: 'baidu-site-verification', key: 'baidu' },
      { name: 'google-site-verification', key: 'google' },
      { name: 'msvalidate.01', key: 'bing' },
      { name: 'yandex-verification', key: 'yandex' },
      { name: '360-site-verification', key: 'so360' }
    ]

    verifications.forEach(({ name, key }) => {
      const value = this.config.verification![key as keyof typeof this.config.verification]
      if (value) {
        head.push(['meta', { name, content: value }])
      }
    })

    return head
  }

  // 生成推广相关配置
  generatePromotionConfig(): HeadConfig[] {
    const head: HeadConfig[] = []

    if (!this.config.promotion) return head

    // 转化追踪
    head.push([
      'script',
      {},
      ``
    ])

    return head
  }

  // 生成性能优化配置
  generatePerformanceConfig(): HeadConfig[] {
    const head: HeadConfig[] = []

    // DNS 预解析和预连接
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://hm.baidu.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com'
    ]

    preconnectDomains.forEach(domain => {
      head.push(['link', { rel: 'preconnect', href: domain }])
    })

    // SEO 相关预解析
    head.push(['meta', { 'http-equiv': 'x-dns-prefetch-control', content: 'on' }])
    head.push(['link', { rel: 'dns-prefetch', href: 'https://www.google.com' }])
    head.push(['link', { rel: 'dns-prefetch', href: 'https://www.baidu.com' }])

    // 移动端优化
    head.push(['meta', { name: 'format-detection', content: 'telephone=yes, email=yes' }])
    head.push(['meta', { name: 'mobile-web-app-capable', content: 'yes' }])
    head.push(['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }])
    head.push(['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }])
    head.push(['meta', { name: 'apple-mobile-web-app-title', content: this.config.siteName }])

    return head
  }

  // 生成全局控制图片放大交互
  generateImageZoom(): HeadConfig[] {
    const head: HeadConfig[] = []
    head.push(['link', { rel: 'stylesheet', href: '/static/css/fancybox.css' }])
    head.push(['script', { src: '/static/js/fancybox.umd.js' }])
    return head
  }

  // 生成完整的 Head 配置
  generateHead(pageContext?: { title?: string; description?: string; path?: string }): HeadConfig[] {
    return [
      ...this.generateBaseHead(),
      ...this.generateOpenGraph(pageContext?.title, pageContext?.description, pageContext?.path),
      ...this.generateTwitterCard(pageContext?.title, pageContext?.description),
      ...this.generateStructuredData(),
      ...this.generateVerification(),
      ...this.generatePerformanceConfig(),
      ...this.generateAnalytics(),
      ...this.generatePromotionConfig(),
      ...this.generateImageZoom()
    ]
  }

  // VitePress 插件接口
  vitepressPlugin() {
    return {
      name: 'vitepress-seo',
      configureServer(server: any) {
        // 开发环境配置
      },
      transformHead: (ctx: TransformContext) => {
        return this.generateHead({
          title: ctx.pageData.title,
          description: ctx.pageData.description,
          path: ctx.pageData.relativePath.replace(/\.md$/, '.html')
        })
      }
    }
  }
}

// 导出便捷函数
export function createSEOPlugin(config: SEOConfig) {
  return new VitePressSEO(config)
}
