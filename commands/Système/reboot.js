const Command = require("../../modules/Command.js");

class Reboot extends Command {
  constructor(client) {
    super(client, {
      name: "reboot",
      description: "Eteindre et relancer le bot.",
      usage: "reboot",
      guildOnly: true,
      category: "Système",
      permLevel: "Flareon"
    });
  }

  async run(message) {
    try {
      message.delete();
      await message.channel.send(":gear: Le bot est en train de redémarrer !");
      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd);
      });
      process.exit(1);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Reboot;
