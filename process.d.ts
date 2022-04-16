declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: string;
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_FROM: string;

    GITHUB_ID: string;
    GITHUB_SECRET: string;

    GOOGLE_ID: string;
    GOOGLE_SECRET: string;

    FACEBOOK_ID: string;
    FACEBOOK_SECRET: string;
    APPLE_ID: string;
    APPLE_SECRET: string;
  }
}
