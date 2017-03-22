# 性能测试

性能测试是最直接化的一个东西，一般都会有个标准，达到这个标准，就说明性能是好的，反之则是性能不好，这里面更多的是优化方面的问题


## 在线测试
下面的这些性能测试工具，使用了量化的方式测试了网站中诸如首字节加载时间（time to first byte）或者渲染时间等表现。有些工具还会检查特别检查资源是否被缓存，多个 CSS 或 JS 文件是否值得合并。

### [WebPagetest](http://www.webpagetest.org/)
是一个输入网址，自动检测网站的性能

`WebPagetest` 是性能测试的黄金标准，它提供了多方面的量化指标用于性能测试，比如有一个基本的评分，用于评价当前页面优化的水平；有一个截图，显示页面加载后的视觉效果；还有一个浏览器加载资源的瀑布流...

> 根据用户浏览器真实的连接速度，在全球范围内进行网页速度测试，并提供详细的优化建议。
    
    
![image](http://7xpwlt.com1.z0.glb.clouddn.com/mail163.png)
![image](http://7xpwlt.com1.z0.glb.clouddn.com/QQ%E5%9B%BE%E7%89%8720170322004238.png)



## [Phantomas](https://github.com/macbre/phantomas) 
基于PhantomJS的性能数据收集工具。 
Phantomas作为自动化性能数据收集工具，解决了日常性能数据收集的问题的，但是性能优化的指标数据需要的是大样本、更加贴近用户数据的平均值，而不是使用假设在条件良好的环境下获取的性能数据

![image](http://7xpwlt.com1.z0.glb.clouddn.com/phantomas.jpg)

**因此更推荐使用Phantomas作性能异常监控，而不是性能指标的评测。**

### phantomas案例
[戳我](./performance/readme.md)

## 参考文章

[前端性能优化和测试工具总结](http://www.jianshu.com/p/cdf777f13ff6)

