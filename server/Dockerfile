FROM node:16.15.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8088
CMD ["npm","start"]
