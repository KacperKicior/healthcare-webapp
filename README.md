## Heathcare Web App

App was created using Next.js 14, Appwrite Database and authentication and Twillio SMS Notifications system.
As patient you can create appointment after providing set credentials, after confirmation user gets notification about their schedule
or gets information about cancelment of said appointment.
As admin you can enter to dashboard with all appointments (pending, scheduled, canceled) which is locked behind OTP verification.
On dashboard there is option to administrate incoming appointments with abitity to change hour or doctor of the visit.

The aim of this project was to learn fundamental knowledge of Next.js and was done as a part of course on "JavaScript Mastery" Youtube Channel.

## Used Technologies

- Next.js
- Tailwind.css
- Shadcn UI Components
- Appwrite Database and Authentication
- Twilio SMS Notification System


## Getting Started

First, clone this repository:

```bash
git clone https://github.com/KacperKicior/healthcare-webapp.git
```

Then in app directory run command to install dependencies:
```bash
npm i
#or
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To add database funcionalities and set OTP password for admin dashboard access there is need to create own .env file with own Appwrite keys and passwords

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
