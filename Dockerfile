FROM ubuntu:22.04 as base

ENV NODE_VERSION 18
ENV ROOT_DIR /usr/prism

RUN mkdir $ROOT_DIR
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

WORKDIR $ROOT_DIR

# Install dependencies
RUN apt-get update && apt-get upgrade -y
RUN apt install curl openssl -y
RUN curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
RUN apt install nodejs build-essential libpq-dev -y

# Run NPM tasks
RUN npm i -g npm@latest
RUN npm i -g nodemon

# Create rootless user and give permissions on the folders required
COPY . $ROOT_DIR
RUN useradd -m node
RUN chown node:node -R $ROOT_DIR
USER node

FROM base as api
WORKDIR $ROOT_DIR/app
RUN npm ci --silent
RUN npm run db:generate

FROM api as api-dev
CMD ["npm", "run", "dev"]

FROM api as api-prod
CMD ["npm", "run", "start"]
