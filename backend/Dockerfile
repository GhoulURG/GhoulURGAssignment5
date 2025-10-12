# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create directory for SQLite data
RUN mkdir -p /app/data

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]
