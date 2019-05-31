import React, { PureComponent } from 'react';

class ProfileUser extends PureComponent {
  state = {
    address: undefined,
    city: undefined,
    state: undefined,
    zipCode: undefined,
    phoneNumber: undefined,
    second_email: undefined
  }
  componentDidMount(){
    this.setState({
      address: this.props.account.address,
      city: this.props.account.city,
      state: this.props.account.state,
      zipCode: this.props.account.zipCode,
      phoneNumber: this.props.account.phoneNumber,
      second_email: this.props.account.second_email,
    })
  }
  handleAddress = event => {
    this.setState({address:event.target.value || undefined})
  }
  handleCity = event => {
    this.setState({city:event.target.value || undefined})
  }
  handleState = event => {
    this.setState({state:event.target.value || undefined})
  }
  handleZipCode = event => {
    this.setState({zipCode:event.target.value || undefined})
  }
  handlePhoneNumber = event => {
    this.setState({phoneNumber:event.target.value || undefined})
  } 
  handleSecondEmail = event =>{
    this.setState({second_email:event.target.value || undefined})
  }
  render () {
    const {onSubmit} = this.props;
  
    return (
      !this.props.account?(
        <p>Could not find user</p>
      ) : (   
        <form className="col-md-12" onSubmit={onSubmit(this.state.address, this.state.city, this.state.state, this.state.zipCode, this.state.phoneNumber, this.state.second_email)}>
          <div className="form-group">
            <label>Secondary Email</label>
            <input type="email" className="form-control" value={this.state.second_email} onChange={this.handleSecondEmail} />
          </div>
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