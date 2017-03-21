# page-Monitor
## 在这个仓库的 **`ui`目录** 控制台执行以下

1. `npm i` 添加依赖
2. 在[config.json](./config.json)里面设置要测试的网页
3. `npm run catch`得到第一次页面加载的截图and dom树等
4. `npm run catch` 再次，再次得到第二次的截图
5. 这时，你得到了两个以时间戳命名的文件夹
6. 在diff.js里，用生成的两个时间戳文件夹的 时间戳 替换变量version1 和version2 ，就是对比的版本 然后， `npm run diff`,对比俩版本，得到结果