# Stage 1: Build the frontend
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Build the production-ready frontend
RUN npm run build

# Accept build argument 
ARG VITE_API_URL 
ENV VITE_API_URL=$VITE_API_URL

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose nginx default port
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
