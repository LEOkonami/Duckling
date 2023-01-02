require('dotenv').config()

const { Client, Intents } = require('discord.js');
const MessageHandler = require('./message-handler');

// Instantiate a new client with some necessary parameters.
const split = process.env.DISCORD_INTENTS.split(',');
const intents = split.map(intent => Intents.FLAGS[intent]);

const client = new Client({ intents });

// Notify progress
client.on('ready', function (e) {
  console.log(`Logged in as ${client.user.tag}!`)
});

// Authenticate
client.login(process.env.DISCORD_TOKEN);

client.on(
  'messageCreate',
  message => MessageHandler(
    message,
    process.env.ANALYTICS_URL,
    Number(process.env.ANALYTICS_KIND)
  )
)
