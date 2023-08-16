This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# Flagmaster

Flagmaster is a flag guessing game. I've created this web application while learning NextJS and improve my knowledge on flags at the same time.gi
https://flagmaster.vercel.app

## Features
- Play the game in different mode (Multiple, Fill in the blanks, Give me 5) and difficulty levels (Easy, Medium, Hard).
- Use powerups to help you in the game.
- Finish different challenges.
- Battle other players ( in-progress).
- Leaderboards.

## Tech
- NextJS - Frontend and APIs
- Tailwind - Overall Styling of the application
- Headless UI - Form Components
- React Icons - used some icons
- NextAuth (AWS Cognito) - User Authentication
- AWS S3 - File storage of all images and leaderboards data
- AWS DynamoDB - Datastore (Single Table Design, Data stream)
- AWS Lambda - for other data processing

## Roadmap
- [x] Home and Basic Layout pages
- [x] Flag page
- [x] Play Page (list all challenges)
- [x] Game Modes (Multiple an Fill in the blanks)
- [x] Game Components
- [x] Leaderboards page
- [ ] New Game Mode (Give me 5!)
- [ ] Multiplayer page

## Installation

First, create your .env file with the following entries
```bash
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_SITE_URL=
COGNITO_CLIENT_ID=
COGNITO_CLIENT_SECRET=
COGNITO_ISSUER=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
DB_TABLE=DYNAMODB TABLE
LEADERBOARDS_KEY=S3KEY WHERE YOUR leaderboard file is located
```

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