const Command = require("../../modules/Command.js");
const { get } = require("snekfetch");

class Chat extends Command {
  constructor(client) {
    super(client, {
      name: "chat",
      description: "Une image de chat.",
      usage: "chat"
    });
  }

  async run(message) {
    const { body } = await get("https://api.thecatapi.com/v1/images/search");
    message.delete();

    await message.channel.send({
      embed: {
        title: "Si l'image ne se charge pas, cliquez ici.",
        url: body[0].url,
        color: 6192321,
        image: {
          url: body[0].url
        },
        footer: {
          icon_url: message.author.avatarURL,
          text: `${message.author.tag}`
        }
      }
    });
  }
}

module.exports = Chat;
