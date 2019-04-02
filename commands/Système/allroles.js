const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");

class Allroles extends Command {
  constructor(client) {
    super(client, {
      name: "allroles",
      description: "Afficher tous les rôles disponibles avec des réactions.",
      usage: "allroles",
      category: "Système",
      permLevel: "Flareon"
    });
  }

  async run(message) {
    try {
      message.delete();
      const greenRole = message.guild.roles.get("560080739853402165");
      const redRole = message.guild.roles.get("560080768437846026");

      const greenEmoji = this.client.emojis.find(
        emoji => emoji.name === "greencolor"
      );
      const redEmoji = this.client.emojis.find(
        emoji => emoji.name === "redcolor"
      );

      const embed = new RichEmbed()
        .setTitle("Rôles")
        .setDescription(
          "Cliquez sur une des réactions ci-dessous pour obtenir le rôle correspondant."
        )
        .setColor("#dc143c")
        .addField(
          "Les rôles disponibles:",
          `
          ${greenEmoji} - ${greenRole.toString()}
          ${redEmoji} - ${redRole.toString()}
          `
        );

      message.channel.send(embed).then(async msg => {
        await msg.react(greenEmoji);
        await msg.react(redEmoji);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Allroles;
