import type { HeadConfig } from 'vitepress'

// SEO 元数据接口
export interface PageSEO {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
  schema?: any
}

// 页面 SEO 工具类
export class PageSEOHelper {

  // 生成页面特定的 head 配置
  static generatePageHead(seo: PageSEO): HeadConfig[] {
    const head: HeadConfig[] = []

    // 标题
    if (seo.title) {
      head.push(['title', {}, seo.title])
      head.push(['meta', { property: 'og:title', content: seo.title }])
      head.push(['meta', { name: 'twitter:title', content: seo.title }])
    }

    // 描述
    if (seo.description) {
      head.push(['meta', { name: 'description', content: seo.description }])
      head.push(['meta', { property: 'og:description', content: seo.description }])
      head.push(['meta', { name: 'twitter:description', content: seo.description }])
    }

    // 关键词
    if (seo.keywords?.length) {
      head.push(['meta', { name: 'keywords', content: seo.keywords.join(',') }])
    }

    // 自定义 OG 图片
    if (seo.ogImage) {
      head.push(['meta', { property: 'og:image', content: seo.ogImage }])
      head.push(['meta', { name: 'twitter:image', content: seo.ogImage }])
    }

    // 规范链接
    if (seo.canonical) {
      head.push(['link', { rel: 'canonical', href: seo.canonical }])
    }

    // 不索引标记
    if (seo.noindex) {
      head.push(['meta', { name: 'robots', content: 'noindex, nofollow' }])
    }

    // 结构化数据
    if (seo.schema) {
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(seo.schema)])
    }

    return head
  }

  // 为流量卡页面生成专用 Schema
  static generateTrafficCardSchema(cardInfo: {
    name: string
    provider: string
    price: number
    dataAmount: string
    validity: string
    features: string[]
    rating?: number
    reviewCount?: number
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: cardInfo.name,
      description: `${cardInfo.provider}推出的${cardInfo.name}，${cardInfo.dataAmount}流量，月租${cardInfo.price}元`,
      brand: {
        '@type': 'Brand',
        name: cardInfo.provider
      },
      category: '通信服务',
      offers: {
        '@type': 'Offer',
        price: cardInfo.price,
        priceCurrency: 'CNY',
        availability: 'https://schema.org/InStock',
        validThrough: cardInfo.validity
      },
      aggregateRating: cardInfo.rating && cardInfo.reviewCount ? {
        '@type': 'AggregateRating',
        ratingValue: cardInfo.rating,
        reviewCount: cardInfo.reviewCount,
        bestRating: 5,
        worstRating: 1
      } : undefined,
      additionalProperty: cardInfo.features.map(feature => ({
        '@type': 'PropertyValue',
        name: 'feature',
        value: feature
      }))
    }
  }

  // 生成面包屑导航 Schema
  static generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    }
  }

  // 生成文章 Schema
  static generateArticleSchema(article: {
    title: string
    description: string
    author: string
    publishDate: string
    modifiedDate?: string
    image?: string
    url: string
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      author: {
        '@type': 'Person',
        name: article.author
      },
      datePublished: article.publishDate,
      dateModified: article.modifiedDate || article.publishDate,
      image: article.image,
      url: article.url,
      publisher: {
        '@type': 'Organization',
        name: '爱号卡',
        logo: {
          '@type': 'ImageObject',
          url: 'https://your-domain.com/logo.png'
        }
      }
    }
  }
}

// Frontmatter SEO 处理器
export class FrontmatterSEOProcessor {

  // 从 frontmatter 生成 SEO 配置
  static processFrontmatter(frontmatter: any, defaultSiteInfo: any): PageSEO {
    const seo: PageSEO = {}

    // 标题处理
    if (frontmatter.title) {
      seo.title = frontmatter.seoTitle ||
        `${frontmatter.title} - ${defaultSiteInfo.siteName}`
    }

    // 描述处理
    seo.description = frontmatter.description ||
      frontmatter.seoDescription ||
      defaultSiteInfo.siteDescription

    // 关键词处理
    if (frontmatter.keywords) {
      seo.keywords = Array.isArray(frontmatter.keywords)
        ? frontmatter.keywords
        : frontmatter.keywords.split(',').map((k: string) => k.trim())
    }

    // 自定义图片
    if (frontmatter.ogImage) {
      seo.ogImage = frontmatter.ogImage.startsWith('http')
        ? frontmatter.ogImage
        : `${defaultSiteInfo.siteUrl}${frontmatter.ogImage}`
    }

    // 规范链接
    if (frontmatter.canonical) {
      seo.canonical = frontmatter.canonical
    }

    // 索引控制
    if (frontmatter.noindex) {
      seo.noindex = true
    }

    // 流量卡特殊处理
    if (frontmatter.cardInfo) {
      seo.schema = PageSEOHelper.generateTrafficCardSchema(frontmatter.cardInfo)
    }

    // 文章特殊处理
    if (frontmatter.type === 'article') {
      seo.schema = PageSEOHelper.generateArticleSchema({
        title: frontmatter.title,
        description: seo.description!,
        author: frontmatter.author || defaultSiteInfo.author,
        publishDate: frontmatter.date,
        modifiedDate: frontmatter.lastUpdated,
        image: seo.ogImage,
        url: `${defaultSiteInfo.siteUrl}/${frontmatter.permalink || ''}`
      })
    }

    return seo
  }
}

