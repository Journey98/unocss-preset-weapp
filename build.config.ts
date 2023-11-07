import { defineBuildConfig } from 'unbuild'
import { isWindows } from 'std-env'

export default defineBuildConfig({
  entries: [
    'src/indexpro',
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: false,
    },
  },
  failOnWarn: !isWindows,
  externals: ['@unocss/preset-uno', '@unocss/core', 'unplugin-transform-class/utils'],
})
