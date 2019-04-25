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
            <select className="form-control" onChange={onChange}>
              {buildingList.map(i => (
                <option key={i.code} value={i.code}>{i.name}</option>
              ))}
            </select>
          </div>
        )
      )
    )
  }
}
export default SearchBuildingList;