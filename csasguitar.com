server {
    listen 80;
    listen [::]:80;

    server_name csasguitar.com www.csasguitar.com;

    root /var/www/csasguitar.com;

    location / {
        index index.html;
        # try_files $uri $uri/ =404;
    }

    location /fretboard-quiz {
        index index.html;
    }

    location /name {
        include proxy_params;
        proxy_pass http://0.0.0.0:5000;
    }

    location /scores {
        include proxy_params;
        proxy_pass http://0.0.0.0:5000;
    }
}
