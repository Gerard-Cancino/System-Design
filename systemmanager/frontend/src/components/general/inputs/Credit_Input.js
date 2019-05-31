import React, { PureComponent } from 'react';

class InputCredit extends PureComponent {
  render () {
    const {onChange} = this.props
  
    return (
      this.props.isRequired?(
        <div className="form-group col-md-12">
          <label htmlFor="credits">Number of Credits:</label>
          <input className="form-control" id="credits" placeholder="Enter Number of Credits" onChange={onChange} required/>
        </div>
      ):(
        <div className="form-group col-md-12">
          <label htmlFor="credits">Course Name:</label>
          <input className="form-control" id="credits" placeholder="Enter Number of Credits" onChange={onChange}/>
        </div>
      )
    )
  }
}
export default InputCredit;