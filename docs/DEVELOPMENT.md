# Required packages

| Technology   | Version                          |
| ------------ | -------------------------------- |
| `Python 3.X` | latest                           |
| `pip`        | Matching with the Python version |

## Dependencies

| Framework       | Required    |
| --------------- | ----------- |
| `Discord.py`    | yes         |
| `Python-dotenv` | yes         |
| `pylint`        | recommended |

Run `pip3 install -U python-dotenv discord.py pylint` or `pip install -U python-dotenv discord.py pylint` to install the dependencies depending on what version of PIP is installed on your machine.

## Linting

To lint the code, make sure pylint is installed and run `pylint <PATH_TO_FILE>`. The linting CI must pass before a merge request is approved.

# Environment variables

Create a `.env` file in the root folder and popluate it with the following variables, please note that you must set the `MYSQL_ROOT_PASSWORD` variable to a strong password in production.
| Variable | Default | Production |
| ---------- | ------- | -----|
| `BOT_TOKEN` | | X |
| `PREFIX` | ! | |
|`MYSQL_ROOT_PASSWORD` | root | X |

## Running the project
To run the project use the following commands

- Run the local dev environment
    ```
    # In case of the standalone binary 
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
    # In case of the plugin
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
    ```
- Run the test suite
    ```
    # In case of the standalone binary 
    docker-compose -f docker-compose.yml -f docker-compose.test.yml up --build --abort-on-container-exit
    # In case of the plugin
    docker compose -f docker-compose.yml -f docker-compose.test.yml up --build --abort-on-container-exit
    ```
- Run the production code
    ```
    # In case of the standalone binary 
    docker-compose -f docker-compose.yml up -d
    # In case of the plugin
    docker compose -f docker-compose.yml up -d
    ```

## Required software
|Software|
|----|
|Docker|
|Docker Compose standalone binary/plugin|

**Docker-ce is recommended for 100% compatibility**

### Install the docker-compose binary (latest)
This is only supported for Linux (x86) if you are running another OS please have a look at https://docs.docker.com/compose/install/linux/#install-using-the-repository and https://docs.docker.com/compose/install/other/

Please note you need to have `jq` installed on your system to run this command

```
# Systemwide install
DC_VERSION=$(curl https://api.github.com/repos/docker/compose/releases/latest | jq .name -r); sudo curl -SL https://github.com/docker/compose/releases/download/$DC_VERSION/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose; sudo chmod +x /usr/local/bin/docker-compose

# Install it on your local user
DC_VERSION=$(curl https://api.github.com/repos/docker/compose/releases/latest | jq .name -r); curl -SL https://github.com/docker/compose/releases/download/$DC_VERSION/docker-compose-linux-x86_64 -o ~/.local/bin/docker-compose; chmod +x $_
```

# Running docker-compose with podman as the backend
If you want to use podman or cannot use docker with the latest docker-compose you can redirect the backend to podman and use docker-compose with podman instead. You can also try this if your distro has no docker-ce available and has podman preinstalled by default (e.g. Silverblue/Kinoite) 

First we need to activate the podman socket service and start it
```
sudo systemctl enable --now podman.socket
```

And point the DOCKER\_SOCKET to the podman socket 
`export DOCKER_HOST=unix:///run/user/$UID/podman/podman.sock`. 

**It is recommended to make these changes persistent by putting them in your shell rc file (.bashrc,.zshrc etc.).** 
For exapmle if you are using ZSH run 
```
echo "export DOCKER_HOST=unix:///run/user/$UID/podman/podman.sock" >> ~/.zshrc
```

For Bash (run this if you don't know which shell you are running) you need to run 
```
echo "export DOCKER_HOST=unix:///run/user/$UID/podman/podman.sock" >> ~/.bashrc
```
