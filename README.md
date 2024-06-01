# nestjs-codebase

## Resource

- Project Name: `nestjs-codebase`
- Title: Nestjs-codebase

## Config

```bash
$ cp .env.example .env
```

Config your env

## Installation

```bash
$ yarn install
```

```bash
$ npm run seed-refresh
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

- setup nestjsx\crud | crud nestjsx with pacakge | nestjs crud | crud nestjs with pacakage
- yarn run mig-gen database/migrations/{Name}

## seed-referesh

```bash
# Delete all tables in mysql manually
```

### Drop all tables from database

```bash
  "drop-db": "npm run typeorm schema:drop",
```

## Note:

Key: check_in_keep_or_env_same45

- npx prettier --write . "Fix: Delete `␍`eslintprettier/prettier fix it "

## Fix error Cannot destructure property 'parsed' of 'req' as it is null.

- Check this: https://github.com/nestjsx/crud/issues/835#issuecomment-2143284774
