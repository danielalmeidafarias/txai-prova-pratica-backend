#!/bin/bash
set -e

# Optional: Delay before checking the DB
sleep 5

# Wait for the database to be ready
wait-for-it localhost:3306 -t 60 || exit 1

# Run Prisma migrations
npx prisma migrate deploy

# Start the application
npm run start:prod
