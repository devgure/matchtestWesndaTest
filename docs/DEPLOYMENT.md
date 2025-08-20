# 🚀 Deployment Guide

# 🚀#  Ubuntu VPS Deployment Guide ## 1. Setup Ubuntu 22.04 ``

# `bash
 sudo apt update && sudo apt upgrade -y 
 sudo apt install docker.io docker-compose nginx git -y


git clone https://github.com/yourusername/matchai.git
cd matchai

cp .env.example .env nano .env 
# Add DB, JWT, Stripe, etc.

# start sevice
sudo docker-compose up -d

#  Start MongoDB + Prisma Migration
Run MongoDB
sudo docker-compose up -d mongo
///////////////////////////
# Apply Prisma Migration
# Install Prisma CLI
npm install -g prisma

# Run migration (from backend folder)
cd backend
npx prisma migrate dev --name init


#Apply Prisma Migration

## 1. Build All Services
```bash
docker-compose build
docker-compose up -d