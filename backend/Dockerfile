FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package.json ./
RUN npm i
RUN npm i -g typescript
RUN npm i mongoose
RUN npm run build
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]