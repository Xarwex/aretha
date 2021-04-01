import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import './scss/app';

function updateSite() {
    render(<App />, document.getElementById("root"))
}

//updateSite()
setInterval(updateSite, 1000)