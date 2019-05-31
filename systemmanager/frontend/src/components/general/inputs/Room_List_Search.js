import React, { PureComponent } from 'react';

class SearchRoomList extends PureComponent {
  render () {
    const {onChange, roomList} = this.props
  
    return (
      roomList == undefined?(
        <p></p>
      ) : (
        roomList.length == 0 ?(
          <p>Could not find any rooms</p>
        ) : (
          <div className="form-group col-md-12">
            <label>Room:</label>
            {this.props.isRequired?(
              <select className="form-control" onChange={onChange} required>
                {roomList.map(i => (
                  <option key={i.id} value={i.id}>{i.number}</option>
                ))}
              </select>
            ):(
              <select className="form-control" onChange={onChange}>
                {roomList.map(i => (
                  <option key={i.id} value={i.id}>{i.number}</option>
                ))}
              </select>
            )}
          </div>
        )
      )
    )
  }
}
export default SearchRoomList;