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
  const templates = path.resolve(`${dashboardDirectory}${path.sep}templates`);
  // root/dashboard/public
  dashboard.use(
    "/public",
    express.static(path.resolve(`${dashboardDirectory}${path.sep}public`))
  );

  passport.use(
    new Strategy(
      {
        clientID: client.appInfo.id,
        clientSecret: client.config.dashboard.oauthSecret,
        callbackURL: client.config.dashboard.callbackUrl,
        scope: ["identity", "guilds"]
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
};
