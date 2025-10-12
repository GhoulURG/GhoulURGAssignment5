# Use Node.js 18 on Alpine Linux
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Create directory for SQLite database
RUN mkdir -p /app/data

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
