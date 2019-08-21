import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const phones = [
    {name:"iphone",company:"apple"},
    {name:"galaxy",company:"samsung"},
    {name:"pixel",company:"google"},
  ]
  const div = document.createElement('div');

  ReactDOM.render(<App phones={phones}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
