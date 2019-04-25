import React, { PureComponent } from 'react';

class SearchFacultyName extends PureComponent {
  render () {
    const {onChange} = this.props
  
    return (
      <div className="form-group col-md-12">
        <label htmlFor="facultyLastName">Faculty Last Name</label>
        <input className="form-control" id="facultyLastName" placeholder="Enter Faculty's Last Name" onChange={onChange}/>
      </div>
    )
  }
}
export default SearchFacultyName;