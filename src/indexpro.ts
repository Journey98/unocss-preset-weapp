import type { Preset, UtilObject } from '@unocss/core'
import { cacheTransformEscapESelector, defaultRules } from 'unplugin-transform-class/utils'
import presetUno from '@unocss/preset-uno'
import type { PresetUnoOptions } from '@unocss/preset-uno'
import preflights from './preflights'

export interface PresetWeappOptions extends PresetUnoOptions {
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
}

export function presetWeapp(options: PresetWeappOptions = {}): Preset {
  options = {
    isH5: false,
    platform: 'uniapp',
    transform: true,
    transformRules: defaultRules,
    preflight: true,
    ...options,
    // 此处置空，避免 presetUno 里面的 postprocess 重复处理
  }

  // 此处重写了 postprocess 和 preflights
  // 实现参考了 presetUno 嵌入 presetWindicss 的方式
  const uno = presetUno(options)
  return {
    ...uno,
    name: 'unocss-preset-weapp-pro',
    theme: {
      ...uno.theme,
      transformRules: options.transformRules,
    },
    postprocess(css: UtilObject) {
      // 处理单位
      pxToRpx(css)

      // 处理css变量前缀
      options.variablePrefix && varPrefix(options.variablePrefix, css)

      // 是否转义class
      options.transform && (css.selector = cacheTransformEscapESelector(css.selector, options.transformRules))
    },
    preflights: options.preflight ? preflights(options.isH5!, options.platform!) : [],
  }
}

function pxToRpx(css: UtilObject) {
  const pxToVwRE = /(-?[\.\d]+)px/g
  css.entries.forEach((i) => {
    const value = i[1]
    if (typeof value === 'string' && pxToVwRE.test(value))
      i[1] = value.replace(pxToVwRE, (_, p1) => `${p1}rpx`)
  })
}

function varPrefix(prefix: string, obj: UtilObject) {
  if (prefix !== 'un-') {
    obj.entries.forEach((i) => {
      i[0] = i[0].replace(/^--un-/, `--${prefix}`)
      if (typeof i[1] === 'string')
        i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`)
    })
  }
}
