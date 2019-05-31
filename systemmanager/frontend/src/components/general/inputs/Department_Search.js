import React, { PureComponent } from 'react';

class SearchDepartment extends PureComponent {
  render () {
    const {onChange,departmentList} = this.props
  
    return (
      !departmentList?(
        <p></p>
      ) : (
        departmentList.length == 0?(
          <p>No Departments found.  If this is an error, please contact admin.</p>
        ) : (
          <div className="form-group col-md-12">
            <label>Department:</label>
            {this.props.isRequired?(
                <select className="form-control" onChange={onChange} required>
                  {departmentList.map(el => (
                    <option key={el.code} value={el.code}>{el.code}: {el.name}</option>
                  ))}
                </select>
            ):(
              <select className="form-control" onChange={onChange}>
                <option value=''>All Departments</option>
                {departmentList.map(el => (
                  <option key={el.code} value={el.code}>{el.code}: {el.name}</option>
                ))}
              </select>
            )}
          </div>
        )
      )
    )
  }
}
export default SearchDepartment;