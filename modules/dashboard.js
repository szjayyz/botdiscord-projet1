const express = require("express");
const dashboard = express();
const path = require("path");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

module.exports = client => {
  // root/dashboard/
  const dashboardDirectory = path.resolve(
    `${process.cwd()}${path.sep}dashboard`
  );
  // root/dashboard/templates
  const templatesDirectory = path.resolve(
    `${dashboardDirectory}${path.sep}templates`
  );
  // root/dashboard/public
  dashboard.use(
    "/public",
    express.static(path.resolve(`${dashboardDirectory}${path.sep}public`))
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(
    new Strategy(
      {
        clientID: client.appInfo.id,
        clientSecret: client.config.dashboard.oauthSecret,
        callbackURL: client.config.dashboard.callbackUrl,
        scope: ["identify", "guilds"]
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
      }
    )
  );

  dashboard.use(
    session({
      store: new MemoryStore({ checkPeriod: 99999999 }),
      secret: client.config.dashboard.sSecret,
      resave: false,
      saveUninitialized: false
    })
  );

  dashboard.use(passport.initialize());
  dashboard.use(passport.session());

  dashboard.engine("html", require("ejs").renderFile);
  dashboard.set("view engine", "html");

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(
      path.resolve(`${templatesDirectory}${path.sep}${template}`),
      Object.assign(baseData, data)
    );
  };

  dashboard.get("/login", (req, res, next) => {
    req.session.backURL = "/";
    next();
  },
  passport.authenticate("discord")
  );

  dashboard.get("/callback", passport.authenticate("discord"), (req, res) => {
    res.redirect("/");
  });

  dashboard.get("/logout", (req, res) => {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });

  dashboard.get("/", (req, res) => {
    const members = client.users.size;
    const channels = client.channels.size;
    const guilds = client.guilds.size;
    renderTemplate(res, req, "home.ejs", {
      stats: {
        serveurs: guilds,
        utilisateurs: members,
        salons: channels
      }
    });
  });

  dashboard.get("/commands", (req, res) => {
    renderTemplate(res, req, "commands.ejs");
  });

  client.site = dashboard.listen(client.config.dashboard.port);
};
