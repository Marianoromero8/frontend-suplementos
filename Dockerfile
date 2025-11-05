FROM node:20-alpine
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos todas las dependencias (incluidas devDependencies)
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de Vite
EXPOSE 5173

# Comando de desarrollo
CMD ["npm", "run", "dev"]
