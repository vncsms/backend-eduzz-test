
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
DB_HOST=localhost
```

Install dependencies

```bash
  npm install
```

Install postgres' docker

```bash
  docker compose up -d
```

Run the app

```bash
  npm run dev
```




## API Reference

#### Create a new user

```http
  POST /user
```

Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nome` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**.  |

#### User login

```http
  POST /user/login
```
Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**.  |


## All endpoints below requires bearer token from login

#### Deposit money

```http
  POST /transaction
```
Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `value` | `number` | **Required**. |

#### Buy crypto

```http
  POST /cryptoTransaction
```
Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `quantity` | `number` | **Required**. |

#### Sell crypto

```http
  POST /cryptoTransaction/sell
```
Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `quantity` | `number` | **Required**. |


#### List transactions

```http
  GET /cryptoTransaction?limit=10&page=0
```
Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `limit` | `number` | **Optional**. Number of transaction per page|
| `page` | `number` | **Optional**. Offset|

#### Get balance

```http
  GET /account/balance
```

#### Get execution price

```http
  GET /cryptoTransaction/executionPrice
```
#### Get extract

```http
  GET /account/extract?days=10
```

Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `days` | `number` | **Optional**. Extract range|

#### Get volume

```http
  GET /account/volume
```


