import React, { PureComponent } from 'react';

class SearchTerm extends PureComponent {
  render () {
    const {enrollmentList} = this.props
  
    return (
      !enrollmentList?(
        <p></p>
      ) : (
        enrollmentList.length == 0?(
          <p>Could not find enrollment</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>Course</td>
              </tr>
            </thead>
            <tbody>
              {enrollmentList.map(el => {
                <tr key={el.id}>
                  <td></td>
                </tr>
              })}
            </tbody>
          </table>
        )
      )
    )
  }
}
export default SearchTerm;