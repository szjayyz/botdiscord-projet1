const Command = require("../../modules/Command.js");

class Level extends Command {
  constructor(client) {
    super(client, {
      name: "level",
      description:
        "Renvoie le nvieau et les points d'expérience de l'utilisateur.",
      usage: "level",
      aliases: ["lvl"]
    });
  }

  run(message) {
    message.channel.send(
      `Tu as actuellement ${this.client.points.get(
        `${message.guild.id}-${message.author.id}`,
        "points"
      )} points d'expérience, et tu es niveau ${this.client.points.get(
        `${message.guild.id}-${message.author.id}`,
        "level"
      )}!`
    );
  }
}

module.exports = Level;
