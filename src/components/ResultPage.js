'use strict';

import {DOM, Component, createFactory, PropTypes, createElement} from 'react';

class ResultPage extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'ResultPage';

        this.state = {
            userName: ''
        }
    }

    render() {
        return DOM.div({
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                fontFamily: 'Roboto, sans-serif'
            }
        }, this.renderMask(), this.renderTitle(), this.props.userName ? this.renderResult(this.props.userName, this.props.result) :
            this.renderInput());
    }

    renderMask() {
        return DOM.div({
            style: {
                position: 'fixed',
                width: '100%',
                height: '100%',
                opacity: '0.5',
                backgroundColor: 'white',
                zIndex: 100
            }
        });
    }

    renderTitle() {
        return DOM.div({
            style: {
                paddingTop: '30px',
                fontSize: '60px',
                fontWeight: '700',
                width: '60%',
                textAlign: 'center',
                zIndex: 150
            }
        }, 'Your result');
    }

    renderResult(name, result) {
        return DOM.div({
            style: {
                paddingTop: '15px',
                width: '300px',
                fontSize: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                zIndex: 150
            }
        }, this.renderName(name), this.renderScore(result));
    }

    renderName(name) {
        return DOM.div(null, name);
    }

    renderScore(result) {
        return DOM.div(null, result);
    }

    renderInput() {
        if (this.state.userName) {
            return null;
        }
    }
}

export default ResultPage;
