# Base image
FROM node:latest
# Make folder to put our files in
RUN mkdir -p /usr/src/appdocker 
RUN mkdir -p /usr/src/app/frontend
# add src folder as a volume
VOLUME /usr/src/app/frontend/src
# Set working directory so that all
# subsequent command runs in this folder
WORKDIR /usr/src/app/frontend
# Copy package json and install dependencies
COPY package*.json ./
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
# Copy our app
COPY . .
# Expose port to access server
EXPOSE 3000
# Command to run our app
CMD ["npm", "run", "dev"]