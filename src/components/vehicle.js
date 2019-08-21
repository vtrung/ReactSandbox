import React, {Component} from 'react';
import {parseString} from 'xml2js';
import { parse } from 'node-html-parser';


//https://www.google.com/search?q=2015accord&tbm=isch
class VehicleImage extends Component {
  state = {
    src: "",
    isLoaded: false,
  }

  componentDidMount(){
    let search = this.props.search;

    let header = new Headers({
      'Access-Control-Allow-Origin':'https://www.google.com',
      'Content-Type': 'multipart/form-data'
    });

    fetch("https://www.google.com/search?q="+ search+ "&tbm=isch",{
      crossDomain:true,
      header: header
    })
    .then(res => res.text())
    .then(res => {
      let root = parse(res);
      console.log(root.querySelector('img'));
      
    })
    .catch(()=>{
      this.setState({
        src: "data:image/jpeg;base64,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"
      })
    })
  }

  componentWillReceiveProps(newProps) {    
    console.log('Component WILL RECIEVE PROPS!')
    let search = newProps.search;

    fetch("https://www.google.com/search?q="+ search+ "&tbm=isch")
    .then(res => res.text())
    .then(res => {
      let root = parse(res);
      console.log(root.querySelector('img'));
      
    })
    .catch(()=>{
      this.setState({
        src: "data:image/jpeg;base64,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"
      })
    })
    
 }

 render(){
   return(
     <img src={this.state.src}></img>
   )
 }
}



///
class Vehicle extends Component {
    state = {
        car: {},
        isLoaded: false,
        value: ""
    }

    componentDidMount(){
        let car = this.props.car;

        fetch("https://www.fueleconomy.gov/ws/rest/vehicle/" + car)
        .then(res => res.text())
        .then(result => {
          parseString(result, (err, re) =>{
            console.log(re);
            this.setState({
              isLoaded: true,
              car:re.vehicle
            })
            console.log(this.state.car);
          })
        })
      }

      componentWillReceiveProps(newProps) {    
        console.log('Component WILL RECIEVE PROPS!')
        console.log(newProps);
        let car = newProps.car;

        fetch("https://www.fueleconomy.gov/ws/rest/vehicle/" + car)
        .then(res => res.text())
        .then(result => {
          parseString(result, (err, re) =>{
            console.log(re);
            this.setState({
              isLoaded: true,
              car:re.vehicle
            })
            console.log(this.state.car);
          })
        })
        
     }
    

    render(){
        return (
            <div>
                <p>{this.state.car.year} {this.state.car.make} {this.state.car.model}</p>
                <p>City: {this.state.car.city08}</p>
                <p>Highway: {this.state.car.highway08}</p>
                <p>Combined: {this.state.car.comb08}</p>
                <VehicleImage search={this.state.car.year+ " " + this.state.car.make + " " + this.state.car.model} />
            </div>
        )
    }
}

/////
class CarQueryMake extends Component{
    state = {
        makes: [],
        isLoaded: false,
        value: ""
    }

    componentDidMount(){
        let year = this.props.year;

        fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=" + year)
        .then(res => res.text())
        .then(result => {
          parseString(result, (err, re) =>{
            console.log(re);
            console.log(re.menuItems.menuItem)
            this.setState({
              isLoaded: true,
              makes:re.menuItems.menuItem
            })
            //this.props.selectMake(this.state.makes[0].text);
            console.log(this.state.makes);
          })
        })
      }
      
      

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({value: event.target.value});
        this.props.selectMake(event.target.value);
    }
  
    render(){
      return (
        <div>
          
          <select value={this.state.value} onClick={this.handleChange} onChange={this.handleChange}>
            {this.state.isLoaded 
                ? this.state.makes.map((make, i) =>(
                    <option key={i} value={make.text}>{make.text}</option>
                ))
                : ""
            }
          </select>
            

        </div>
      )
      
    }

}

//////
class CarQueryYear extends Component{
    state= {
        years: [],
        isLoaded: false,
        value: ""
      }
    
      componentDidMount(){
        fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/year")
        .then(res => res.text())
        .then(result => {
          parseString(result, (err, re) =>{
            console.log(re);
            console.log(re.menuItems.menuItem)
            this.setState({
              isLoaded: true,
              years:re.menuItems.menuItem
            })
            
            //this.props.selectYear(this.state.years[0].text);
            console.log(this.state.years);
          })
        })
      }
  
      handleChange = (event) => {
          console.log(event.target.value);
          this.setState({value: event.target.value});
          this.props.selectYear(event.target.value);
      }
    
      render(){
        return (
          <div>
            
            <select value={this.state.value}  onClick={this.handleChange} onChange={this.handleChange}>
              {this.state.isLoaded 
                  ? this.state.years.map((year, i) =>(
                      <option key={i} value={year.text}>{year.text}</option>
                  ))
                  : ""
              }
            </select>
              
          </div>
        )
        
        
      }
}

