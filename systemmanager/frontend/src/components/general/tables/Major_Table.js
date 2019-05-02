import React, { PureComponent } from 'react';

class SearchTerm extends PureComponent {
  render () {
    const {majorList} = this.props
  
    return (
      !majorList?(
        <p></p>
      ) : (
        majorList.length == 0?(
          <p>Could not find any majors</p>
        ) : (
          majorList.map(dep = (
            <div>
              <h2>Department: {dep.department.name}</h2>
              {dep.requirement.map(req => (
                <table>
                  <thead>
                    <tr>
                      <td>Course </td>
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

              ))}
            </div>
          ))
        )
      )
    )
  }
}
export default SearchTerm;