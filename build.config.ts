import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([{
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals: [
    'vite',
    'vite-plugin-pwa',
    'workbox-build',
  ],
  rollup: {
    emitCJS: true,
    dts: {
      tsconfig: './tsconfig.node.json',
      respectExternal: true,
    },
  },
  failOnWarn: false,
}, {
  entries: [
    { input: 'src/components/index' },
  ],
  clean: false,
  declaration: true,
  externals: [
    '@types/react-dom',
    'virtual:pwa-info',
  ],
  rollup: {
    emitCJS: true,
    dts: {
      tsconfig: './tsconfig.json',
      respectExternal: true,
    },
  },
}])
