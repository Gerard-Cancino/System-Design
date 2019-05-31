import React, { PureComponent } from 'react';

class SearchTerm extends PureComponent {
  render () {
    const {onChange} = this.props
  
    return (
      <div className="form-group col-md-12">
        <label htmlFor="studentUsername">Student's Username</label>
        {this.props.isRequired?(
          <input id="studentUsername" className="form-control" type="text" placeholder="Enter Student's Username" onChange={onChange} required/>

        ):(
          <input id="studentUsername" className="form-control" type="text" placeholder="Enter Student's Username" onChange={onChange}/>
        )}
      </div>
    )
  }
}
export default SearchTerm;