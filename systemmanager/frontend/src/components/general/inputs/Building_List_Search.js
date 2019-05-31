import React, { PureComponent } from 'react';

class SearchBuildingList extends PureComponent {
  render () {
    const {onChange, buildingList} = this.props
  
    return (
      buildingList == undefined?(
        <p></p>
      ) : (
        buildingList.length == 0 ?(
          <p>Could not find any buildings</p>
        ) : (
          <div className="form-group col-md-12">
            <label>Building:</label>
            {this.props.isRequired?(
              <select className="form-control" onChange={onChange} required>
                {buildingList.map(i => (
                  <option key={i.code} value={i.code}>{i.name}</option>
                ))}
              </select>
            ):(
              <select className="form-control" onChange={onChange}>
                {<option value=''>All Buildings</option>}
                {buildingList.map(i => (
                  <option key={i.code} value={i.code}>{i.name}</option>
                ))}
              </select>
            )}
          </div>
        )
      )
    )
  }
}
export default SearchBuildingList;