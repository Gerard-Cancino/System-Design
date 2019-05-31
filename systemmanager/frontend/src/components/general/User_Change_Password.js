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
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.onSubmit(this.state.currentPassword,this.state.newPassword);
  }
  render () {
    return (
      <form className="col-md-12" onSubmit={e => this.handleSubmit(e)}>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" className="form-control" name="currentPassword" onChange={this.handleChange} placeholder="old password" required/>
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" className="form-control" name="newPassword" onChange={this.handleChange} placeholder="new password" required/>
        </div>
        <button type="submit" className="col-md-12 btn btn-info">Submit New Password</button>
      </form>    
    )
  }
}
export default ProfileChangePassword;