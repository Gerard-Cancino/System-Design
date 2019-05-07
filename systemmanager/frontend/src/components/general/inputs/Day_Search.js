import React, { PureComponent } from 'react';

class SearchDay extends PureComponent {
  render () {
    const {onChange, mon, tues, wed, thurs, fri} = this.props
  
    return (
      <div className="form-group col-md-12" id="checkboxes">
        <label className="" htmlFor="checkboxes">Days:</label>
        <br />
        <div className="form-check form-check-inline">
          <label className="form-check-label">Monday</label>
          <input className="form-check-input" type="checkbox" name="day1" value="MO" onChange={onChange} checked={mon}/>
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label">Tuesday</label>
          <input className="form-check-input" type="checkbox" name="day2" value="TU" onChange={onChange} checked={tues}/>
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label">Wednesday</label>
          <input className="form-check-input" type="checkbox" name="day3" value="WE" onChange={onChange} checked={wed}/>
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label">Thursday</label>
          <input className="form-check-input" type="checkbox" name="day4" value="TH" onChange={onChange} checked={thurs}/>
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label">Friday</label>
          <input className="form-check-input" type="checkbox" name="day5" value="FR" onChange={onChange} checked={fri}/>
        </div>
      </div>
    )
  }
}
export default SearchDay;