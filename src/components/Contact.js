import React, { Component } from 'react';
import ContactInfo from './ContactInfo'
import ContactDetails from './ContactDetails'
import update from 'react-addons-update'
import ContactCreate from './ContactCreate'

class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedKey : -1,
            keyword: '',
            contactData: [
                {name:'Abet', phone:'010-0000-0001'},
                {name:'Dbet', phone:'010-0000-0004'},
                {name:'Bbet', phone:'010-0000-0002'},
                {name:'Cbet', phone:'010-0000-0003'}
            ]
        }
        console.log('a')
    }


    // localStorage 사용법
    componentWillMount(){
        // console.log("componentWillMount")

        const contactData = localStorage.contactData;

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }

    // localStorage 사용법
    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)){
            localStorage.contactData = JSON.stringify(this.state.contactData)

            // console.log("componentDidUpdate success")
        }

        // console.log("componentDidUpdate")
    }

    handleChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    handeClick = (key) => {
        this.setState({
            selectedKey : key
        })

        console.log(key, "is selected")
    }

    handleCreate = (contact) =>{
        this.setState({
            contactData : update(this.state.contactData, {$push: [contact]})
        })
    }

    handleRemove = () => {
        if(this.state.selectedKey < 0){
            return;
        }

        this.setState({
            contactData: update(this.state.contactData,
                { $splice: [[this.state.selectedKey, 1]]}
            ),
            selectedKey: -1
        })
    }

    handleEdit = (name, phone) => {
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedKey] : {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            )
        })
    }

    render() {

        const mapToCompenent = (data) =>{
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase()
                        .indexOf(this.state.keyword) > -1
                }
            )
            return data.map((contact, i) => {
                return (<ContactInfo 
                            contact={contact} 
                            key={i}
                            onClick = { () => {this.handeClick(i)}}    
                        />)
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
                <div>{mapToCompenent(this.state.contactData)}</div>
                <ContactDetails 
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                    />

                <ContactCreate 
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default Contact;
