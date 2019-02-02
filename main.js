const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

client.on("ready", () => {
  console.log("Je suis prêt !");
});

client.on("message", message => {
  if (message.content.startsWith("salut"))
    message.channel.send("Salut à toi !");
});

client.login(process.env.CLIENT_TOKEN);
