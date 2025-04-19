declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      OWNER_ID: string;
      PREFIX: string;
    }
  }
}

export * from "./loader.js";
