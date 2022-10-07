/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly RGIT_APP_TITLE: string
    readonly RGIT_BACKEND_ADDR: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
