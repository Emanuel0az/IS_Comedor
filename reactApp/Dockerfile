FROM node:22.9.0
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV CHOKIDAR_USEPOLLING=true
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]