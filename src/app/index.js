import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
const axios = require('axios');

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: []
        }
    }

    getFormFields () {
        return axios.get('http://localhost:3000/form')
            .then(({ data }) => data.fields)
    };

    componentDidMount() {
        this.getFormFields()
        .then(fields => this.setState(() => ({ fields })))
        .catch(console.error);
    }

    render() {
        return (
            <div>
                <form method="POST" action="/form/"> {
                   this.state.fields.map(
                       ({ description, name, required, type, options }) => {
                           
                           return (
                               <div key={name}>
                                   <label>{description}</label>
                                   <input name={name} type={type} />
                                   { options ? options.map(option => (<option value={option}>{option}</option>)) : null }
                               </div>
                           );
                       }
                   ) 
                } </form>
            </div>
        );
    }
}

ReactDOM.render(<Form />, document.querySelector('#app'));