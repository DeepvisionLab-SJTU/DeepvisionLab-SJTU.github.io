import { DefaultTheme } from 'vitepress'

export interface NodeItem{
  id?: number
  name?: string
  link: string
  port: number
  apipage: string
}

export interface Tags{
  title: string
}

export interface Infos{
  icon: string
  text: string
  url?: string

}

export interface Post{
  frontmatter: Record<string, any>
  regularPath: string
  filePath: string
}

export interface MyThemeConfig extends DefaultTheme.Config{
    servers?: NodeItem[],
  }
