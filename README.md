An inventory manager powered with react, electron, and a postgresql database.

# Getting Started


## Setting up your local db

Enter pg console:

```sh
psql postgres
```

Run the following commands within pg console:
```sh
CREATE ROLE me WITH LOGIN PASSWORD 'password1';

ALTER ROLE me CREATEDB;
```

## Start up the api and client
Run the following commands in two individual terminal instances:

```sh
cd server && npm install && npm run db:init && npm run start
```

```sh
cd client && npm install && npm run start
```

