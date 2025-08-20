import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['link', { rel: 'icon', href: '/logo.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo.png' }], //全局控制图片放大样式
  ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }],
  ['meta', { property: 'og:image', content: '/logo.png' }],
  ['meta', { name: 'referrer', content: 'no-referrer' }],
  // 百度统计
  [
    'script',
    {},
    `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?c8bab594a320d3a6fceb06c5c6f67acc";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();`
  ],
  // End 百度统计
  // Google Tag Manager
  [
    'script',
    {},
    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NK2T793R');`
  ],
  // End Google Tag Manager
  // Vercel Web 分析
  ['script', {}, `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`],
  ['script', { defer: '', src: '/_vercel/insights/script.js' }],
  // End Vercel Web 分析
  // 全局控制图片放大交互
  ['link', { rel: 'stylesheet', href: '/static/css/fancybox.css' }],
  ['script', { src: '/static/js/fancybox.umd.js' }]
  // End 全局控制图片放大交互
]
