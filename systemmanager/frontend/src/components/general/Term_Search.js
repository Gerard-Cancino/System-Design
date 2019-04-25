import React, { PureComponent } from 'react';

class SearchTerm extends PureComponent {
  render () {
    const {onChange, termList} = this.props
  
    return (
      termList==undefined?(
        <p></p>
      ) : (
        termList.length==0? (
          <p>No Terms Found</p> 
        ) : (
          <div className="form-group col-md-12">
            <label htmlFor="term">Term:</label>
            <select id="term" className="form-control" onChange={onChange} autoFocus>
              <option value={undefined}>All Terms</option>
              {termList.map(single => (
                <option key={single.id} value={single.id}>{single.season}: {single.year}</option>
              ))}
            </select>
          </div>

        )
      )
    )
  }
}
export default SearchTerm;