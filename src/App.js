import React, {Component} from 'react';
import './App.css';
import {parseString} from 'xml2js';
import { Vehicle, CarQuery }from './components/vehicle';



class App extends Component {
  state = {
    open: true,
    isLoaded: false,
    vehicle: []
  }

  toggleOpen = () => {
    this.setState(prevState => ({
      open : !prevState.open
    }))
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  
  render(){

    console.log(this.state);
    const {phones} = this.props;
    return (
      <div>
        <div className="car-container">
        <CarQuery />
        </div>
        

        {/* <h1>Phones</h1>
        <p>{this.state.open ? 'open' : 'closed'}</p>
        <button onClick={this.toggleOpen}>change</button>
        <div>
          {this.state.vehicle.make}
        </div>
        <ul>
    
          {phones.map((phone, i)=>(
            <Phone key={i} phone={phone} />
            // <li key={i}>Company: {phone.company} | {phone.name}</li>
          ))}
    
        </ul> */}
      </div>
      
    )
  }
};

const Phone = ({phone, i}) => (
  <li key={i}>Company: {phone.company} | {phone.name}</li>
)



export default App;
