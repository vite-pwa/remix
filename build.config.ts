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
    dts: {
      tsconfig: './tsconfig.node.json',
      respectExternal: true,
    },
  },
  failOnWarn: false,
}, {
  entries: [
    { input: 'src/components/index' },
    { input: 'src/sw/offline' },
  ],
  clean: false,
  declaration: true,
  externals: [
    '@remix-run/dev',
    'react',
    'react-dom',
    'virtual:pwa-info',
    'virtual:pwa-assets/head',
    'virtual:vite-pwa/remix/routes',
    'workbox-precaching',
    'workbox-routing',
  ],
  rollup: {
    dts: {
      tsconfig: './tsconfig.json',
      respectExternal: true,
    },
  },
}])
