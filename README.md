# 中网充充电站可视化

技术栈：Vue+Vite+Typescript+BootStrap5+Vercel

## 项目介绍

源：中网充需要在微信客户端中才能查看充电站电量及相应情况，每次查看加载很慢，并且每次只能看一个充电站。

析：使用小黄鸟抓包请求数据，分析其中的规律，整合请求网址，`Apifox` 测试接口。

落：使用 `axios` 请求数据，使用 `BootStrap5` 框架，使用 `Vecel` 部署项目。

## 意料之外

1. 项目部署到 `Vecel` 后无法跨域请求。
   
   这篇文章[^1] 提到了部署项目到 `Vecel` 中确实需要重新配置代理。

   这两篇官方文档[^2] [^3] 也提到了需要配置代理。

2. 引入 `BootStrap5` 出现一些小问题

   想要引入 `BootStrap5` ，可以直接根据官方文档[^4]来。

   但是要注意修改 `vite.config.ts` 时，不要直接加入 `root: path.resolve(__dirname, 'src')` 这一行，可能会导致启动不了。

## TODO

封装网址请求接口。

## 参考

[^1]: https://lsworl.github.io/2022/05/27/shi-yong-vercel-lai-bu-shu-jing-tai-ye-mian-bing-jie-jue-kua-yu-wen-ti/
[^2]: https://vercel.com/docs/projects/project-configuration#rewrites-examples
[^3]: https://vercel.com/guides/how-to-enable-cors#enabling-cors-using-vercel.json
[^4]: https://getbootstrap.com/docs/5.3/getting-started/vite/