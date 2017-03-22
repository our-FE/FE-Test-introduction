
## UI测试
常见的做法有**像素对比**和**dom结构对比**两个方向

### 像素对比

像素对比基本的思想认为，如果网站没有因为你的改动而界面错乱，那么在截图上测试页面应当跟正常页面保持一致。可以跟线上正常页面对比或者页面历史记录对比。像素对比能直观的显示图像上的差异，如果达到一定阈值则页面可能不正常。

#### [PhantomCSS](https://github.com/Huddle/PhantomCSS)
像素对比比较出名的工具是PhantomCSS。 PhantomCSS结合了 Casperjs截图和ResembleJs 图像对比分析。单纯从易用性和对比效果来说还是不错的。

> PhantomJS是一个无界面的webkit内核浏览器，你可以把它当作一个没有界面的Safari

![image](http://fex.baidu.com/img/front-end-test/diff.png)

 但是这里有个问题，基于像素对比的情况很有可能会因为1像素偏差就导致对比失败，但有时候我们是不在意这1像素的。 整个页面的测试导致任何一点文字、图像等动态的改变都可能导致不通过，而且真正的错误可能由于图像太大而被阈值忽略。图像越大对比也越容易超时。

### dom结构对比

像素对比虽然直观，但动态元素居多且无法保证测试页面与线上页面同步时有所局限。国内[@云龙](https://github.com/fouber) 针对这个情况，提供了一个解决方案[page-monitor](https://github.com/fouber/page-monitor)，根据dom结构与样式的对比来对比整个页面的变动部分。

eg:

![image](http://fex.baidu.com/img/front-end-test/pagemonitor.png)

其工作原理就是利用phantom或其他headless浏览器访问页面，然后截图，然后执行一段js，遍历整个dom树，获取元素计算样式和元素内文本内容，构造出一个JSON结构，然后每次diff这个json来判断页面差异，并标记在截图上展示。dom树的diff过程有点类似react的虚拟dom树diff


![image](https://pic1.zhimg.com/09918f07833307ba8aa048cc0dfc0d88_b.jpg)

（react的dom树diff算法示意图）

DOM树diff我们可以分辨出元素样式

 + 修改
 + 内容修改
 + 新增元素
 + 删除元素
 
 四种不同的页面差异，我们可以配置选择器来忽略元素。
 
 四种页面差异的效果图：

 ![image](https://pic3.zhimg.com/ade3e3c68f4138355841d4dd39d5ee6a_b.jpg)
 
(新增)

 ![image](https://pic4.zhimg.com/8a92b15d9f6e0662c245c0d4c02fa957_b.jpg)
 
(删除)

 ![image](https://pic4.zhimg.com/4025954fd93cde9fda41a492c47bba83_b.jpg)
 
(text修改)
 
 ![image](https://pic4.zhimg.com/108970b55c63dc9aed5ff99fffaff2a3_b.jpg)
 
(样式修改)
 

### 案例
[戳我](./ui/readme.md)

### 参考

 + [前端自动化测试探索](http://fex.baidu.com/blog/2015/07/front-end-test/)
 + [知乎：如何进行前端自动化测试](https://www.zhihu.com/question/29922082)