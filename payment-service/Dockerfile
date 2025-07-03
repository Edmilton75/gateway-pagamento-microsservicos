# Estágio 1: Construir a aplicação
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Criar a imagem final de produção
FROM node:20-alpine
WORKDIR /usr/src/app

# Instala o curl para o healthcheck funcionar
RUN apk add --no-cache curl

# Copia os artefatos do estágio de build
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]