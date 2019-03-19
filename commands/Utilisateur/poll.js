/* eslint-disable no-unexpected-multiline */
const Command = require("../../modules/Command.js");
const Discord = require("discord.js");

class Poll extends Command {
  constructor(client) {
    super(client, {
      name: "poll",
      description:
        "Créer un sondage.",
      usage: "poll"
    });
  }

  async run(message, args) {
    try {
      const embed = new Discord.RichEmbed()
        .setTitle(args.join(" "))
        .setColor("#7289DA");
      const pollTitle = await message.channel.send({ embed });
      await pollTitle.react("✅");
      await pollTitle.react("❌");

      // Collecteurs

      const filter = reaction => reaction.emoji.name === "✅";
      const collector = pollTitle.createReactionCollector(filter, {
        time: 15000
      });
      collector.on("collect", r => console.log(`${r.emoji.name}`));
      collector.on("end", collected => console.log(`Le bot a collecté ${collected.size} ✅.`));

      const filter1 = reaction => reaction.emoji.name === "❌";
      const collector1 = pollTitle.createReactionCollector(filter1, {
        time: 15000
      });
      collector1.on("collect", r => console.log(`${r.emoji.name}`));
      collector1.on("end", collected => console.log(`Le bot a collecté ${collected.size} ❌.`));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Poll;
