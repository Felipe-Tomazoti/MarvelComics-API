FROM node:20.12-alpine

WORKDIR /app

COPY ./tsconfig.json ./
COPY ./package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]

