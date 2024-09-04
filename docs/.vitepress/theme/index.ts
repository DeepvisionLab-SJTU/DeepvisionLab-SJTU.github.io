// https://vitepress.dev/guide/custom-theme
import { h, defineComponent, inject } from 'vue'
import type { Theme } from 'vitepress'
import { useRoute } from 'vitepress'
import { NConfigProvider } from 'naive-ui'
import DefaultTheme from 'vitepress/theme'
import { setup } from '@css-render/vue3-ssr'
import VPGpu from './components/VPGpu.vue'
import './style.css'

const { Layout } = DefaultTheme

const CssRenderStyle = defineComponent({
  setup () {
    const collect = inject('css-render-collect')
    return {
      style: collect()
    }
  },
  render () {
    return h('css-render-style', {
      innerHTML: this.style
    })
  }
})

const VitepressPath = defineComponent({
  setup () {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  }
})

const NaiveUIProvider = defineComponent({
  render () {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true },
      {
        default: () => [
          h(Layout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
        ]
      }
    )
  }
})

export default {
  extends: DefaultTheme,
  Layout: NaiveUIProvider,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('VPGpu', VPGpu)
    if (import.meta.env.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
  }
} satisfies Theme



