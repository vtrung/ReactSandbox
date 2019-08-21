import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const phones = [
    {name:"iphone",company:"apple"},
    {name:"galaxy",company:"samsung"},
    {name:"pixel",company:"google"},
]

ReactDOM.render(<App phones={phones}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
