import React, { PureComponent } from 'react';

class ProfileChangePassword extends PureComponent {
  state = {
    currentPassword: undefined,
    newPassword: undefined,
    isSame: false,
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value || undefined;
    this.setState(prevState => {
      const newState = {...prevState};
      newState[name] = value;
      return newState;
    })
  }
  conflicts = () =>{
    if(this.state.currentPassword!=undefined && this.state.currentPassword == this.state.newPassword){
      this.setState({isSame:true})
      return false;
    }
    return true
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    if(this.conflicts()){
      this.props.onSubmit(this.state.currentPassword,this.state.newPassword)
      console.log('did not work')
    }
  }
  render () {
    return (
      <form className="col-md-12" onSubmit={e => this.handleSubmit(e)}>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" className="form-control" name="currentPassword" onChange={this.handleChange} required/>
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" className="form-control" name="newPassword" onChange={this.handleChange} required/>
        </div>
        <button type="submit" className="col-md-12 btn btn-info">Submit New Password</button>
        {!this.state.isSame?(
          <p></p>
        ):(
          <p>new password cannot be the same as the old password</p>
        )}
      </form>    
    )
  }
}
export default ProfileChangePassword;