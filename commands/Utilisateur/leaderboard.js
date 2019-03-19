/* eslint-disable no-unexpected-multiline */
const Command = require("../../modules/Command.js");
const Discord = require("discord.js");

class Leaderboard extends Command {
  constructor(client) {
    super(client, {
      name: "leaderboard",
      description:
        "Renvoie un classement du serveur actuel (top 10).",
      usage: "leaderboard",
      aliases: ["lead"]
    });
  }

  async run(message) {
    const filtered = this.client.points
      .filter(p => p.guild === message.guild.id)
      .array();
    const sorted = filtered.sort((a, b) => b.points - a.points);
    const classment = sorted.splice(0, 10);

    const embed = new Discord.RichEmbed()
      .setColor("#dc143c");
    for (const data of classment) {
      embed.addField(
        this.client.users.get(data.user).tag,
        `${data.points} points (niveau ${data.level})`
      );
    }
    message.delete();
    return message.channel.send({ embed }).then(msg => msg.delete(5000));
  }
}

module.exports = Leaderboard;
