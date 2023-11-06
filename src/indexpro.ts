import type { Preset, PresetOptions, UtilObject } from '@unocss/core'
import { cacheTransformEscapESelector, defaultRules } from 'unplugin-transform-class/utils'

// import type { Theme, ThemeAnimation } from './theme'
import preflights from './preflights'

// export { theme, colors } from './theme'

// support custom shadow color
// export type { ThemeAnimation, Theme }

export const prefilights = {
  wxPrefix: ['page,::before,::after'],
  taroPrefix: ['*,::before,::after'],
  uniappPrefix: ['uni-page-body,::before,::after'],
}

export interface PresetWeappOptions extends PresetOptions {
  /**
   * 是否是h5
   *
   * @default false
   */
  isH5?: boolean
  /**
   * 平台
   * @default 'uniapp'
   */
  platform?: 'taro' | 'uniapp'
  /**
   * 是否转换微信class
   *
   * @default true
   */
  transform?: boolean

  /**
   * 自定义转换规则
   * @default https://github.com/MellowCo/unplugin-transform-class#options
   */
  transformRules?: Record<string, string>
  /**
   * Utils prefix
   *
   * @default undefined
   */
  prefix?: string | string[]

}

export function presetWeapp(options: PresetWeappOptions = {}): Preset {
  options = {
    isH5: false,
    platform: 'uniapp',
    transform: true,
    transformRules: defaultRules,
    preflight: true,
    ...options,
  }

  // const uno = presetUno({ ...options, preflight: false })
  return {
    // ...uno,
    name: 'unocss-preset-weapp',
    postprocess(css: UtilObject) {
      // if (options.prefix)
      // uno.postprocess(css)

      // 处理单位
      const pxToVwRE = /(-?[\.\d]+)px/g
      css.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && pxToVwRE.test(value))
          i[1] = value.replace(pxToVwRE, (_, p1) => `${p1}rpx`)
      })

      // 是否转义class
      if (options.transform)
        css.selector = cacheTransformEscapESelector(css.selector, options.transformRules)
    },
    preflights: options.preflight ? preflights(options.isH5!, options.platform!) : [],
  }
}

export default presetWeapp
