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

    this.client.user.setActivity("Faut Savoir ce que tu veux");

    const channel = this.client.channels.get("539467117939130398");
    channel.send(":gear: Le bot est redémarré !");

    this.client.logger.log(
      `Flareon est prêt à espionner ${
        this.client.users.size
      } utilisateurs sur ${this.client.channels.size} salons.`,
      "ready"
    );
  }
};
