module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(messageReaction, user) {
    const message = messageReaction.message;
    const member = message.guild.members.get(user.id);
    const channel = message.guild.channels.find(c => c.name === "test-bot");
    if (member.user.bot) return;

    const greenRole = message.guild.roles.get("560080739853402165");
    const redRole = message.guild.roles.get("560080768437846026");

    if (
      ["greencolor", "redcolor"].includes(messageReaction.emoji.name) &&
      message.channel.id === channel.id
    ) {
      switch (messageReaction.emoji.name) {
        case "greencolor":
          member.removeRole(greenRole);
          message.channel
            .send(`Le rôle **${greenRole.name}** a été supprimé avec succès !`)
            .then(msg => msg.delete(2500));
          break;
        case "redcolor":
          member.removeRole(redRole);
          message.channel
            .send(`Le rôle **${redRole.name}** a été supprimé avec succès !`)
            .then(msg => msg.delete(2500));
          break;
      }
    }
  }
};
