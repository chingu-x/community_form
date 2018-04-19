import React, { Component } from 'react';
require('./button.css');

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

export default Button;
