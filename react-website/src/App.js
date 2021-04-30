import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter.js';
import { BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="App">          
        <Router>
          <AppRouter></AppRouter>
        </Router>
      </div>
    );
  }
  
}

export default App;