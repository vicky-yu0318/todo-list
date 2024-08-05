const { defineConfig } = require("@vue/cli-service");
// const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  // 如果不能使用 @ 別名，請使用以下
  // chainWebpack: (config) => {
  //   config.resolve.alias.set("@", path.resolve(__dirname, "src"));
  // },
});
