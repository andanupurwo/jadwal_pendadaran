FROM node:18-alpine

WORKDIR /app

# Install dependencies first for caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Create uploads directory for backup/import
RUN mkdir -p uploads

# Expose port
EXPOSE 3000

# Start command: run initialization then start server
# Using sh -c to chain commands
CMD ["sh", "-c", "npm run init-db && npm start"]
