\# Remote Server Deployment



This project runs as a static Vite build served by unprivileged NGINX.



\## Files Used



\- `Dockerfile`

\- `compose.yaml`

\- `.dockerignore`



\## 1. Copy Project To Server



From your local machine:



```bash

rsync -av --delete --exclude node\_modules --exclude dist \\

&#x20; /Users/ronnie/Documents/Codex/2026-05-31/files-mentioned-by-the-user-pasted/ \\

&#x20; root@72.60.31.51:/docker/ronnie-terminal-portfolio

```



Optional cleaner sync, excluding Git metadata too:



```bash

rsync -av --delete --exclude node\_modules --exclude dist --exclude .git \\

&#x20; /Users/ronnie/Documents/Codex/2026-05-31/files-mentioned-by-the-user-pasted/ \\

&#x20; root@72.60.31.51:/docker/ronnie-terminal-portfolio

```



Or clone/copy the project into:



```text

/docker/ronnie-terminal-portfolio

```



\## 2. Install Docker On Ubuntu/Debian



On the remote server:



```bash

sudo apt update

sudo apt install -y ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb \[arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release \&\& echo "$VERSION\_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

```



Optional, allow your user to run Docker:



```bash

sudo usermod -aG docker $USER

newgrp docker

```



\## 3. Start The Site



```bash

cd /docker/ronnie-terminal-portfolio

docker compose up --build -d

```



Check status:



```bash

docker compose ps

docker compose logs -f

```



The site should be available at:



```text

http://127.0.0.1:8181

```



\## 4. Firewall



The Compose file binds the site to `127.0.0.1:8181`, so it is only reachable from the server itself.



Do not open port `8181` publicly. Put the site behind NGINX, Caddy, or Cloudflare Tunnel and proxy to it locally.



\## 5. Optional Domain With NGINX Reverse Proxy



Install NGINX:



```bash

sudo apt install -y nginx

```



Create:



```bash

sudo nano /etc/nginx/sites-available/ronnie-terminal-portfolio

```



Use this config, replacing `example.com`:



```nginx

server {

&#x20;   listen 80;

&#x20;   server\_name example.com www.example.com;



&#x20;   location / {

&#x20;       proxy\_pass http://127.0.0.1:8181;

&#x20;       proxy\_set\_header Host $host;

&#x20;       proxy\_set\_header X-Real-IP $remote\_addr;

&#x20;       proxy\_set\_header X-Forwarded-For $proxy\_add\_x\_forwarded\_for;

&#x20;       proxy\_set\_header X-Forwarded-Proto $scheme;

&#x20;   }

}

```



Enable it:



```bash

sudo ln -s /etc/nginx/sites-available/ronnie-terminal-portfolio /etc/nginx/sites-enabled/

sudo nginx -t

sudo systemctl reload nginx

```



Then allow HTTP/HTTPS:



```bash

sudo ufw allow "Nginx Full"

```



For HTTPS:



```bash

sudo apt install -y certbot python3-certbot-nginx

sudo certbot --nginx -d example.com -d www.example.com

```



\## 6. Updating The Site



After editing files or pulling changes:



```bash

cd /docker/ronnie-terminal-portfolio

docker compose up --build -d

```



Clean old unused Docker layers occasionally:



```bash

docker system prune -f

```



