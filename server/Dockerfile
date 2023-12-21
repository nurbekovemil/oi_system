FROM node:16.15.0 as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
EXPOSE 8088
CMD ["npm","start"]
