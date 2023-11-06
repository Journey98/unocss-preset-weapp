import { createGenerator } from '@unocss/core'
import { describe, expect, test } from 'vitest'
import presetWeapp from '../src'

const uniapp_750 = createGenerator({
  presets: [
    presetWeapp({
      isH5: false,
      platform: 'uniapp',
    }),
  ],
})

const size = [
  'w-100px',
  'w-100',
  'w-100rpx',

  'text-base',
  'text-16px',
  'm-6',
]

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
  expect((await uniapp_750.generate(new Set(['m4', 'mx2', '-p2', 'gap2', '-w-0.5px', 'w-1']), { preflights: true })).css)
    .toMatchInlineSnapshot(`
      "/* layer: preflights */
      page,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset:var(--un-empty,/*!*/ /*!*/);--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset:var(--un-empty,/*!*/ /*!*/);--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);}
      /* layer: default */
      .-p2{padding:-16rpx;}
      .m4{margin:32rpx;}
      .mx2{margin-left:16rpx;margin-right:16rpx;}
      .gap2{gap:16rpx;}
      .-w-0_dl_5px{width:-0.5rpx;}
      .w-1{width:1rpx;}"
    `)
})
