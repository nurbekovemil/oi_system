FROM node:16.15.0-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache ttf-dejavu
RUN npm ci
COPY . .
EXPOSE 8088
CMD ["sh","-c","npm install && npm start"]
