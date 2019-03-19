const Command = require("../../modules/Command.js");

class Cleanup extends Command {
  constructor(client) {
    super(client, {
      name: "cleanup",
      description: "Nettoyer un nombre de messages spécifiés.",
      usage: "cleanup",
      category: "Système",
      permLevel: "Duelist"
    });
  }

  async run(message) {
    const filtered = this.client.points.filter(p => p.guild === message.guild.id);
    const date = new Date();
    const removed = filtered.filter(
      data =>
        !message.guild.members.has(data.user) || date - 2592000000 > data.lastSeen
    );
    removed.forEach(data => {
      this.client.points.delete(`${message.guild.id}-${data.user}`);
    });
    message.channel.send(`J'ai supprimé ${removed.size} membres.`);
  }
}

module.exports = Cleanup;
