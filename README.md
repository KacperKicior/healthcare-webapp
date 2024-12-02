This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Heathcare Web App

App was created using Next.js 14, Appwrite Database and authentication and Twillio SMS Notifications system.
As patient you can create appointment after providing set credentials, after confirmation user gets notification about their schedule
or gets information about cancelment of said appointment.
As admin you can enter to dashboard with all appointments (pending, scheduled, canceled) which is locked behind OTP verification.
On dashboard there is option to administrate incoming appointments with abitity to change hour or doctor of the visit.

## Used Technologies

-Next.js
-Tailwind.css
-Shadcn UI Components
-Appwrite Database and Authentication
-Twilio SMS Notification System

