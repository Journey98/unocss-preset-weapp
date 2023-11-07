import { createGenerator } from '@unocss/core'
import { expect, test } from 'vitest'
import presetUno from '@unocss/preset-uno'
import presetRemToPx from '@unocss/preset-rem-to-px'

import presetWeapp from '../src/indexpro'

const uniapp_750 = createGenerator({
  presets: [
    // presetUno({ preflight: false, prefix: 'uni2' }),
    presetRemToPx(),
    presetWeapp({
      isH5: false,
      platform: 'uniapp',
    }),
  ],
})

// test('uniapp_750', async () => {
//   const code = size.join(' ')
//   const { css } = await uniapp_750.generate(code)
//   await expect(css).toMatchInlineSnapshot(`
//   "/* layer: default */
//   .-p2{padding:-0.417vw;}
//   .m4{margin:0.833vw;}
//   .mx2{margin-left:0.417vw;margin-right:0.417vw;}
//   .gap2{gap:0.417vw;}
//   .-w-0\\\\.5px{width:-0.5px;}
//   .w-1{width:0.208vw;}"
// `)
// })

test('should works', async () => {
  expect((await uniapp_750.generate(new Set(['m4', 'color-black', 'mx2', '-p2', 'gap2', '-w-0.5px', 'w-1']), { preflights: true })).css)
    .toMatchInlineSnapshot(`
      "/* layer: preflights */
      page,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
      /* layer: default */
      .m4{margin:16rpx;}
      .mx2{margin-left:8rpx;margin-right:8rpx;}
      .-w-0_dl_5px{width:-0.5rpx;}
      .w-1{width:4rpx;}
      .gap2{gap:8rpx;}
      .-p2{padding:-8rpx;}
      .color-black{--un-text-opacity:1;color:rgb(0 0 0 / var(--un-text-opacity));}"
    `)
})
