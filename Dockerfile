# Use the official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8081

# Define the command to run your app
CMD ["npm", "start"]
