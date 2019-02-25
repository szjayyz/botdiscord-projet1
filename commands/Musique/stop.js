const Command = require("../../modules/Command.js");

class Stop extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      category: "Musique",
      description: "Arrêter la musique.",
      usage: "stop"
    });
  }

  run(message) {
    const { voiceChannel } = message.member;
    if (!voiceChannel)
      return message.channel.send(
        "Vous devez être dans un salon vocal pour utiliser cette commande !"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Il n'y a aucune musique à arrêter !");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("La commande stop a été utilisé !");
  }
}

module.exports = Stop;
