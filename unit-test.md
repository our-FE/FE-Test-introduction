# 单元测试

单元测试分为两种

+ 测试驱动开发（TDD）
+ 行为驱动开发（BDD）

## 为什么需要单元测试
在这里首先需要知道单元测试的目的及结果：

  1. 使代码健壮，质量高，兼容各种临界点；
  2. 减少 QA 测试报告的反馈，提高自我影响力；
  3. 保证代码的整洁清晰。

## how

如果明白了为什么要进行单元测试，那就可以开始着手为自己的代码写一些单元测试代码。

测试从字面理解就是检验
看对象是否达标，达标就是 pass，不达标就是 fail。

这个是一个测试的简单例子：
```javascript
/**
 * 获取 a 除以 b 的结果
 * @param  {[Number]} a [数字]
 * @param  {[Number]} b [数字]
 * @return {[Number]}   [结果数字]
 */
 function division(a, b) {
    if (b === 0) {
        return 0;
    } else {
        return a / b;
    }
 }
function test(name, result, expect) {
    if (result === expect) {
        console.log(name + '-> pass');
    } else {
        console.log(name + '-> fail');
    }
}
test('normal number', division(6, 2), 3);
test('zero', division(6, 0), 0);
```

## 单元测试框架

随着前端的发展，出现了很多测试框架，不单单可以服务于原生js，也有专门对应React、Angular的

热门的 JavaScript 自动化单元测试框架
![image](https://onegoods.nosdn.127.net/resupload/2017/3/17/154a31b32ac43a8fb7b3a4daf9ca92b2.png)

热门自动化单元测试框架 AngularJS / ReactJS / Vanila JavaScript
![image](https://onegoods.nosdn.127.net/resupload/2017/3/17/4adde17482c55058fbcd2c52049bc8b1.png)

这些工具的初衷也只是为了用于 AngularJS（例如 Protractor 和 Karma），但最终也广泛应用于 ReactJS

## Mocha

Mocha，是现在最流行的JavaScript测试框架之一，在浏览器和Node环境都可以使用。
所谓"测试框架"，就是运行测试的工具。通过它，可以为JavaScript应用添加测试，从而保证代码的质量

为了测试某个js模块是否正确，就要写测试脚本。
通常，测试脚本与所要测试的源码脚本同名，但是后缀名为.test.js（表示测试）或者.spec.js（表示规格）。

比如，add.js的测试脚本名字就是add.test.js

```javascript
// add.js
function add(x, y) {
  return x + y;
}
module.exports = add;

// add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});

```
上面这段代码，就是测试脚本，它可以独立执行。

测试脚本里面应该包括一个或多个`describe`块，每个`describe`块又应该包括一个或多个`it`块。

describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。
it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。

### 断言
刚刚列子里面有个断言
```
expect(add(1, 1)).to.be.equal(2);
```
断言，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。
但是mocha并不含断言库，所以如果要使用的话，就必须先引入断言库
```
var expect = require('chai').expect;
```
（断言库不只一种，看你喜欢）
`chai`的优点是接近语言
还有许多用法，详细的可以去参考[官方文档](http://chaijs.com/api/bdd/)

基本上，`expect`断言的写法都是一样的。头部是expect方法，尾部是断言方法，比如`equal`、`a/an`、`ok`、`match`等。两者之间使用**to**或**to.be**连接。

如果`expect`断言不成立，就会抛出一个错误。反过来，只要不抛出错误，测试用例就算通过。

如果你的it里面，不写断言判断，也可以算作通过。





### 异步

#### 异步测试
Mocha默认每个测试用例最多执行2000毫秒，如果到时没有得到结果，就报错。

涉及异步操作的测试，时间一般是不够的，需要用-t或--timeout参数指定超时门槛，命令行：
`mocha -t 5000 -s 1000 timeout.test.js`

#### 异步代码
当测试完成后只需调用回调函数。通过添加一个回调（通常命名done），以it()，`mocha`会知道它应该等待被调用这个函数来完成测试。
```
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
```
另外，Mocha内置对Promise的支持，允许直接返回Promise，等到它的状态改变，再执行断言，而不用显式调用done方法。
```
it('异步请求应该返回一个对象', function() {
  return fetch('https://api.github.com')
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).to.be.an('object');
    });
});
```

### 钩子
Mocha在describe块之中，提供测试用例的四个钩子：before()、after()、beforeEach()和afterEach()。它们会在指定时间执行。
```
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```
### 测试用例管理
大型项目有很多测试用例。有时，我们希望只运行其中的几个，这时可以用`only`方法。`describe`块和`it`块都允许调用`only`方法，表示只运行某个测试套件或测试用例。

`demo07`:测试脚本test/add.test.js就使用了only。
```
it.only('1 加 1 应该等于 2', function() {
  expect(add(1, 1)).to.be.equal(2);
});

it('任何数加0应该等于自身', function() {
  expect(add(1, 0)).to.be.equal(1);
});
```
上面代码中，只有带有only方法的测试用例会运行。
```
$ mocha test/add.test.js

  加法函数的测试
    ✓ 1 加 1 应该等于 2

  1 passing (10ms)
```
此外，还有`skip`方法，表示跳过指定的测试套件或测试用例。
```
it.skip('任何数加0应该等于自身', function() {
  expect(add(1, 0)).to.be.equal(1);
});
```
上面代码的这个测试用例不会执行。

### 浏览器测试
除了在命令行运行，Mocha还可以在浏览器运行。
![image](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015120305.png)

首先，使用`mocha init`命令在指定目录生成初始化文件。
```
$ mocha init xxx
```
运行上面命令，就会在`xxx`目录下生成`index.html`文件，以及配套的脚本和样式表。

然后，新建一个源码文件`add.js`。
```
// add.js
function add(x, y) {
  return x + y;
}
```
然后，把这个文件，以及断言库chai.js，加入index.html。
```
<script>
  mocha.setup('bdd');
</script>
<script src="add.js"></script>
<script src="http://chaijs.com/chai.js"></script>
<script src="tests.js"></script>
<script>
  mocha.run();
</script>
```
最后，在`tests.js`里面写入测试脚本。

现在，在浏览器里面打开`index.html`，就可以看到测试脚本的运行结果



## 案例
[跳到下个readme](./unit/mocha/Readme.md)

