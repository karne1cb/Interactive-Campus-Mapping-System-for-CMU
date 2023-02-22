# Base image
FROM node:latest
# Make folder to put our files in
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend
# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app/backend
# Copy package json and install dependencies
COPY package*.json ./
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
# Copy app
COPY . .
# Expose port to access server
EXPOSE 9000
# Command to run our app
CMD [ "npm", "start"]