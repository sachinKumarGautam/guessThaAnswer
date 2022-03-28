# build ===============================
FROM node:16 as build

WORKDIR /guessitapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# run ===============================
FROM node:16-alpine as run

WORKDIR /guessitapp

COPY --from=build /guessitapp .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
