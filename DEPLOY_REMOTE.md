# Remote Server Deployment

This project runs as a static Vite build served by unprivileged NGINX.

## Files Used

- `Dockerfile`
- `compose.yaml`
- `.dockerignore`

## 1. Copy Project To Server

From your local machine:

```bash
rsync -av --exclude node_modules --exclude dist \
  /Users/ronnie/Documents/Codex/2026-05-31/files-mentioned-by-the-user-pasted/ \
  user@your-server-ip:/opt/ronnie-terminal-portfolio/
```

Or clone/copy the project into:

```text
/opt/ronnie-terminal-portfolio
```

## 2. Install Docker On Ubuntu/Debian

On the remote server:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Optional, allow your user to run Docker:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

## 3. Start The Site

```bash
cd /opt/ronnie-terminal-portfolio
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

## 4. Firewall

The Compose file binds the site to `127.0.0.1:8181`, so it is only reachable from the server itself.

Do not open port `8181` publicly. Put the site behind NGINX, Caddy, or Cloudflare Tunnel and proxy to it locally.

## 5. Optional Domain With NGINX Reverse Proxy

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
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:8181;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
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

## 6. Updating The Site

After editing files or pulling changes:

```bash
cd /opt/ronnie-terminal-portfolio
docker compose up --build -d
```

Clean old unused Docker layers occasionally:

```bash
docker system prune -f
```
