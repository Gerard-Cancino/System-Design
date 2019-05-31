import React, { PureComponent } from 'react';

class SearchCourseID extends PureComponent {
  render () {
    const {onChange} = this.props
  
    return (
      this.props.isRequired?(
        <div className="form-group col-md-12">
          <label htmlFor="courseID">Course ID:</label>
          <input className="form-control" id="courseName" placeholder="Enter Course ID" onChange={onChange} required/>
        </div>
      ):(
        <div className="form-group col-md-12">
          <label htmlFor="courseID">Course ID:</label>
          <input className="form-control" id="courseName" placeholder="Enter Course ID" onChange={onChange}/>
        </div>
      )
    )
  }
}
export default SearchCourseID;