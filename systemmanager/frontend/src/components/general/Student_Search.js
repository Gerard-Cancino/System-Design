import React, { PureComponent } from 'react';

class SearchTerm extends PureComponent {
  render () {
    const {onChange} = this.props
  
    return (
      <div className="form-group col-md-12">
        <label htmlFor="studentUsername">Student's Username</label>
        <input id="studentUsername" className="form-control" type="text" placeholder="Enter Student's Username" onChange={onChange} required/>
      </div>
    )
  }
}
export default SearchTerm;