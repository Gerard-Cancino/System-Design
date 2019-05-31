import React, { PureComponent } from 'react';

class SearchFacultyName extends PureComponent {
  render () {
    const {onChange} = this.props
  
    return (
      <div className="form-group col-md-12">
        <label>Description</label>
        {this.props.isRequired?(
          <textarea value={undefined} className="form-control" onChange={onChange} placeholder="Description" row="3" required></textarea>
        ):(
          <textarea className="form-control" onChange={onChange} placeholder="Description" row="3"></textarea>
        )}
      </div>
    )
  }
}
export default SearchFacultyName;