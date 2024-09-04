import { defineConfigWithTheme } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { MyThemeConfig } from './theme/types'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const fileAndStyles: Record<string, string> = {}
// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<MyThemeConfig>({
  title: "DeepVision Lab",
  description: "DeepVision Lab",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    servers: [
      {id: 1, name: 'DVLab-1', link: 'http://gpu1.deepvision.site', port: 8008, apipage: 'node_infos'},
      {id: 2, name: 'DVLab-2', link: 'http://gpu2.deepvision.site', port: 8008, apipage: 'node_infos'},
      //{id: 2, name: 'DVLab-3', link: 'http://gpu3.deepvision.site', port: 8008, apipage: 'node_infos'},
      //{id: 3, name: 'DVLab-4', link: 'http://gpu4.deepvision.site', port: 8008, apipage: 'node_infos'},
      {id: 4, name: 'DVLab-5', link: 'http://gpu5.deepvision.site', port: 8008, apipage: 'node_infos'},
      {id: 5, name: 'DVLab-6', link: 'http://gpu6.deepvision.site', port: 8008, apipage: 'node_infos'},
      {id: 6, name: 'DVLab-7', link: 'http://gpu7.deepvision.site', port: 8008, apipage: 'node_infos'},
      {id: 7, name: 'DVLab-8', link: 'http://gpu8.deepvision.site', port: 8008, apipage: 'node_infos'},

    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Wiki', link: '/wiki' },
      { text: 'GPU', link: '/gpu' },


    ],

    sidebar: [
      {
        text: 'More documents',
        items: [
          { text: '加入组内局域网', link: '/join-our-tailnet' },
          { text: '查看GPU使用情况', link: '/gpu' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SJTU-DeepVisionLab' }
    ]
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPContent\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPMainContent.vue', import.meta.url)
          )
        }
      ]
    },
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc']
    },
    plugins: [
      // ...
      AutoImport({
        resolvers: [NaiveUiResolver()],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
  markdown: {
    math: true
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html) return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, style + '</head>')
    }
  }
})
