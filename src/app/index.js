import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { questions } from './questions';
import { isEmail, isURL } from 'validator';
import Axios from 'axios';

class Button extends Component {
    render() {
        const { action, disabled, text } = this.props;
        return (
            <button onClick={action} disabled={disabled}>
                {text}
            </button>
        );
    }
}

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
            <div>
                <label>{description}</label>
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
            <div>
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
                } </select>
            </div>
        );
    }

    render() {
        return (
            <div>
                { 
                    this.props.question.type === 'select' 
                       ? this.createSelectInput() 
                       : this.createTextInput() 
                }
            </div>
        )
    }
 }

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previous: null, // index of previous question in questions arr
            next: 0, // index of next question in questions arr
            responses: {}, // stores responses
            nextDisabled: true,
        }

        this.enableNext = this.enableNext.bind(this);
        this.disableNext = this.disableNext.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.recordResponse = this.recordResponse.bind(this);

        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    enableNext() {
        this.setState(() => ({ nextDisabled: false }))
    }

    disableNext() {
        this.setState(() => ({ nextDisabled: true }))
    }

    handleNext() {
        this.setState((currentState) => {
            return {
                previous: currentState.next,
                next: currentState.next + 1
            };
        });
    }

    handlePrevious() {
        this.setState((currentState) => {
            return {
                previous: currentState.next,
                next: currentState.next - 1
            };
        });
    }

    recordResponse(question, response) {
        this.setState((currentState) => {
            currentState.responses[question] = response;
            return currentState;
        });

        this.disableNext();
    }

    handleSubmit() {
        Axios.post('http://127.0.0.1:3000/form/', { formData: this.state.responses }).then(console.log).catch(console.log);
    }

    render() {
        const question = this.props.questions[this.state.next];
        // Final view + apply button (to post form)
        if (!question) {
            return (
                <div>
                    <p>After applying we will contact you with our decision at {this.state.responses['email']} within one week.</p>
                    <Button action={this.handleSubmit} text='Apply' />
                </div>
            );         
        }

        return (
            <div>
                <Question
                    question = {question}
                    enableNext = {this.enableNext}
                    disableNext = {this.disableNext}
                    recordResponse = {this.recordResponse}
                    savedResponse = {this.state.responses[question.name] || null}
                />

                { 
                    // only renders 'Previous' button if there is a question to reach
                    this.state.previous === null || this.state.next === 0
                        ? null
                        : <Button action={this.handlePrevious} text='Previous' />
                }

                <Button action={this.handleNext} text='Next' disabled={this.state.nextDisabled} />
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Form questions={questions} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));
