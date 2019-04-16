module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {
    await this.client.wait(1000);

    this.client.appInfo = await this.client.fetchApplication();
    setInterval(async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);

    this.client.user.setActivity("with Alex");

    require("../modules/dashboard.js")(this.client);

    const channel = this.client.channels.get("560079403598741515");
    channel.send(":gear: Le bot est redémarré !");

    this.client.logger.log(
      `Flareon est prêt à espionner ${
        this.client.users.size
      } utilisateurs sur ${this.client.channels.size} salons.`,
      "ready"
    );
  }
};
