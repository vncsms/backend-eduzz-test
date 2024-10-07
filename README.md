
# Teste de Dev Backend


## Requirements

- NodeJS v18

- Docker version 27.3.1


## Run Locally

Clone the project

```bash
  git clone https://github.com/vncsms/backend-eduzz-test
```

Go to the project directory

```bash
  cd backend-eduzz-test
```

Create a `.env`

```bash
  touch .env
```

Copy the content to `.env`

```bash
STAGE = 'DEV'
SERVER_PORT = '3333'
JWT_KEY = 'secret'
CRYPTO_API_URL = 'https://www.mercadobitcoin.net/api/BTC/ticker/'
SALT_ROUNDS = '2'
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=cryptodb
DB_HOST=172.21.0.1
SUBNET=172.21.0.0/16
```

Git permissions to build.sh

```bash
  chmod +x build.sh
```

Execute build file

```bash
  ./build.sh
```
