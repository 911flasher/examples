import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//ReactDOM.unmountComponentAtNode();
//ReactDOM.findDOMNode();

/*
function tick() {
    const element = (
        <div>
            <h1>hellooo</h1>
            <h1>time is {new Date().toLocaleTimeString()}</h1>
        </div>            
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}
setInterval(tick, 1000);
*/


function Hello (props) {
    return <h1> Hello, {props.name}</h1>;
}

const elem = <Hello/>;
ReactDOM.render(
    elem,
    document.getElementById('root')
    );
serviceWorker.unregister();
