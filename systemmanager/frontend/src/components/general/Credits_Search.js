import React, { PureComponent } from 'react';

class SearchCredits extends PureComponent {
  render () {
    const {onChangeMin, onChangeMax} = this.props
  
    return (
      <React.Fragment >
      <div className="form-group col-md-12">
        <label htmlFor="creditMin">Credits Minimum:</label>
        <input className="form-control" id="creditMin" placeholder="Enter Credit Minimum" onChange={onChangeMin}/>
      </div>
      <div className="form-group col-md-12">
        <label htmlFor="creditMax">Credits Maximum:</label>
        <input className="form-control" id="CreditMax" placeholder="Enter Credit Maximum" onChange={onChangeMax}/>
      </div>
      </React.Fragment>
    )
  }
}
export default SearchCredits;