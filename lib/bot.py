"""
Import local and installed modules
"""
import os
import discord
from functions import load_env, get_stats, register, default, commands

# Load the env variables
load_env()
BOT_TOKEN = os.getenv("BOT_TOKEN")

# Get the prefix from the .env file if it exists
PREFIX = "!"
if os.getenv("PREFIX") is not None:
    PREFIX = os.getenv("PREFIX")
client = discord.Client(intents=discord.Intents.default())


async def get_command(message):
    """Map the functions to call based on the incoming command"""
    command = message.content.lower()[1:].split(" ")[0]
    switcher = {

        commands[0]: register,

        commands[1]: get_stats,
    }

    return await switcher.get(command, default)(message)


try:
    @ client.event
    async def on_ready():
        """Print to the console when the bot is ready"""
        print(f'{client.user} has connected to Discord!')

    @ client.event
    async def on_message(message):
        """Listen in on messages"""
        first_char = message.content[0]
        if first_char == PREFIX:

            await get_command(message)

    client.run(BOT_TOKEN)
except AttributeError:
    print("Environment variable is not set.\nPlease configure your .env file (see the docs)")
