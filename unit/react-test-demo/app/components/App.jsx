import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
const Foo = require('./Foo');

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Todos</h1>
                <TodoList/>
                <AddTodo/>
                <Foo/>
            </div>
        );
    }
}
