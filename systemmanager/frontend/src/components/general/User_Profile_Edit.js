import React, { PureComponent } from 'react';

class ProfileUser extends PureComponent {
  state = {
    address: undefined,
    city: undefined,
    state: undefined,
    zipCode: undefined,
    phoneNumber: undefined
  }
  componentDidMount(){
    this.setState({
      address: this.props.account.address,
      city: this.props.account.city,
      state: this.props.account.state,
      zipCode: this.props.account.zipCode,
      phoneNumber: this.props.account.phoneNumber
    })
  }
  handleAddress = event => {
    this.setState({address:event.target.value})
  }
  handleCity = event => {
    this.setState({city:event.target.value})
  }
  handleState = event => {
    this.setState({state:event.target.value})
  }
  handleZipCode = event => {
    this.setState({zipCode:event.target.value})
  }
  handlePhoneNumber = event => {
    this.setState({phoneNumber:event.target.value})
  } 
  render () {
    const {onSubmit} = this.props;
  
    return (
      !this.props.account?(
        <p>Could not find user</p>
      ) : (   
        <form className="col-md-12" onSubmit={onSubmit(this.state.address, this.state.city, this.state.state, this.state.zipCode, this.state.phoneNumber)}>
          <div className="form-group">
            <label>Address</label>
            <input className="form-control" value={this.state.address} onChange={this.handleAddress}/>
          </div>
          <div className="form-group">
            <label>City</label>
            <input className="form-control" value={this.state.city} onChange={this.handleCity}/>
          </div>
          <div className="form-group">
            <label>State</label>
            <input className="form-control" value={this.state.state} onChange={this.handleState}/>
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input className="form-control" value={this.state.zipCode} onChange={this.handleZipCode}/>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input className="form-control" value={this.state.phoneNumber} onChange={this.handlePhoneNumber}/>
          </div>
          <button className="col-md-12 btn btn-info">Confirm Edit</button>
        </form>    
      )
    )
  }
}
export default ProfileUser;