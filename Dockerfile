FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 3005

CMD [ "npm", "run", "server" ]
