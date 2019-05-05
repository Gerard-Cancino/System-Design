import React, { PureComponent } from 'react';

class CourseTable extends PureComponent {
  render () {
    const {courseList} = this.props
  
    return (
      !courseList?(
        <p></p>
      ) : (
        courseList.length != 0 ? (
          <section className="container-fluid h-100">
            <div className="row border rounded m-4 p-4 h-100">
                <table>
                  <thead>
                    <tr>
                      <td className='col-md-1'>ID</td>
                      <td className='col-md-3'>Course Name</td>
                      <td className='col-md-7'>Course Description</td>
                      <td className='col-md-1'># of Credits</td>
                      <td className='col-md-1'></td>
                      <td className='col-md-1'></td>
                    </tr>
                  </thead>
                  <tbody>
                    {courseList.map(el => (
                      <tr key={el.number}>
                        <td className='col-md-1'>{el.department_id}{el.number}</td>
                        <td className='col-md-3'>{el.name}</td>
                        <td className='col-md-7'>{el.description}</td>
                        <td className='col-md-1'>{el.numberOfCredits}</td>
                        <td className='col-md-1'>
                          <button>Add</button>
                        </td>
                        <td className='col-md-1'>
                          <button>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
      )
    )
  }
}
export default SearchTerm;