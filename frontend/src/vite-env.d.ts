/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly WHATSAPP_NUMBER?: string;
  readonly VITE_DEVELOPER_PROFILE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

