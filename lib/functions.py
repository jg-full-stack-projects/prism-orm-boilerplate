
""" Import the libraries """
import os
from dotenv import load_dotenv, find_dotenv
import requests
# Define functions
commands = ['register', 'stats']


def load_env():
    """ Load the environment variables from the .env file """
    load_dotenv(find_dotenv())


URL = os.getenv("URL") or 'http://api'
PORT = os.getenv("PORT") or 1337


async def register(message):
    """ Welcome the user to the bot """
    if message.author.bot:
        await message.channel.send(
            'This account can not be registered, try using a non-bot account.')
    else:
        register_res = requests.post(
            f'{URL}:{PORT}/api/v2/register', data={'userId': message.author.id})
        register_json = register_res.json()
        if register_json['status'] == 'exists':
            await message.channel.send(
                'Your account is already registered!')
        else:
            await message.channel.send(
                'Welcome to the Adventure Bot, your account is now registered!')


async def get_stats(message):
    """ Placeholder function """
    requests.post(
        f'{URL}:{PORT}/api/v2/user/get-stats', data={'auth': message.author.id})
    await message.channel.send('Hello')


async def default(message):
    """ Default function """
    await message.channel.send(
        f'Unkown command, please use one of the following command {", ".join(commands)}')
