import React, { PureComponent } from 'react';

class SearchFacultyList extends PureComponent {
  render () {
    const {onChange, facultyList} = this.props
  
    return (
      facultyList == undefined?(
        <p></p>
      ) : (
        facultyList.length == 0 ?(
          <p>Could not find faculty</p>
        ) : (
          <div className="form-group col-md-12">
            <label>Faculty's Name:</label>
            <select className="form-control" onChange={onChange}>
            <option value=''>TBA</option>
            {facultyList.map(i => (
              <option key={i.user.id} value={i.user.id}>{i.user.firstName} {i.user.lastName}</option>
            ))}
            </select>
          </div>
        )
      )
    )
  }
}
export default SearchFacultyList;