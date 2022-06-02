FROM nginx
WORKDIR /app
COPY dist .

COPY cert/ /cert/
COPY nginx.conf /etc/nginx/nginx.conf
