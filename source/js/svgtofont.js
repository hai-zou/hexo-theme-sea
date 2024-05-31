const svgtofont = require('svgtofont');
const path = require('path');

svgtofont({
  src: path.resolve(__dirname, "../svg"), // svg 图标目录路径
  dist: path.resolve(__dirname, "../fonts"), // 输出到指定目录中
  fontName: "sea-font", // 设置字体名称
  css: {
    include: ['sea-font.css'], // 只保留css文件
    fontSize: '1rem'
  },
  useNameAsUnicode: true,
}).then(() => {
  console.log("done!");
});