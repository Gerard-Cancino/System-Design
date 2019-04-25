import React, { PureComponent } from 'react';

class SearchTime extends PureComponent {
  render () {
    const {onChange,timeList} = this.props
    return (
      !timeList?(
        <p></p>
      ) : (
        timeList.length == 0?(
          <p>No Times are found.  If this is an error, please contact admin.</p>
        ) : (
          <div className="form-group col-md-12">
            <label>Time:</label>
            <select className="form-control" onChange={onChange}>
              <option value={undefined}>All Times</option>
              {timeList.map(el => (
                <option key={el.id} value={el.id}>{el.start} - {el.end}</option>
              ))}
            </select>
          </div>
        )
      )
    )
  }
}
export default SearchTime;