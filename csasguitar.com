server {
    listen 80;
    listen [::]:80;

    server_name csasguitar.com www.csasguitar.com;

    root /var/www/csasguitar.com;

    location / {
        # index index.html;
        try_files $uri $uri/ /index.html =404;
    }

    location /fretboard-quiz {
        # index index.html;
        try_files $uri $uri/ /index.html =404;
    }

    location /api {
        include proxy_params;
        proxy_pass http://0.0.0.0:5000;
    }
}
