进入目录`unit/react-testing-demo`
`npm install `，
再`npm start`

然后

打开 http://127.0.0.1:8080/
你会看到一个 Todo 应用。

![image](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016021202.png)

接下来，我们就要测试这个应用，一共有5个测试点。

应用标题应为"Todos"

Todo项的初始状态（"未完成"或"已完成"）应该正确

点击一个Todo项，它就反转状态（"未完成"变为"已完成"，反之亦然）

点击删除按钮，该Todo项就被删除

点击添加按钮，会新增一个Todo项

这5个测试用例都已经写好了，执行一下就可以看到结果。
```
> npm test
```

## 官方测试工具

我们知道，一个React组件有两种存在形式：虚拟DOM对象（即React.Component的实例）和真实DOM节点。官方测试工具库对这两种形式，都提供测试解决方案。
```
 Shallow Rendering：测试虚拟DOM的方法
 DOM Rendering: 测试真实DOM的方法
```
###  Shallow Rendering
`Shallow Rendering` （浅渲染）指的是，将一个组件渲染成虚拟DOM对象，但是只渲染第一层，不渲染所有子组件，所以处理速度非常快。它不需要DOM环境，因为根本没有加载进DOM。

首先，在测试脚本之中，引入官方测试工具库。

然后，写一个 Shallow Rendering 函数，该函数返回的就是一个浅渲染的虚拟DOM对象。
```
import TestUtils from 'react-addons-test-utils';

function shallowRender(Component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}
```

第一个测试用例，是测试标题是否正确。这个用例不需要与DOM互动，不涉及子组件，所以使用浅渲染非常合适。
```
describe('Shallow Rendering', function () {
  it('App\'s title should be Todos', function () {
    const app = shallowRender(App);
    expect(app.props.children[0].type).to.equal('h1');
    expect(app.props.children[0].props.children).to.equal('Todos');
  });
});
```
上面代码中，`const app = shallowRender(App)`表示对`App`组件进行"浅渲染"，然后`app.props.children[0].props.children`就是组件的标题。

你大概会觉得，这个属性的写法太古怪了，但实际上是有规律的。每一个虚拟DOM对象都有`props.children`属性，它包含一个数组，里面是所有的子组件。`app.props.children[0]`就是第一个子组件，在我们的例子中就是`h1`元素，它的`props.children`属性就是`h1`的文本。


### Enzyme库

[`Enzyme`](https://github.com/airbnb/enzyme)是官方测试工具库的封装，它模拟了`jQuery`的API，非常直观，易于使用和学习。
它提供三种测试方法。

 + shallow
 + render
 + mount

####  shallow
 `shallow`方法就是官方的`shallow rendering`的封装。
 下面是第一个测试用例，测试App的标题。
```
 import {shallow} from 'enzyme';

 describe('Enzyme Shallow', function () {
   it('App\'s title should be Todos', function () {
     let app = shallow(<App/>);
     expect(app.find('h1').text()).to.equal('Todos');
   });
 };
```
 上面代码中，`shallow`方法返回`App`的浅渲染，然后`app.find`方法找出h1元素，`text`方法取出该元素的文本。
 关于find方法，有一个注意点，就是它只支持简单选择器，稍微复杂的一点的CSS选择器都不支持。
```
 component.find('.my-class'); // by class name
 component.find('#my-id'); // by id
 component.find('td'); // by tag
 component.find('div.custom-class'); // by compound selector
 component.find(TableRow); // by constructor
 component.find('TableRow'); // by display name
 ```

#### render
 `render`方法将`React`组件渲染成静态的`HTML`字符串，然后分析这段`HTML`代码的结构，返回一个对象。它跟`shallow`方法非常像，主要的不同是采用了第三方`HTML`解析库`Cheerio`，它返回的是一个`Cheerio`实例对象。
 下面是第二个测试用例，测试所有Todo项的初始状态。
```
 import {render} from 'enzyme';

 describe('Enzyme Render', function () {
   it('Todo item should not have todo-done class', function () {
     let app = render(<App/>);
     expect(app.find('.todo-done').length).to.equal(0);
   });
 });
 ```
 在上面代码中，你可以看到，`render`方法与`shallow`方法的`API`基本是一致的。 Enzyme的设计就是，让不同的底层处理引擎，都具有同样的API（比如find方法）。


#### mount
 `mount`方法用于将`React`组件加载为真实DOM节点。
 下面是第三个测试用例，测试删除按钮。
```
 import {mount} from 'enzyme';

 describe('Enzyme Mount', function () {
   it('Delete Todo', function () {
     let app = mount(<App/>);
     let todoLength = app.find('li').length;
     app.find('button.delete').at(0).simulate('click');
     expect(app.find('li').length).to.equal(todoLength - 1);
   });
 });
```
 上面代码中，find方法返回一个对象，包含了所有符合条件的子组件。在它的基础上，at方法返回指定位置的子组件，simulate方法就在这个组件上触发某种行为。
 下面是第四个测试用例，测试Todo项的点击行为。
```
 import {mount} from 'enzyme';

 describe('Enzyme Mount', function () {
   it('Turning a Todo item into Done', function () {
     let app = mount(<App/>);
     let todoItem = app.find('.todo-text').at(0);
     todoItem.simulate('click');
     expect(todoItem.hasClass('todo-done')).to.equal(true);
   });
 });
```
 下面是第五个测试用例，测试添加新的Todo项。
```
 import {mount} from 'enzyme';

 describe('Enzyme Mount', function () {
   it('Add a new Todo', function () {
     let app = mount(<App/>);
     let todoLength = app.find('li').length;
     let addInput = app.find('input').get(0);
     addInput.value = 'Todo Four';
     app.find('.add-button').simulate('click');
     expect(app.find('li').length).to.equal(todoLength + 1);
   });
 });
 ```

#### API
 下面是Enzyme的一部分API，你可以从中了解它的大概用法。
 ```
 .get(index)：返回指定位置的子组件的DOM节点
 .at(index)：返回指定位置的子组件
 .first()：返回第一个子组件
 .last()：返回最后一个子组件
 .type()：返回当前组件的类型
 .text()：返回当前组件的文本内容
 .html()：返回当前组件的HTML代码形式
 .props()：返回根组件的所有属性
 .prop(key)：返回根组件的指定属性
 .state([key])：返回根组件的状态
 .setState(nextState)：设置根组件的状态
 .setProps(nextProps)：设置根组件的属性
 ```