import React, { Component } from 'react';
import { isEmail, isURL } from 'validator';
require('./question.css');

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            response: ''
        }

        this.handleResponse = this.handleResponse.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // component has re-rendered with a new question if true
        if (props.question.name !== state.name) {
            // if there is a question and response store them in the parent Form
            if (state.name && state.response) props.recordResponse(state.name, state.response);
            // enable the next button if there is a saved response available (for when user clicks 'Previous' button)
            if (props.savedResponse) props.enableNext();
            return {
                name: props.question.name,
                response: props.savedResponse || ''
            }
        }
        // otherwise return no change
        return null;
    }

    componentWillUnmount() {
        // when the final 'Apply' screen is reached the component will unmount
        // capture the final response / response if the component is unmounted for another reason
        this.props.recordResponse(this.state.name, this.state.response)
    }

    handleResponse({ target }) {
        const { type } = this.props.question;

        // validate inputs
        // LITTLE SWITCHY BOI BACK FROM THE DEPTHS
        switch(type) {
            case 'email':
                if (isEmail(target.value)) this.props.enableNext();
                break;
            case 'url':
                if (isURL(target.value)) this.props.enableNext();
                break;
            case 'text':
            case 'select':
                if (target.value === '') this.props.disableNext();
                else this.props.enableNext();
                break;
            default:
                this.props.enableNext();
                break;
        }

        this.setState(() => ({ response: target.value })); 
    }

    createTextInput() {
        const {
            name,
            description,
            placeholder,
            type,
            required
        } = this.props.question;

        return (
            <div className="item" id="question">
                <div id="label">
                    <label>{description}</label>
                </div>
                <input 
                    type={type || "text"}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    value={this.state.response}
                    onChange={this.handleResponse}
                />
            </div>
        );
    }

    createSelectInput() {
        const { name, description, options, required } = this.props.question;
        return (
            <div className="item">
                <label>{description}</label>
                <select
                    name={name}
                    required={required}
                    value={this.state.response}
                    onChange={this.handleResponse}
                > 
                    <option value="">Select an option</option>
                    {
                        options.map((option, i) => (
                            <option value={option} key={i}>
                                {option}
                            </option>
                        ))
                    } 
                </select>
            </div>
        );
    }

    render() {
        return (
            <div className="item" id="question_container">
                { 
                    this.props.question.type === 'select' 
                       ? this.createSelectInput() 
                       : this.createTextInput() 
                }
            </div>
        )
    }
 }

 export default Question;
