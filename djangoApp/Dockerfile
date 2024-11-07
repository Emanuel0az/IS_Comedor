FROM python:3.12.5
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt --no-cache-dir
# COPY wait-for-it.sh ./
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*
RUN curl -o ./wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x ./wait-for-it.sh
RUN pip install djangorestframework-simplejwt
COPY . .
EXPOSE 8000