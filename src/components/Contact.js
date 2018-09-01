import React, { Component } from 'react';
import ContactInfo from './ContactInfo'


class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            keyword: '',
            contactData: [
                {name:'Abet', phone:'010-0000-0001'},
                {name:'Bbet', phone:'010-0000-0002'},
                {name:'Cbet', phone:'010-0000-0003'},
                {name:'Dbet', phone:'010-0000-0004'}
            ]
        }
        console.log('a')
    }

    handleChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    render() {

        const mapToCompenent = (data) =>{
            return data.map((contact, i) => {
                return (<ContactInfo contact={contact} key={i}/>)
            })
        }

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />

                {/* render 내에서 함수를 사용  */}
                {mapToCompenent(this.state.contactData)}
            </div>
        );
    }
}

export default Contact;
