import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Scanner from './Scanner';
import 'bootstrap/dist/css/bootstrap.css';


class Automator extends Component {
    constructor(props){
        super(props);
        this.state = {
            barcodeResult : 0
        };
        this.handleBarcodeChange = this.handleBarcodeChange.bind(this);
    }
    
    handleBarcodeChange(value) {
        this.setState({ barcodeResult : value });
    }
    
    render(){
        return (
          <div className="App">
          Automator
          <Scanner onChange={this.handleBarcodeChange}/>
          {this.state.barcodeResult}
          </div>
        );
    }
}

export default Automator;