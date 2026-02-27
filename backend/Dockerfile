# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose port (default 3000)
EXPOSE 3000

# Define environment variables (can be overridden by docker-compose)
ENV PORT=3000

# Start the application
CMD ["npm", "start"]
