const { default: axios } = require('axios');
const Commands = require('./commands');
const prefix = '!';

const MessageHandler = async function (message, analyticsUrl, analyticsId) {
  // Ignore messages from other bots
  if (message.author.bot) {
    return
  }

  const command = findCommand(message);
  if (!command) {
    return;
  }

  if (!isAuthorized(message, command)) {
    return;
  }

  sendMessage(message, command)

  trackMessage(message, analyticsUrl, analyticsId);
}

const findCommand = (message) => {
  if (!startsWithPrefix(message)) {
    return null;
  }

  const commandStr = message.content.substring(1);
  const command = Commands[commandStr];
  if (!command) {
    return null;
  }

  return command;
}

const startsWithPrefix = (message) => {
  const { content } = message;
  if (!content.startsWith(prefix)) {
    return false;
  }

  return true;
}

const isAuthorized = (message, command) => {
  for (let role of command.roleIds) {
    if (message.member.roles.cache.has(role)) {
      return true;
    }
  }

  return false;
}

const sendMessage = (message, command) => {
  if (command.file) {
    message.reply(command.text);
    message.channel.send({ files: [command.file] });
  } else {
    message.reply(command.text);
  }
}

const trackMessage = async (message, analyticsUrl, analyticsId) => {
  try {
    const commandStr = message.content.substring(1);
    await axios.post(analyticsUrl, JSON.stringify({
      Kind: analyticsId,
      Extra: `${commandStr}.${message.channelId}`
    }),
      {
        proxy: false,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'the-duckling'
        },
      });

  } catch (e) {
    console.error(e);
  }
}

module.exports = MessageHandler;
