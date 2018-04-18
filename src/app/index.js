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
            userInput: ''
        }

        this.onUserInput = this.onUserInput.bind(this);
    }

    onUserInput({ target }) {
        // reject empty strings or selections
        if (target.value === '') return this.props.disableNext();

        this.setState(() => {
            return {
                userInput: target.value
            }
        });

        // validate custom input types here. disable 'next' button if validation fails
        const { type } = this.props.question;
        if (type === 'email' && !isEmail(target.value)) return this.props.disableNext();
        else if (type === 'url' && !isURL(target.value)) return this.props.disableNext();

        // if validation succeeds enable the 'next' button
        this.props.enableNext();
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
                    value={this.state.userInput}
                    onChange={this.onUserInput}
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
                    value={this.state.userInput}
                    onChange={this.onUserInput}
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

        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    enableNext() {
        this.setState(() => ({ nextDisabled: false }))
    }

    disableNext() {
        this.setState(() => ({ nextDisabled: true }))
    }

    onNext() {
        // incremenet the state 'next'
        // previous = next++
    }

    onPrevious() {

    }

    onSubmit() {

    }

    render() {
        return (
            <div>
                <Question
                    question={this.props.questions[this.state.next]}
                    enableNext={this.enableNext}
                    disableNext={this.disableNext}
                />
                { 
                    this.state.previous
                        ? <Button action={this.onPrevious} text='Previous' />
                        : null
                }
                <Button action={this.onNext} text='Next' disabled={this.state.nextDisabled} />
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
