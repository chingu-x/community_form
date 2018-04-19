import React, { Component } from 'react';
import Question from '../question/question';
import Button from '../button/button';
import Axios from 'axios';
import "./form.css";

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previous: null, // index of previous question in questions arr
            next: 0, // index of next question in questions arr
            responses: {}, // stores responses for submission
            nextDisabled: true, // boolean controller for disabling/enabling 'Next' button
        }

        this.enableNext = this.enableNext.bind(this);
        this.disableNext = this.disableNext.bind(this);
        this.recordResponse = this.recordResponse.bind(this);
        
        this.handleNext = this.handleNext.bind(this);
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
            const newState = { responses: currentState.responses }
            newState.responses[question] = response;
            return newState;
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
                <div className="item">
                    <p>After applying we will contact you with our decision at {this.state.responses["email"]} within one week.</p>
                    <Button className="item" action={this.handleSubmit} text="Apply" />
                </div>
            );         
        }

        return (
            <div id="container">
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
                        : <Button id="previous" className="item" action={this.handlePrevious} text="Previous" />
                }

                <Button
                    id="next"
                    className="item"
                    action={this.handleNext}
                    text="Next"
                    disabled={this.state.nextDisabled}
                />
            </div>
        );
    }
}

export default Form;
