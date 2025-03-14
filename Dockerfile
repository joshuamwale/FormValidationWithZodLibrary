FROM node:18-alpine AS builder

#setting the working directory
WORKDIR /app

#copy package.json and package-lock.json for dependency installation
COPY package*.json ./

#install dependencies
RUN npm install

#copy the rest of the application code
COPY . .
  
#build the Next.js app
RUN npm run build

#use a smaller image for the final stage #Alpine Linux is about 5MBs
FROM node:18-alpine

#expose the port the app runs on
EXPOSE 3000

#Start the Next.js app
CMD ["npm", "start"]