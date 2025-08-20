//模板配置文件
import { defineConfig } from 'vitepress'
import { genFeed } from './theme/genFeed'
import { head } from './theme/head'
import type { ThemeConfig } from './theme/types'
import mdItCustomAttrs from 'markdown-it-custom-attrs'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'

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
  description:
    '爱号卡 - 基于 VitePress 打造的流量卡推广与分享平台，支持图文介绍、优惠套餐展示、在线申请与推广分销，帮助用户快速选择合适的流量卡方案。',
  ignoreDeadLinks: true,
  themeConfig: {
    // @ts-expect-error：忽略类型检查
    beecodeurl: 'https://www.aiyvyang.top/', //这里是内页ArticleLink组件用到的跳转第三方网址，一般用不到，仅仅用于二次开发
    sidebar: [{}], //这里如果删掉，左侧栏的内容全部不显示。页面布局会变成通栏
    nav: [
      { text: '爱宇阳活动福利', link: '#' },
      { text: '爱宇阳小程序', link: '#' }
    ],
    music: [
      //音乐列表，音乐播放器参数在.vitepress/store/player.ts。封面和歌词不支持可自行按照文章教程修改
      // {
      //     "id": 1,
      //     "title": "陷落Falling",
      //     "author": "不知名选手Au / 马也_Crabbit",
      //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0Nzk=",
      //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/01.jpg",
      //     "lrc": ""
      // },
      {
          "id": 2,
          "title": "一个人想着一个人 ",
          "author": "如懿",
          "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0ODA=",
          "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/02.jpg",
          "lrc": ""
      },
      // {
      //     "id": 3,
      //     "title": "夜车（Cover 曾轶可）",
      //     "author": "姜铭杨",
      //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0ODE=",
      //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/03.jpg",
      //     "lrc": ""
      // },
      // {
      //   id: 4,
      //   title: '迎春花 / 財神到 / 祝福你 (廣東)',
      //   author: '邓丽君 / 林子祥 / 甄妮',
      //   url: 'https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTI=',
      //   pic: '',
      //   lrc: ''
      // }
    ],
    banner: [
      //主页轮播，不需要就注释掉
      {
        link: '/posts/2024/01/freebie-chinese-font.html',
        image: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hlxg58m6w3j21z40m8dis.jpg',
        title: ''
      },
      {
        link: '/posts/2024/01/freebie-chinese-font.html',
        image: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hlxg58m6w3j21z40m8dis.jpg',
        title: ''
      }
    ],
    // search: {
    //     provider: 'local',
    //     options: {
    //         miniSearch: {
    //             /**
    //              * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
    //              */
    //             options: {
    //             },
    //             /**
    //              * @type {import('minisearch').SearchOptions}
    //              * @default
    //              * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
    //              */
    //             searchOptions: {
    //               /* ... */
    //             }
    //           },

    //         locales: {
    //             root: {
    //                 translations: {
    //                     button: {
    //                         buttonText: '搜索文档',
    //                         buttonAriaLabel: '搜索文档'
    //                     },
    //                     modal: {
    //                         noResultsText: '无法找到相关结果',
    //                         resetButtonTitle: '清除查询条件',
    //                         footer: {
    //                             selectText: '选择',
    //                             navigateText: '切换',
    //                             closeText: '关闭'
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // },
    outlineTitle: '目录',
    socialLinks: [
      {
        icon: {
          svg: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg viewBox="0 0 24 24" fill="currentColor" version="1.1" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs1" /><circle fill="#c71d23" cx="12" cy="12" r="12" id="circle1" /><path d="m 18.63,10.67 h -7.45 c -0.36,0 -0.65,0.29 -0.65,0.64 v 1.59 c 0,0.35 0.29,0.64 0.65,0.64 0,0 0,0 0,0 h 4.54 c 0.36,0 0.65,0.29 0.65,0.64 0,0 0,0 0,0 v 0.16 0 0.16 c 0,1.06 -0.87,1.91 -1.95,1.91 H 8.26 C 7.9,16.41 7.61,16.12 7.61,15.77 V 9.72 c 0,-1.06 0.87,-1.91 1.95,-1.91 0,0 0,0 0,0 h 9.07 c 0.36,0 0.65,-0.29 0.65,-0.64 v -1.6 c 0,-0.35 -0.29,-0.64 -0.65,-0.64 0,0 0,0 0,0 H 9.56 C 6.87,4.93 4.7,7.07 4.7,9.71 v 8.93 c 0,0.35 0.29,0.64 0.65,0.64 h 9.56 c 2.42,0 4.37,-1.93 4.37,-4.3 v -3.67 c 0,-0.35 -0.29,-0.64 -0.65,-0.64 z" id="G" fill="#ffffff" style="stroke-width:0.290253" /></svg>'
        },
        link: 'https://gitee.com/aiyvyang/aihaoka'
      },
      {
        icon: {
          svg: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg aria-hidden="true" role="img" class="tanuki-logo" width="25" height="24" viewBox="0 0 25 24" fill="none"  xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path class="tanuki-shape tanuki" d="m24.507 9.5-.034-.09L21.082.562a.896.896 0 0 0-1.694.091l-2.29 7.01H7.825L5.535.653a.898.898 0 0 0-1.694-.09L.451 9.411.416 9.5a6.297 6.297 0 0 0 2.09 7.278l.012.01.03.022 5.16 3.867 2.56 1.935 1.554 1.176a1.051 1.051 0 0 0 1.268 0l1.555-1.176 2.56-1.935 5.197-3.89.014-.01A6.297 6.297 0 0 0 24.507 9.5Z" fill="#E24329"></path><path class="tanuki-shape right-cheek" d="m24.507 9.5-.034-.09a11.44 11.44 0 0 0-4.56 2.051l-7.447 5.632 4.742 3.584 5.197-3.89.014-.01A6.297 6.297 0 0 0 24.507 9.5Z" fill="#FC6D26"></path><path class="tanuki-shape chin" d="m7.707 20.677 2.56 1.935 1.555 1.176a1.051 1.051 0 0 0 1.268 0l1.555-1.176 2.56-1.935-4.743-3.584-4.755 3.584Z" fill="#FCA326"></path><path class="tanuki-shape left-cheek" d="M5.01 11.461a11.43 11.43 0 0 0-4.56-2.05L.416 9.5a6.297 6.297 0 0 0 2.09 7.278l.012.01.03.022 5.16 3.867 4.745-3.584-7.444-5.632Z" fill="#FC6D26"></path></svg>'
        },
        link: 'https://gitlab.com/aiyvyang/aihaoka'
      },
      {
        icon: {
          svg:
            '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg version="1.1" id="svg1" width="24" height="24" viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs1" /><g id="g1"><image width="24" height="24" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAPFBMVEUAAADbIEDaID7aID/bID7f&#10;IEDaID7bIEDaID7aID7bID7cIEDbID3aID/aID/aID/YID3aID7dID7aID5zWHPKAAAAE3RSTlMA&#10;IN+/7xCfQGCAkDBwz69QcM9vGOdDSAAAArBJREFUaN7tmdtS7SAMhoEknArtUt7/XbfjdmbrsiQE&#10;2gtn+905o3+aIwHN/4d9w9yBPYqvrn3gYE+BrhMv3rUTqj+uUE/Q+qAPS+oUoUm4aKflE7YR0Ns1&#10;eRlM+owfrmlwUZlaaFp2TZxesenBx3D0c5vD01h4apul0oi+a/Pssv6GbYV4s36rUnywLRKk+K/C&#10;1ipp9fP2vVQ5A14nD9YY1Bh41U2f92i/fHOKScBzTXMBg9hxmjnknvXIhK9HJTr3/rPby2Y+KM8G&#10;+iMvnv5qSFBbwzfN80M+DKfAujMDMvA1MVZRQduQgTCYAdvpSZn0KUlR1QLRKC2A5Up03oCx0QP4&#10;wuYs8mNrnbOeshfqh7NRoBXRTjn/0yN0qQPpZgcM3OyAuduB7W4HDnUXU0zewwc+pxI2UuXYsern&#10;tzaEXMJom/nZiw/ukS8iOUJ14q7z0p4hNpyyCWlQAD9UZJLwR1moaJmd2D57SFNLBlgPwoQHXBTc&#10;+MJCOGzhYAxYuSllHPX7wDDkYQup38nC+85ehwKF/Y8iI0HhKMkDsG0R+nu1+hlvC2XvF9LWrSKd&#10;Id+byaRZGjUF0J12WSHKdYntWa4XLXC2O2Homv3HdgdAuiYJ/V7GSQMvPZWwVkedegdmSCJdsCE+&#10;OtmZrtRXZiCQ+oYm3/OA341w0+o79hNt4y3o9Z18kDwU+gE7w5o9bTMp8itun4XZ0fQv3WjZKv4H&#10;BMVLtBBeizP/4Qj7+PNpaR2ghN4jxflHodWvJJA/XWPIHiUD6h+Ya5NA5xw2gSx2y/L79a0WnJU6&#10;fl2ft7Cuf6cFZ9WNr9eXSbP6MDod41yYknqR1b73M6w7kUm9B2pMQJj6Z7hTyuuJIKvjHswCNlf+&#10;4wuZVWz050ZcjmQugkJJO1SHf88E8DluZH75CfwBt54WqcTQWY8AAAAASUVORK5CYII=&#10;" id="image1" /></g></svg>'
        },
        link: 'https://gitcode.com/aiyvyang/aihaoka'
      },
      {
        icon: {
          svg: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg id="logo-monochrome" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="color: #f76945;"><g fill="none"><path d="M11.5286 1.87149C11.5769 1.73005 11.5356 1.5733 11.4233 1.47452C11.0472 1.14247 10.0965 0.443125 8.66911 0.339708C7.07054 0.223769 6.08089 0.652279 5.58096 0.969951C5.36531 1.10676 5.35326 1.41748 5.55499 1.57422L9.62723 4.73936C9.98617 5.01807 10.5125 4.8604 10.6591 4.43003L11.5286 1.87149Z" fill="currentColor"></path><path d="M1.49017 11.2664C1.32368 11.3781 1.24855 11.584 1.30235 11.7774C1.45724 12.3339 1.91868 13.4919 3.22833 14.5456C4.53797 15.5992 6.08738 15.7128 6.74962 15.6966C6.94764 15.692 7.12016 15.5617 7.17998 15.3724L9.79046 7.11064C9.97875 6.51425 9.31048 6.01386 8.79154 6.3626L1.49017 11.2664Z" fill="currentColor"></path><path d="M3.39813 2.54827C3.27013 2.49773 3.12683 2.50607 3.00579 2.57193C2.52256 2.83488 1.28526 3.64506 0.647135 5.30947C0.154627 6.59222 0.328071 8.01085 0.463488 8.70463C0.508009 8.9314 0.747306 9.06218 0.962489 8.97824L8.79485 5.92024C9.35414 5.70181 9.35646 4.91111 8.7981 4.6899L3.39813 2.54827Z" fill="currentColor"></path><path d="M15.0167 8.46843C15.243 8.62194 15.5528 8.48652 15.5922 8.21569C15.6961 7.49872 15.7861 6.25076 15.371 5.30933C14.8177 4.05487 13.8786 3.28133 13.433 2.9669C13.292 2.86766 13.1019 2.87786 12.9725 2.99241L10.9959 4.74541C10.6732 5.03154 10.7066 5.54492 11.0636 5.78746L15.0167 8.46936V8.46843Z" fill="currentColor"></path><path d="M9.49413 15.1604C9.47372 15.3937 9.67128 15.5866 9.90409 15.5616C10.6531 15.4813 12.1918 15.1841 13.3447 14.0827C14.467 13.0109 14.832 11.7384 14.9382 11.2319C14.9669 11.0951 14.9326 10.9528 14.8445 10.8442L11.3886 6.57909C11.0143 6.11719 10.2681 6.34535 10.2162 6.93757L9.49366 15.1604H9.49413Z" fill="currentColor"></path></g></svg>'
        },
        link: 'https://cnb.cool/aiyvyang/aihaoka'
      },
      {
        icon: {
          svg: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path></svg>'
        },
        link: 'https://github.com/aiyvyang/aihaoka'
      }
    ],
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchLabel: '暗黑切换',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    article: {
      cc: {
        author: '爱宇阳', //此信息将显示在文章底部和博主卡片中
        authorLink: 'https://mp.weixin.qq.com/s/l5zeSwt6ZcGo5VjQMlsqEg',
        license: '署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)',
        licenseLink: 'https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans'
      }
    },
    website: {
      copyadd: true, //用户复制页面内容时尾巴自动添加版权声明
      perpage: 12, //列表页每页显示数量
      homeBanner: false, //显示首页 banner,banner列表在上面 banner中配置
      bannerHeight: 200, //banner高度
      showWelcome: false, //是否显示首页底部右下角弹框，（调试时弹框不显示的话先关闭浏览器再运行，因为有可能开启了缓存）内容请在组件.vitepress/theme/components/Welcome.vue编写
      welcomeusestate: false, //底部弹框是否使用sessionStorage缓存(即不关闭页面仅显示一次)
      welcome: {
        autoClose: 6000 //多长时间自动关闭，false为不关闭
      },
      showSnow: true, //是否开启雪花。开启后仅在暗黑模式下显示
      showUserCard: false, //是否显示列表中的博主名片
      cardPosition: 3, //显示在第几个位置
      cardMusic: true, //是否显示播放音乐，音乐列表在上面 music中配置
      cardCoffee: true, //是否显示打赏咖啡，
      coffeeQrcode: '/zanshang.png', //打赏咖啡二维码图片地址。如果是跳转网页地址需自行修改代码
      showLantern: false, //是否显示灯笼挂件
      lanternText: ['新', '年'], //灯笼上的字,数组形式
      showFirework: false, //是否显示侧栏烟花特效
      fireworkTitle: '🧨烟花许愿🧨｜②⓪②④新年', //烟花许愿标题
      fireworkWords: [
        '恭贺新禧',
        '万事如意',
        '新年快乐',
        '恭喜发财',
        '岁岁平安',
        '吉祥如意',
        '心想事成',
        '万事顺遂',
        '一帆风顺',
        '二龙腾飞',
        '三羊开泰',
        '四季平安',
        '五福临门',
        '六六大顺',
        '七星高照',
        '八方来财',
        '九九同心',
        '十全十美',
        '荣华富贵',
        '金玉满堂',
        '龙凤呈祥',
        '喜气洋洋',
        '鸿运当头',
        '财源广进',
        '笑口常开',
        '幸福安康',
        '日进斗金',
        '生意兴隆',
        '步步高升',
        '年年有余',
        '迎春接福',
        '喜气盈门',
        '花团锦簇',
        '前程似锦',
        '福满人间',
        '春回大地',
        '辞旧迎新',
        '万象更新',
        '吉祥如意',
        '万事大吉',
        '马到成功',
        '功成名就',
        '鱼跃龙门',
        '一飞冲天',
        '瑞气盈门',
        '福寿康宁',
        '时来运转',
        '鸿运高照',
        '三阳开泰',
        '否极泰来',
        '鸿运亨通',
        '一帆风顺',
        '出入平安',
        '顺风顺水',
        '龙凤呈祥',
        '花好月圆',
        '张灯结彩',
        '欢天喜地',
        '合家欢乐',
        '幸福美满',
        '和气致祥',
        '招财进宝',
        '开门大吉',
        '迎春接福',
        '福泽满门',
        '花开富贵',
        '竹报平安',
        '大吉大利',
        '恭喜发财'
      ], //烟花许愿关键词
      showFooter: true, //是否显示全局底部信息
      icpRecordCode: '冀ICP备2023042105号-3', //网站备案号
      publicSecurityRecordCode: '冀公网安备13060602001777号', //公安备案号
      link: 'https://hk.aiyvyang.top/'
    },
    logo: {
      light: '/logo.png',
      dark: '/logo.png'
    }
  },
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
