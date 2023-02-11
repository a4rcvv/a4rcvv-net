declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_URL: string;
    readonly NEXT_PUBLIC_GA_ID: string;
    readonly ANALYZE: string;
  }
}
