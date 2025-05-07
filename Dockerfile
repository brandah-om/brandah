# Use the official Node.js base image
FROM node:20.11.1

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Expose the desired port (change if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]

