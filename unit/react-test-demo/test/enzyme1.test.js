import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import App from '../app/components/App';
import Foo from '../app/components/Foo';

describe('Enzyme Shallow', function () {
  it('App\'s title should be Todos', function () {
    let app = shallow(<App/>);
    expect(app.find('h1').text()).to.equal('Todos');
  });
});

describe('Enzyme Render', function () {
  it('Todo item should not have todo-done class', function () {
    let app = render(<App/>);
    expect(app.find('.todo-done').length).to.equal(0);
  });
});

describe('Enzyme Mount', function () {
  it('Delete Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    app.find('button.delete').at(0).simulate('click');
    expect(app.find('li').length).to.equal(todoLength - 1);
  });

  it('Turning a Todo item into Done', function () {
    let app = mount(<App/>);
    let todoItem = app.find('.todo-text').at(0);
    todoItem.simulate('click');
    expect(todoItem.hasClass('todo-done')).to.equal(true);
  });

  it('Add a new Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    let addInput = app.find('input').get(0);
    addInput.value = 'Todo Four';
    app.find('.add-button').simulate('click');
    expect(app.find('li').length).to.equal(todoLength + 1);
  });
});

describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(shallow(<Foo />).contains(<div className="foo"/>)).to.equal(true);
    });

    it("contains spec with an expectation", function() {
        expect(shallow(<Foo />).is('.foo')).to.equal(true);
    });

    it("contains spec with an expectation", function() {
        expect(render(<App />).find('.foo').length).to.equal(1);
    });
});