FROM mcr.microsoft.com/playwright:v1.54.0-jammy

WORKDIR /app

# Zainicjalizuj Node.js i zainstaluj zależności
RUN npm init -y
RUN npm install express body-parser @playwright/test

# Skopiuj pliki do kontenera
COPY server.js .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]
