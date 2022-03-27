# cloudflare-cors-worker

Proxies traffic & adds CORS headers

# Usage

Call deployed worker with `X-Request-URL` set to target URL, whatever is set for the methods, other headers will be passed on to `X-Request-URL` & the response returned from this worker will be the original response plus all CORS enabling headers

# Deploy

• Run `yarn setup`

• Create [cloudflare worker](https://workers.cloudflare.com/)

• Replace route in `wrangler.toml` to your worker above

• Run `yarn run wrangler publish --env production`