////
//ws/rest/vehicle/menu/model?year=2012&make=Honda
class CarQueryModel extends Component{
    state = {
        models: [],
        isLoaded: false,
        value: ""
    }

    componentDidMount(){
        let year = this.props.year;
        let make = this.props.make;
        fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year="+year+"&make="+make)
        .then(res => res.text())
        .then(result => {
          parseString(result, (err, re) =>{
            console.log(re);
            console.log(re.menuItems.menuItem)
            this.setState({
              isLoaded: true,
              models:re.menuItems.menuItem
            })
            //this.props.selectModel(this.state.models[0].text);
            console.log(this.state.models);
          })
        })
      }

      componentWillUnmount() {
        console.log("componentWillUnmount");
      }

      componentWillMount() {
        console.log('Component WILL MOUNT!')
     }
     componentWillReceiveProps(newProps) {    
        console.log('Component WILL RECIEVE PROPS!')
        console.log(newProps);
        let year = newProps.year;
        let make = newProps.make;
        fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year="+year+"&make="+make)
        .then(res => res.text())
        .then(result => {
          parseString(result, (err, re) =>{
            console.log(re);
            console.log(re.menuItems.menuItem)
            this.setState({
              isLoaded: true,
              models:re.menuItems.menuItem
            })
            console.log(this.state.models);
          })
        })
        
     }
     shouldComponentUpdate(newProps, newState) {
        return true;
     }
     componentWillUpdate(nextProps, nextState) {
        
        console.log('Component WILL UPDATE!');
     }
     componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
     }
     
      handleChange = (event) => {
        console.log(event.target.value);
        this.setState({value: event.target.value});
        this.props.selectModel(event.target.value);
    }
  
    render(){
      return (
        <div>
          
          <select value={this.state.value} onClick={this.handleChange} onChange={this.handleChange}>
            {this.state.isLoaded 
                ? this.state.models.map((model, i) =>(
                    <option key={i} value={model.text}>{model.text}</option>
                ))
                : ""
            }
          </select>
            

        </div>
      )
    }
}

//ws/rest/vehicle/menu/options?year=2012&make=Honda&model=Fit
class CarQueryVehicle extends Component{
    state= {
        cars: [],
        isLoaded: false,
        value: ""
      }
    
      componentDidMount(){
        let year = this.props.year;
        let make = this.props.make;
        let model = this.props.model;
        fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year="+year+"&make="+make+"&model="+model)
        .then(res => res.text())
        .then(result => {
          parseString(result, (err, re) =>{
            console.log(re);
            console.log(re.menuItems.menuItem)
            this.setState({
              isLoaded: true,
              cars:re.menuItems.menuItem
            })
            this.props.selectCar(this.state.cars[0].value);
            console.log(this.state.cars);
          })
        })
      }
  
      handleChange = (event) => {
          console.log(event.target.value);
          this.setState({value: event.target.value});
          this.props.selectCar(event.target.value);
      }
    
      render(){
        return (
          <div>
            
            <select value={this.state.value} onChange={this.handleChange} onClick={this.handleChange}>
              {this.state.isLoaded 
                  ? this.state.cars.map((car, i) =>(
                      <option key={i} value={car.value}>{car.text}</option>
                  ))
                  : ""
              }
            </select>
              
          </div>
        )
        
        
      }
}


class CarQuery extends Component{
    state= {
      year: "",
      make: "",
      model: "",
      car: "",
      isLoaded: false,
      value: ""
    }
  
    componentDidMount(){
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
      }

    handleYearChange = (yearValue) =>{
        console.log("parent: " + yearValue);
        this.setState({
            year: yearValue, 
            make:"", 
            model:""
        })
    }

    handleMakeChange = (makeValue) => {
        console.log("parent make: " + makeValue);
        this.setState({
            make:makeValue, 
            model:""
        });
    }

    handleModelChange = (modelValue) => {
        console.log("parent model: " + modelValue);
        this.setState({
            model:modelValue
        });
    }

    handleCarChange = (carValue) => {
        console.log("parent car:");
        console.log(carValue);
        this.setState({
            car: carValue
        })
    }

  
    render(){
      return (
        <div>
            <CarQueryYear selectYear={this.handleYearChange}/>
            
            {this.state.year.length > 0
                ? <CarQueryMake year={this.state.year} selectMake={this.handleMakeChange} />
                : ""
            }

            {this.state.make.length > 0
                ? <CarQueryModel year={this.state.year} make={this.state.make} selectModel={this.handleModelChange} />
                : ""
            }


            {this.state.model.length > 0
                ? <CarQueryVehicle year={this.state.year} make={this.state.make} model={this.state.model} selectCar={this.handleCarChange} />
                : ""
            }

            {this.state.car.length > 0
                ? <Vehicle car={this.state.car} selectCar={this.handleCarChange} />
                : ""
            }
                  
        </div>
      )
      
      
    }
  }

//export default Vehicle;

export {
    Vehicle, 
    CarQuery
}

