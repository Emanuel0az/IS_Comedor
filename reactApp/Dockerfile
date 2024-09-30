FROM node:22.9.0
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install chart.js
RUN npm install recharts
ENV CHOKIDAR_USEPOLLING=true
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]