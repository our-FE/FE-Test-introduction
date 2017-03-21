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
### 异步代码