import React, { Component } from 'react';

class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            contactData: [
                {name:'Abet', phone:'010-0000-0001'},
                {name:'Bbet', phone:'010-0000-0002'},
                {name:'Cbet', phone:'010-0000-0003'},
                {name:'Dbet', phone:'010-0000-0004'}
            ]
        }
    }

    render() {

        const mapToCompenent = (data) =>{
            return data.map((contact, i) => {
                return (<ContactInfo contact={contact} key={i}/>)
            })
        }

        return (
            <div>
                {/* render 내에서 함수를 사용  */}
                {mapToCompenent(this.state.contactData)}
            </div>
        );
    }
}

class ContactInfo extends Component {
    render(){
        return(
            <div>{this.props.contact.name} {this.props.contact.phone}</div>
        )
    }

}

export default Contact;
