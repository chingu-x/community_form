import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as questions from './questions';
import { isEmail, isURL } from 'validator';


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
            // true for all questions beyond the first
            if (state.name) props.onNextQuestion(state.name, state.response);
            // enable the next button if there is a saved response available
            if (props.savedResponse) props.enableNext();
            return {
                name: props.question.name,
                response: props.savedResponse || ''
            }
        }
        // otherwise return no change
        return null;
    }

    handleResponse({ target }) {
        const { type } = this.props.question;

        // validate inputs
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
        }

        this.setState(() => ({ response: target.value })); 
    }

    textInput() {
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

    selectInput() {
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
                       ? this.selectInput() 
                       : this.textInput() 
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

    }

    render() {
        const question = this.props.questions[this.state.next];
        return (
            <div>
                <Question
                    question = {question}
                    enableNext = {this.enableNext}
                    disableNext = {this.disableNext}
                    onNextQuestion = {this.recordResponse}
                    savedResponse = {this.state.responses[question.name] || null}
                />
                { 
                    this.state.previous !== null
                        ? <Button action={this.handlePrevious} text='Previous' />
                        : null
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
