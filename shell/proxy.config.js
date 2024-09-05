module.exports = {
  "/mfe1": {
    target: "http://localhost:4201",
    pathRewrite: {
      "^/mfe1/manifest$" : "/manifest.json",
      "^/mfe1(/.*\.js(\.map)?)$" : "$1"
    }
  }
};
