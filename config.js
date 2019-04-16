const config = {
  defaultSettings: {
    prefix: "_",
    modLogChannel: "silent-logs",
    modRole: "Duelist",
    adminRole: "Master",
    systemNotice: true
  },
  dashboard: {
    oauthSecret: "9UQ9VQNi8xUTt2h8nNv-TiPnVM56gWoF",
    callbackUrl: "http://localhost:3030/callback",
    sSecret: "sky says hi",
    domain: "localhost",
    port: "3030"
  },
  permLevels: [
    { level: 0, name: "Utilisateur", check: () => true },
    {
      level: 1,
      name: "Duelist",
      check: message => {
        try {
          const modRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()
          );
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 2,
      name: "Master",
      check: message => {
        try {
          const adminRole = message.guild.roles.find(
            r =>
              r.name.toLowerCase() === message.settings.adminRole.toLowerCase()
          );
          if (adminRole && message.member.roles.has(adminRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 3,
      name: "Flareon",
      check: message => message.client.appInfo.owner.id === message.author.id
    }
  ]
};

module.exports = config;
