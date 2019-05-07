import React, { PureComponent } from 'react';

class SearchCourseName extends PureComponent {
  render () {
    const {onChange} = this.props
  
    return (
      <div className="form-group col-md-12">
        <label htmlFor="courseName">Course Name:</label>
        <input className="form-control" id="courseName" placeholder="Enter Course Name" onChange={onChange}/>
      </div>
    )
  }
}
export default SearchCourseName;