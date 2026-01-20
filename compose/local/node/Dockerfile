FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY public ./public
COPY eslint.config.mjs ./
COPY next.config.ts ./
COPY postcss.config.mjs ./
COPY tsconfig.json ./
COPY next-env.d.ts ./

COPY ./app ./app/

CMD ["npm", "run", "dev"]