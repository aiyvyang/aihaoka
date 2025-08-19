# 爱号卡

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## 📖 简介

**爱号卡** 是一个基于 **VitePress** 打造的流量卡推广与资源分享平台。
它不仅支持 **图文介绍、套餐展示、在线申请**，还能用于 **推广分销、资源整理与知识分享**。

原项目基于 **爱号卡** 二次开发，由 **shiheme** 开发并采用 MIT 协议开源。在此基础上，爱号卡专注于 **通信流量卡的推广应用场景**，对功能和界面进行了定制化增强。

---

## ✨ 特性

* 📑 **流量卡内容管理**

  * 流量卡套餐展示（图文/表格）
  * 分类、标签、存档功能
  * 相关文章 & 流量卡对比

* 🎨 **界面与交互**

  * 文章列表宫格/列表切换
  * 暗黑模式 + 动效特效（烟花、雪花、挂件）
  * 移动端自适应体验优化

* 🔗 **推广与增强**

  * 流量卡推广页 & 在线申请入口
  * 资源汇总组件（支持 GitHub/推广链接）
  * Feed 订阅，支持 SEO 优化
  * 打赏二维码 & 分销推广支持

* 🛠️ **技术栈**

  * VitePress + Vue 3 + Pinia
  * VueUse 工具库
  * Pagefind 全文搜索
  * 多种常用前端组件（Swiper 轮播、Toast 通知等）

---

## 📦 安装与使用

```bash
# 克隆项目
git clone https://gitee.com/aiyvyang/aihaoka.git
cd aihaoka

# 安装依赖
pnpm install

# 本地运行
pnpm dev

# 构建
pnpm build
```

---

## 📂 项目结构

```
.
├── docs/              # 内容目录
│   ├── posts/         # 流量卡介绍文章
│   ├── pages/         # 平台页面（推广/导航/关于）
│   ├── .vitepress/    # 配置与数据
│   └── prepare/       # 草稿/未发布内容
├── public/            # 静态资源（LOGO/二维码等）
├── src/               # 主题源码
├── LICENSE            # 许可证
└── README.md          # 文档
```

---

## 🚀 部署

推荐使用 [Vercel](https://vercel.com/) 一键部署：

1. 将项目推送到 GitHub / Gitee
2. 在 Vercel 导入仓库并自动构建
3. 绑定自定义域名即可上线

---

## 📢 公众号爱宇阳

如果你对 **流量卡推广、前端开发、开源项目** 感兴趣，欢迎关注我的公众号：

[👉 点击关注「爱宇阳」公众号](https://mp.weixin.qq.com/s/l5zeSwt6ZcGo5VjQMlsqEg)
学习更多关于 **流量卡推广平台搭建** 和 **前端开发实战** 的内容。

<p align="center">
  <img src="./docs/public/qrcode.jpg" alt="扫码关注 爱宇阳 公众号" width="227" />
</p>

---

## 🖼️ 预览

![](https://fc.sinaimg.cn/large/6364aa43gy1hm0fdq92lmj22c01bq1a2.jpg)
内页

![](https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqk4umj22c01bqk52.jpg)
工具导航

![](https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqppztj22c01bqqqb.jpg)
文章列表简约样式

![](https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqrdlzj22c01bq4hn.jpg)
Feed订阅

![](https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqyuaij22c01bqkee.jpg)
文章页内置资源汇总组件，方便点击查看出处

![](https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqzlnrj22c01bq4qp.jpg)
分页

![](https://fc.sinaimg.cn/large/6364aa43gy1hm0fdr03guj22c01bqb29.jpg)
播放音乐+存档按年和年/月的形式

![](https://fc.sinaimg.cn/large/6364aa43gy1hm0fdr08pnj22c01bqb29.jpg)
文章列表九宫格样式

![](https://fc.sinaimg.cn/large/6364aa43gy1hm0fdr2dlbj22c01bqb29.jpg)
暗黑模式+标签点击切换

---

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来改进本项目。

如果对你有帮助，请点一个 ⭐️ Star 支持！

---

## 📜 许可证

本项目基于 MIT 协议开源，详见 [LICENSE](./LICENSE)。

原始代码版权归 **shiheme** 所有 (c) 2023

本项目修改部分版权归 **阳阳** 所有 (c) 2025

> 📦 本项目同步托管于多个代码仓库：
>
> * [Gitee](https://gitee.com/aiyvyang/aihaoka)
> * [GitHub](https://github.com/aiyvyang/aihaoka)
> * [GitLab](https://gitlab.com/aiyvyang/aihaoka)
> * [GitCode](https://gitcode.com/aiyvyang/aihaoka)
> * [CNB.cool](https://cnb.cool/aiyvyang/aihaoka)
