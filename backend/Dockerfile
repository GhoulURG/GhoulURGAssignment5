# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Create directory for SQLite database
RUN mkdir -p /app/data

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]

