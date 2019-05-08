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
                <td>ID</td>
                <td>Name</td>
                <td>Number</td>
                <td>Faculty</td>
                <td>Time</td>
                <td>Room-Building</td>
                <td></td> {/*Drop*/}
              </tr>
            </thead>
            <tbody>
              {enrollmentList.map(el => (
                <tr key={el.course_section.id}>
                  <td>{el.course_section.course.id}</td>
                  <td>{el.course_section.course.name}</td>
                  <td>{el.course_section.number}</td>
                  <td>{el.course_section.faculty.user.firstName} {el.course_section.faculty.user.lastName}</td>
                  <td>
                    {el.course_section.slot.map(el=>{
                      <p className="col-md-12">{el.day.name} {el.time.start}-{el.time.end}</p>
                    })}
                  </td>
                  <td>{el.course_section.room.building.code}{el.course_section.room.number}</td>
                  <td>
                    <button onClick={(e)=>this.handleDrop(e,el.course_section.id)}></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )
    )
  }
}
export default SearchTerm;