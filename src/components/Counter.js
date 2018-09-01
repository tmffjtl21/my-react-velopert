import React, { Component } from 'react';


class Counter extends Component {

    constructor(props){
        super(props) // 상속받은 Component 의 props를 먼저 실행하고 현재 컴포넌트의 생성자 실행
        this.state = {
            value : 0
        }
    }

    handleClick = () => {
        this.setState({
            value: this.state.value + 1
        })
    }

    render() {
        return (
        <div>
            <h2>{this.state.value}</h2>
            <button onClick={this.handleClick}>Press Me</button>
        </div>
        );
    }
}

export default Counter;
