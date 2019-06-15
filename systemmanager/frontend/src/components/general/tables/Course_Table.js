import React, { PureComponent } from 'react';

class CourseTable extends PureComponent {
  render () {
    const {courseList} = this.props
  
    return (
      !courseList?(
        <p></p>
      ) : (
        courseList.length == 0 ? (
          <p></p>
        ):(
          <section className="container-fluid h-100">
            <div className="row border rounded m-4 p-4 h-100">
                <table className="table table-striped">
                  <thead style={{backgroundColor:"#696969", color:"white"}}>
                    <tr>
                      <td >ID</td>
                      <td >Course Name</td>
                      <td >Course Description</td>
                      <td ># of Credits</td>
                      <td ></td>
                      <td ></td>
                    </tr>
                  </thead>
                  <tbody>
                    {courseList.map(el => (
                      <tr key={el.number}>
                        <td >{el.department_id}{el.number}</td>
                        <td >{el.name}</td>
                        <td >{el.description}</td>
                        <td >{el.numberOfCredits}</td>
                        <td >
                          <button>Add</button>
                        </td>
                        <td >
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
    )
  }
}
export default SearchTerm;