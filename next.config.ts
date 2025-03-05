import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM,
    GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
    GMAIL_ACCESS_TOKEN: process.env.GMAIL_ACCESS_TOKEN,
    RESEND_API_KEY: process.env.RESEND_API_KEY
  }
};

export default nextConfig;
