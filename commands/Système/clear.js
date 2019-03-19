const Command = require("../../modules/Command.js");

class Clear extends Command {
  constructor(client) {
    super(client, {
      name: "clear",
      description: "Nettoyer un nombre de messages spécifiés.",
      usage: "clear",
      category: "Système",
      permLevel: "Duelist"
    });
  }

  async run(message, args) {
    try {
      await message.delete();
      const msgToDelete = args[0]
        ? `**${args[0]} messages supprimés.**`
        : "Salon nettoyé (100 messages maximum par commande)";
      message.channel.fetchMessages({ limit: args[0] }).then(messages => {
        message.channel.bulkDelete(messages);
        message.channel.send(msgToDelete).then(msg => msg.delete(3000));
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Clear;
