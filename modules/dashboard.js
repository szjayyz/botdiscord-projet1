const express = require("express");
const dashboard = express();
const path = require("path");

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
};
