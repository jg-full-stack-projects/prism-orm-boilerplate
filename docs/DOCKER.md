# Docker

To run the full stack Docker and docker-compose are required.

## Requirements

**OS**
| OS | Version |
| --- | --- |
| Linux | Any |
| Windows | 10 |
| MacOS | Any |

# Notes regarding Windows

It is possible to install Docker on Windows 10 Home, Docker documented the process on their [website](https://docs.docker.com/docker-for-windows/install-windows-home/).

# Running the stack

## Base - Production

```
docker-compose -f docker-compose.yml
```

## Base - Development

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml
```

## Running and building

```
${BASE-COMMAND} up --build
```

E.g.: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build`

# Caviats

When settings the database password via the .env file, save this password securely because changes in the .env regarding the database password **WILL NOT** reflect on the container after the first run.

To change the password access the container by running `docker-compose exec database bash`, after login to the root user with `mysql -u root -p` and run the query to change the password there.
