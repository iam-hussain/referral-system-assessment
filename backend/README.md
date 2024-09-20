# Backend

## Overview

This is the backend part of the project built with Express, Passport.js, Prisma, and MongoDB.

## Tech Stack

- **Express** - Fast, minimalist web framework for Node.js.
- **Passport.js** - Authentication middleware for Node.js.
- **Prisma** - Modern database toolkit and ORM for Node.js.
- **MongoDB** - NoSQL database for scalable applications.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend

nvm use 20

npm install

npm run prisma:generate

cp .env.example .env
```

Update the ENV variables in the `.env` file, most importantly 
 - TWITTER_APP_KEY
 - TWITTER_APP_SECRET
 - DATABASE_URL

In case of using the fresh database 

```
npm run prisma:deploy
```

If you want reset the Database with clean seed data\

```
npm run prisma:reset
```

To run server

```
npm run dev
```

 
 Server will be running at  http://localhost:4000