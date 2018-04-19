import React, { Component } from 'react';
import { questions } from './questions';
import Form from '../form/form';
import "./app.css";

class App extends Component {
    render() {
        return (
            <div>
                <Form questions={questions} />
            </div>
        );
    }
}

export default App;