// SEO 检查工具
export class SEOChecker {

  // 检查页面 SEO 质量
  static checkPageSEO(pageData: any): {score: number, issues: string[], suggestions: string[]} {
    const issues: string[] = []
    const suggestions: string[] = []
    let score = 100

    // 标题检查
    if (!pageData.title) {
      issues.push('缺少页面标题')
      score -= 20
    } else if (pageData.title.length < 10 || pageData.title.length > 60) {
      issues.push('标题长度不合适（建议10-60字符）')
      score -= 10
    }

    // 描述检查
    if (!pageData.description) {
      issues.push('缺少页面描述')
      score -= 15
    } else if (pageData.description.length < 50 || pageData.description.length > 160) {
      issues.push('描述长度不合适（建议50-160字符）')
      score -= 8
    }

    // 关键词检查
    if (!pageData.frontmatter?.keywords) {
      suggestions.push('建议添加页面关键词')
      score -= 5
    }

    // 图片检查
    if (!pageData.frontmatter?.ogImage) {
      suggestions.push('建议添加社交分享图片')
      score -= 5
    }

    // 内容长度检查
    if (pageData.content && pageData.content.length < 300) {
      issues.push('内容过短，建议至少300字符')
      score -= 15
    }

    // H1 标签检查
    if (pageData.content && !pageData.content.includes('# ')) {
      issues.push('缺少主标题（H1）')
      score -= 10
    }

    return { score: Math.max(0, score), issues, suggestions }
  }

  // 生成 SEO 报告
  static generateSEOReport(pages: any[]): {
    totalScore: number
    averageScore: number
    totalIssues: number
    commonIssues: Array<{issue: string, count: number}>
    recommendations: string[]
  } {
    const allResults = pages.map(page => this.checkPageSEO(page))

    const totalScore = allResults.reduce((sum, result) => sum + result.score, 0)
    const averageScore = totalScore / allResults.length

    const allIssues = allResults.flatMap(result => result.issues)
    const totalIssues = allIssues.length

    // 统计常见问题
    const issueCount = allIssues.reduce((acc, issue) => {
      acc[issue] = (acc[issue] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const commonIssues = Object.entries(issueCount)
    .map(([issue, count]) => ({ issue, count }))
    .sort((a, b) => b.count - a.count)

    const recommendations = [
      '优化页面标题和描述',
      '添加相关关键词',
      '增加内容丰富度',
      '优化图片 Alt 文本',
      '添加内部链接',
      '提高页面加载速度'
    ]

    return {
      totalScore,
      averageScore,
      totalIssues,
      commonIssues,
      recommendations
    }
  }
}

// Vue 组件中使用的 SEO Composable
export function useSEO() {
  // 动态设置页面 SEO
  const setPageSEO = (seo: PageSEO) => {
    if (typeof document === 'undefined') return

    // 动态更新标题
    if (seo.title) {
      document.title = seo.title
    }

    // 动态更新描述
    if (seo.description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', seo.description)
    }

    // 更新关键词
    if (seo.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', seo.keywords.join(','))
    }
  }

  return {
    setPageSEO,
  }
}

// 使用示例注释：
/*
// 在 .md 文件的 frontmatter 中使用：
---
title: "移动19元100GB流量卡"
description: "移动推出的超值流量卡，月租仅19元享受100GB全国通用流量"
keywords: ["移动流量卡", "19元流量卡", "100GB流量"]
ogImage: "/images/mobile-card-19.jpg"
cardInfo:
  name: "移动19元100GB流量卡"
  provider: "中国移动"
  price: 19
  dataAmount: "100GB"
  validity: "长期有效"
  features: ["全国通用", "不限速", "可热点"]
  rating: 4.8
  reviewCount: 1250
---

// 在 Vue 组件中使用：
<script setup>
import { useSEO } from '../utils/seo-helpers'

const { setPageSEO, trackCardApplication } = useSEO()

// 动态设置 SEO
setPageSEO({
  title: '移动19元100GB流量卡 - 爱号卡',
  description: '移动超值流量卡推荐...',
  keywords: ['移动流量卡', '便宜流量卡']
})

// 追踪转化
const handleApply = () => {
  trackCardApplication('移动19元100GB流量卡', '中国移动')
  // 其他申请逻辑...
}
</script>

<template>
  <button @click="handleApply">立即申请</button>
</template>
*/
