hexo.extend.filter.register("after_generate", () => {
  const isEnableSearch = hexo.theme.config.search.enable;
  const searchType = hexo.theme.config.search.type;
  if (!isEnableSearch || searchType !== "pagefind") {
    return;
  }
  const command = hexo.env.cmd;
  if (command !== "generate" && command !== "deploy") {
    return;
  }
  const { exec } = require("child_process");
  const outputDir = hexo.public_dir;
  exec(`npx pagefind --site ${outputDir}`, (err, stdout) => {
    if (err) {
      console.error("Pagefind execution failed:", err);
      return;
    }
    console.log("Pagefind was successfully built:");
    console.log(stdout);
  });
});