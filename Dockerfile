FROM ubuntu:20.04 as base
SHELL [ "/bin/bash", "-l", "-c" ]
WORKDIR /usr/bot

# Install dependencies
RUN apt update
RUN apt install python3 python3-pip -y
RUN ln -snf /usr/bin/python3 /usr/bin/python && \
    ln -snf /usr/bin/pip3 /usr/bin/pip
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN pip install -U python-dotenv discord.py pylint requests
RUN apt-get install nodejs

# Install global dependencies
RUN npm i -g nodemon

# Execute the container as a non-privileged user
RUN useradd -m phyllis
COPY . /usr/bot
RUN mkdir -p app/node_modules
RUN chmod 777 -R /usr/bot/
USER phyllis
RUN cd app && npm ci --silent

FROM base as python-development
RUN pip install discord.py
CMD ["nodemon", "--watch", "lib", "lib/bot.py"]

FROM base as python-production
RUN pip install discord.py
CMD ["python", "lib/bot.py"]

FROM base as api-dev
WORKDIR /usr/bot/app
CMD ["npm", "run", "dev"]


FROM base as api-prod
RUN npm ci --silent
CMD ["npm", "run", "start"]
