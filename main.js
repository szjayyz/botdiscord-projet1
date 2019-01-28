const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log("Je suis prêt !");
});

client.on("message", message => {
  if (message.content.startsWith("salut"))
    message.channel.send("Salut à toi !");
});

client.login(config.token);
