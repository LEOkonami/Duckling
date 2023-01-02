# Duckling Bot
This project lets you create new commands and update the message handler of The Duckling discord bot.

To run/test this code, you need to [set up your own bot](https://www.alpharithms.com/how-to-code-a-discord-bot-in-javascript-444917/).

Additionally, you need to create an `.env` file like this:

```
DISCORD_TOKEN=<discord bot token here>
```

## Sample code for initializing the bot
```
require('dotenv').config()

const { Client, Intents } = require('discord.js');

// Instantiate a new client with some necessary parameters.

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.Flags.GUILD_MESSAGES] });

// Notify progress
client.on('ready', function (e) {
  console.log(`Logged in as ${client.user.tag}!`)
});

// Authenticate
client.login(process.env.DISCORD_TOKEN);

client.on('messageCreate', message => {
    console.log(message)
})
```

## Command Structure
The commands configuration file is a JSON file. Each key specified a command. The value is defined like this:
```
id: number; // <some GUID>,
roleIds: string[]; // <An array of server roles who can use this command>,
text: string[]; // Reply message text
file?: string; // Optional. Url of file to preview in the reply
```

Note: To get a role id, make sure the role is mentionable in the discord server, then type `\@<role name>`