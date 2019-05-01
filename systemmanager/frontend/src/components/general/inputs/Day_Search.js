import React, { PureComponent } from 'react';

class SearchDay extends PureComponent {
  render () {
    const {onChange, mon, tues, wed, thurs} = this.props
  
    return (
      <div className="form-group col-md-12">
        <label htmlFor="checkboxes">Days:</label>
        <div id="checkboxes">
          <input type="checkbox" name="day1" value="MO" onChange={onChange} checked={mon}/>Monday
          <input type="checkbox" name="day2" value="TU" onChange={onChange} checked={tues}/>Tuesday
          <input type="checkbox" name="day3" value="WE" onChange={onChange} checked={wed}/>Wednesday
          <input type="checkbox" name="day4" value="TH" onChange={onChange} checked={thurs}/>Thursday
        </div>
      </div>
    )
  }
}
export default SearchDay;