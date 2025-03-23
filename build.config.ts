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
    { input: 'src/sw/index' },
  ],
  clean: false,
  declaration: true,
  externals: [
    '@remix-run/dev',
    '@react-router/dev',
    'react',
    'react-dom',
    'virtual:pwa-info',
    'virtual:pwa-assets/head',
    'virtual:vite-pwa/remix/sw',
    'virtual:vite-pwa/reactrouter/sw',
    'workbox-core',
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
