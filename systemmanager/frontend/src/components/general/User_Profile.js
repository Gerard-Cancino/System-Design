import React, { PureComponent } from 'react';

class ProfileUser extends PureComponent {
  render () {
    const {account} = this.props
  
    return (
      !this.props.account?(
        <p>Could not find user</p>
      ) : (        
        <div>
          <p><strong>Name: {account.firstName} {account.lastName}</strong></p>
          <p><strong>Address:</strong></p>
          <p>{account.address}</p>
          <p>{account.city}, {account.state} {account.zipCode}</p>
          <p>Email: {account.email}@garageuniversity.tech</p>
          <p>Phone Number: {account.phoneNumber}</p>
        </div>       
      )
    )
  }
}
export default ProfileUser;