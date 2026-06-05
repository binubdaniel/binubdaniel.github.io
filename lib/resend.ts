import { Resend } from "resend";

// Server-only Resend client. Reads RESEND_API_KEY from env.
export const resend = new Resend(process.env.RESEND_API_KEY);

export const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
export const RESEND_FROM = process.env.RESEND_FROM ?? "onboarding@resend.dev";
