import React, { PureComponent } from 'react';

class ProfileUser extends PureComponent {
  render () {
    const {advisor} = this.props
  
    return (
      !this.props.advisor?(
        <p>Could not find advisors</p>
      ) : (        
        <div>
          <p><strong>Advisor: </strong>{advisor.faculty.user.firstName} {advisor.faculty.user.lastName}</p>
          <p>email: {advisor.faculty.user.email}</p>
        </div>       
      )
    )
  }
}
export default ProfileUser;