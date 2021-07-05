import * as sentry from "@sentry/node";

sentry.init({
    dsn: process.env.DNS_URL_SENTRY,
    tracesSampleRate: 1.0,
});