FROM ubuntu:22.04 as base
WORKDIR /usr/sequelize

# Install dependencies
RUN apt update
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN pip install -U python-dotenv discord.py pylint requests
RUN apt-get install nodejs

# Install global dependencies
RUN npm i -g npm@latest
RUN npm i -g nodemon

# Install the dependencies
RUN cd app && npm ci --silent

FROM base as api-dev
WORKDIR /usr/sequelize/app
CMD ["npm", "run", "dev"]


FROM base as api-prod
WORKDIR /usr/sequelize/app
RUN npm ci --silent
CMD ["npm", "run", "start"]
