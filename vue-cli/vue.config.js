const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir:"../../../public/plugin_assets/redmine_super_gantt/javascripts",
  filenameHashing:false,
});
