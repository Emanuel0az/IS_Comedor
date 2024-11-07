FROM node:22.9.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install
RUN npm install chart.js recharts
RUN npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
RUN npm install js-cookie

# Configuración para entornos de desarrollo que utilizan polling de archivos
ENV CHOKIDAR_USEPOLLING=true

# Copia el resto del código al contenedor
COPY . .

# Expone el puerto 5173 para que la aplicación sea accesible
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
