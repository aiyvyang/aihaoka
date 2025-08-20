import { VitePWA } from 'vite-plugin-pwa'

export function createPWAPlugin() {
  return VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: '爱号卡 - 流量卡推广平台',
      short_name: '爱号卡',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#2563eb',
      orientation: 'portrait',
      icons: [
        {
          src: '/icons/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/icons/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/icons/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/icons/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    includeAssets: ['icons/apple-icon-180.png', 'icons/*.jpg'],
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg}']
    }
  })
}
