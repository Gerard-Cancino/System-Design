import React, { PureComponent } from 'react';

class InputNumberSeats extends PureComponent {
  render () {
    const {onChange} = this.props
  
    return (
      <div className="form-group col-md-12">
        <label htmlFor="numOfSeats">Number of Seats</label>
        {this.props.isRequired?(
          <input className="form-control" id="numOfSeats" placeholder="Number of Seats" onChange={onChange} required/>
        ):(
          <input className="form-control" id="numOfSeats" placeholder="Number of Seats" onChange={onChange}/>
        )}
      </div>
    )
  }
}
export default InputNumberSeats;