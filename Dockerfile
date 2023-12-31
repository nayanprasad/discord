FROM node:18 as development

WORKDIR /usr/app

COPY package*.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 3000
EXPOSE 3306

CMD ["sh", "-c", "npx prisma generate && npx prisma db push && pnpm run dev"]
