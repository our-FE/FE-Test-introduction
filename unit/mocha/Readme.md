# Mocha-demo

按照规范，测试用例的js要加上test.js后缀，或者是spec.js后缀。
我们现在已经有测试用例了，可以开始执行命令了

进入`demo01`,命令行
```
> mocha add.test.js


  加法函数的测试
    ✓ 1 加 1 应该等于 2

  1 passing (10ms)
```
上面的运行结果表示，测试脚本通过了测试，一共只有1个测试用例，耗时是10毫秒。

`mocha`命令后面紧跟测试脚本的路径和文件名，可以指定多个测试脚本。

```
> mocha js1,js2,js3
```


Mocha默认运行`test`子目录里面的测试脚本。
所以，**一般都会把测试脚本放在`test`目录里面**，
然后执行`mocha`就不需要参数了。

请进入`demo02`子目录，运行下面的命令
```
> mocha 

  加法函数的测试
    ✓ 1 加 1 应该等于 2
    ✓ 任何数加0应该等于自身

  2 passing (9ms)
```

这个时候，你会发现一个问题，他只运行了`test`第一层的文件。
但是下面还有一个`dir`子目录，里面还有一个测试脚本`multiply.test.js`，并没有得到执行。

原来，`Mocha`默认只执行`test`子目录下面第一层的测试用例，不会执行更下层的用例。

如果要执行`test`里面所有子目录的文件，需要加上`--recursive`参数



## 命令行参数

### --reporter, -R

`--reporter`参数用来指定测试报告的格式，默认是`spec`格式。
```
> mocha
# 等同于
> mocha --reporter spec
```

除了`spec`格式，官方网站还提供了其他许多[报告格式](http://mochajs.org/#reporters)。

使用`mochawesome`模块，可以生成漂亮的HTML格式的报告。
![image](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015120303.png)

```
npm install --save-dev mochawesome
../node_modules/.bin/mocha --reporter mochawesome
```
测试结果报告就在`mochaawesome-reports`子目录生成

### --watch，-w
这个大家都懂的

### --bail, -b
`--bail`参数指定只要有一个测试用例没有通过，就停止执行后面的测试用例。这对持续集成很有用。

### --grep, -g
`--grep`参数用于搜索测试用例的名称（即it块的第一个参数），然后只执行匹配的测试用例。
```   
> mocha --grep "1 加 1"
```
上面代码只测试名称中包含"1 加 1"的测试用例。
   
### --invert, -i
`--invert`参数表示只运行不符合条件的测试脚本，必须与`--grep`参数配合使用。
``` 
> mocha --grep "1 加 1" --invert
```   

### 配置文件mocha.opts
`Mocha`允许在`test`目录下面，放置配置文件`mocha.opts`，把命令行参数写在里面。请先进入`demo03`目录，运行下面的命令。
```
> mocha --recursive --reporter tap --growl
```
上面这个命令有三个参数--recursive、--reporter tap、--growl。
然后，这样写，相当于把这三个参数写入test目录下的mocha.opts文件。
```
--reporter tap
--recursive
--growl
```

### ES6

如果测试脚本是用ES6写的，那么运行测试之前，需要先用`Babel`转码。进入`demo04`目录，`test/add.test.js`是用`ES6`写的。

`ES6`转码，需要安装`Babel`。
```
> npm install babel-core babel-preset-es2015 --save-dev
```
然后，在项目目录下面，新建一个`.babelrc`配置文件。
```
{
  "presets": [ "es2015" ]
}
```
最后，使用`--compilers`参数指定测试脚本的转码器。
```
> ../node_modules/mocha/bin/mocha --compilers 
js:babel-core/register
```

上面代码中，`--compilers`参数后面紧跟一个用冒号分隔的字符串，冒号左边是文件的后缀名，右边是用来处理这一类文件的模块名。
上面代码表示，运行测试之前，先用`babel-core/register`模块，处理一下.js文件。

由于这里的转码器安装在项目内，所以要使用项目内安装的`Mocha`；如果转码器安装在全局，就可以使用全局的`Mocha`。

**注意，`Babel`默认不会对`Iterator`、`Generator`、`Promise`、`Map`、`Set`等全局对象，以及一些全局对象的方法（比如Object.assign）转码。**如果你想要对这些对象转码，就要安装`babel-polyfill`。
```
$ npm install babel-polyfill --save
```
然后，在你的脚本头部加上一行。
```
import 'babel-polyfill'
```