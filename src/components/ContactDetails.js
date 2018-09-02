import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ContactDetails extends Component {

    constructor(props){
        super(props)

        this.state = {
            isEdit : false,
            name : '',
            phone : ''
        }
    }

    handleToggle = () => {

        // 넘어온 값을 input에 유지 
        if(!this.state.isEdit){
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })
        }else{
            this.handleEdit();
        }

        this.setState({
            isEdit: !this.state.isEdit
        })

        // 처음에 true가 반환될거같은데 false가 반환되는 이유는 
        // setState가 비동기라서 console이 먼저 실행되고 위의 setState가 실행됨 
        console.log(this.state.isEdit)
    }

    handleChange = (e) => {
        let nextState = {};
        // 여기서 이런 객체가 만들어짐
        // {phone: 'asdf} 
        // 이객체를 setState에 바로 전달
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    handleEdit = () => {
        this.props.onEdit(this.state.name, this.state.phone)
    }

    handleKeyPress = (e) => {
        if(e.charCode === 13) {
            this.handleToggle();
        }
    }

    render(){
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
            );
        const edit = (
            <div>
                <input type="text" name="name" placeholder="name"
                        value={this.state.name} onChange={this.handleChange}/>
                <input type="text" name="phone" placeholder="phone"
                    value={this.state.phone} onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    />
            </div>
        );

        const blank = (<div>Notselected</div>);
        const view = this.state.isEdit ? edit : details;

        return(
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank }
                <p>
                    <button onClick={this.handleToggle}>
                        {!this.state.isEdit ? 'Edit' : 'OK' }
                    </button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
            
        )
    }
}

ContactDetails.defaultProps = {
    contact : {
        name : '',
        phone : ''
    },
    onRemove : () => { console.error('onRemove not defined') },
    onEdit : () => { console.error('onEdit not defined') }
};

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
}

export default ContactDetails;