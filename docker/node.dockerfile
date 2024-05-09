# Use the official Node.js image from Docker Hub with the specified version
FROM node:18.16.1-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 5173 to the outside world
EXPOSE 5173

# Command to run the React app in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
