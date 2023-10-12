# essentials

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install

# bun
bun install
```
"tx": {
                "from": "address:sender",
                "to": "sc:contract",
                "egldValue": "0",
                "esdtValue": [
                    {
                        "tokenIdentifier": "str:MYFUNGIBLE-000001",
                        "value": "250,000,000,000"
                    },
                    {
                        "tokenIdentifier": "str:MYSFT-123456",
                        "nonce": "24",
                        "value": "1"
                    }
                ]
                "function": "contractEndpoint",
                "arguments": [
                    "str:argument-1",
                    "1234",
                    "",
                    "str:a message (as bytes)"
                ],
                "gasLimit": "5,000,000",
                "gasPrice": "0"
            },
            "expect": {
                "out": [
                    "5",
                    "*"
                ],
                "status": "",
                "logs": [
                    {
                        "address": "sc:contract",
                        "endpoint": "str:contractEndpoint",
                        "topics": [
                            "str:topic-1",
                            "str:topic-2"
                        ],
                        "data": "str:log-value"
                    }
                ],
                "gas": "*",
                "refund": "*"
            }
### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev

# bun
bun run dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build

# bun
bun run build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint

# bun
bun run lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
# mx-scenario-simulator-ai
