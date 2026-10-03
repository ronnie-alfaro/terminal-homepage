# Remote deployment

The site is static and can be served from the output of `npm run build` or from the included Docker image.

## Build and run the container

```bash
docker compose up --build -d
```

The Compose service listens on `127.0.0.1:8181` on the host. Check it locally with:

```bash
curl -I http://127.0.0.1:8181/
```

For public access, configure your existing HTTPS reverse proxy to forward the desired hostname to `127.0.0.1:8181`. Keep TLS certificates and host-specific configuration in that deployment environment.

## Update

After pulling the intended revision, run `docker compose up --build -d` again. Check the site and the CV download before retiring the prior deployment.
