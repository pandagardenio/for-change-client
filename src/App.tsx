import React from 'react';

import { Map } from './components/Map';
import places from './data/places.json';
import { Place } from './models/Place';
import './App.css';


function App() {
    return (
        <Map places={places as Place[]}/>
    );
}

export default App;
