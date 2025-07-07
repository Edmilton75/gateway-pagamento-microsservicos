FROM node:20-alpine

# Instala o curl para o healthcheck funcionar
RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]