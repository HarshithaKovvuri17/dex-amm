FROM node:18-alpine

# Install system dependencies required for native modules
RUN apk add --no-cache git python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# Compile smart contracts
RUN npx hardhat compile

# Default command (tests will be run manually via docker-compose)
CMD ["npx", "hardhat", "test"]
