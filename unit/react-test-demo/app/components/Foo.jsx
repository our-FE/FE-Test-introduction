/**
 * Created by Zyingying on 2017/3/9 0009.
 */
const React = require("react");

class Foo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return <div className="foo"/>;
    }
}

module.exports = Foo;