/// <reference types="vite/client" />

// FOR TESTING PURPOSES ONLY IN THIS REPO
interface ImportMetaEnv {
  readonly VITE_PUBLIC_VIRTUAL_PWA_MODULE: string
  readonly VITE_VIRTUAL_PWA_MODULE: boolean
  readonly VITE_BUILD_DATE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
