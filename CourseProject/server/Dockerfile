FROM node:20

WORKDIR /app

COPY package*.json ./

# Установим все зависимости, включая devDependencies
RUN npm install

# Установим tsx глобально
RUN npm install -g tsx

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
