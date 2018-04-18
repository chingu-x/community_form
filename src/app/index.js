import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as questions from './questions';


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
            input: ''
        }
    }

    // on text input method (updates state.input)
    
    // on select method (updates state.input)

    textInput() {
        const { name, description, type, required } = this.props.question;
        console.log(this.props)
        return (
            <div>
                <label>{description}</label>
                <input type={type || "text"} name={name} required={required} />
            </div>
        );
    }

    selectInput() {
        const { name, description, options, required } = this.props.question;
        return (
            <div>
                <label>{description}</label>
                <select name={name} required={required}> {
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

        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
                <Question question={this.props.questions[this.state.next]} />
                { 
                    this.state.previous
                        ? <Button action={this.onPrevious} text='Previous' />
                        : null
                }
                <Button action={this.onNext} text='Next' disabled={false} />
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
