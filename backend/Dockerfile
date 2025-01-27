FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Installer les dépendances de compilation
RUN apk add --no-cache python3 make g++ 

# Forcer la recompilation de bcrypt
RUN npm install bcrypt --build-from-source

# Installer le reste des dépendances
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]