# Use Node.js LTS (Long Term Support) as base image
FROM node:20-slim

# Set working directory
WORKDIR /usr/src/app

# Install OpenSSL and other required dependencies
RUN apt-get update -y && \
    apt-get install -y openssl && \
    apt-get install -y libssl-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Expose port
EXPOSE 7000

# Create entrypoint script
RUN echo '#!/bin/bash\n\
    npx prisma migrate deploy\n\
    npm start' > /usr/src/app/entrypoint.sh

RUN chmod +x /usr/src/app/entrypoint.sh

# Set entrypoint
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]