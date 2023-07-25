This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# Flagmaster

Flagmaster is a flag guessing game. I've created this web application while learning NextJS and improve my knowledge on flags at the same time.
https://flagmaster.vercel.app

## Features
- Play the game in different mode and difficulty levels
- Use powerups to help you in the game
- Finish different challenges
- Battle other players ( in-progress)
- Leaderboards

## Tech
- NextJS - Frontend and APIs
- Tailwind - Overall Styling of the application
- Headless UI - Form Components
- React Icons - used some icons
- NextAuth (AWS Cognito) - User Authentication
- AWS S3 - File storage of all images and leaderboards data
- AWS DynamoDB - Datastore (Single Table Design, Data stream)
- AWS Lambda - for other data processing

## Installation

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## License
MIT