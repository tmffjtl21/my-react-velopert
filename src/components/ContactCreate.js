import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactCreate extends Component {

    constructor(props){
        super(props)
        this.state = {
            name : '',
            phone : ''
        }
    }

    componentWillMount(){
        console.log("componentWillMount")

        const contactData = localStorage.contactData;

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)){
            localStorage.contactData = JSON.stringify(this.state.contactData)

            console.log("componentDidUpdate success")
        }

        console.log("componentDidUpdate")
    }

    handleChange = (e) => {
        let nextState = {};
        // 여기서 이런 객체가 만들어짐
        // {phone: 'asdf} 
        // 이객체를 setState에 바로 전달
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    handleClick = () => {
        // 새로운 contact 객체를 만듦. 수정될일이 없어서 상수(const)로
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        }

        this.props.onCreate(contact);

        this.setState({
            name: '',
            phone: ''
        });

        this.nameInput.focus();
    }

    handleKeyPress = (e) => {
        if(e.charCode === 13) {
            this.handleClick();
        }
    }
    
    render(){
        return(
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input type="text" name="name" placeholder="name"
                        value={this.state.name} onChange={this.handleChange}
                        // ref ( react js 에서의 id의 개념 ) , focus와 같은 작업이 필요할 때 설정해줌
                        // rendering 메소드 내부랑 constructor 내부에서는 ref에 접근 불가능
                        ref={(ref) => {this.nameInput = ref}}
                        />
                    <input type="text" name="phone" placeholder="phone"
                        value={this.state.phone} onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        />
                        
                </p>
                <button onClick={this.handleClick}>Create</button>
            </div>
        )
    }
}

ContactCreate.propTypes = {
    onCreate: PropTypes.func
};

ContactCreate.defaultProps = {
    onCreate: () => {console.error("onCreate not defined")}
}

export default ContactCreate;