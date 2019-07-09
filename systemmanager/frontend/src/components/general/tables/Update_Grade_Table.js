import React, { PureComponent } from 'react';

class SearchTerm extends PureComponent {
  state = {
    enrollmentList: undefined
  }
  componentDidMount(){
    this.setState({enrollmentList: this.props.enrollmentList})
  }
  componentWillReceiveProps(data){
    this.setState({enrollmentList: data.enrollmentList})
  }
  render () {
    const {handleGrade} = this.props
  
    return (
      !this.state.enrollmentList?(
        <p></p>
      ) : (
        this.state.enrollmentList.length == 0?(
          <p>Could not find enrollment</p>
        ) : (
          <table className="table">
            <thead>
              <tr >
                <td scope="col-md-1">ID</td>
                <td scope="col-md-2">Name</td>
                <td scope="col-md-1">Number</td>
                <td scope="col-md-2">Faculty</td>
                <td scope="col-md-3">Time</td>
                <td scope="col-md-2">Room-Building</td>
                <td scope="col-md-1"></td> {/*Drop*/}
              </tr>
            </thead>
            <tbody className="col-md-12">
              {this.state.enrollmentList.map(el => (
                <tr className="col-md-12" key={el.course_section.id}>
                  <td className="col-md-1">{el.course_section.id}</td>
                  <td className="col-md-2">{el.course_section.course.id} {el.course_section.course.name}</td>
                  <td className="col-md-1">{el.course_section.number}</td>
                  <td className="col-md-2">{el.course_section.faculty.user.firstName} {el.course_section.faculty.user.lastName}</td>
                  <td className="col-md-3">
                    {el.course_section.slot.map(slot=>(
                      <p className="col-md-12">{slot.day.name} {slot.time.start}-{slot.time.end}</p>
                    ))}
                  </td>
                  <td className="col-md-2">{el.course_section.room.building.code}{el.course_section.room.number}</td>
                  <td className="col-md-1">
                    <button className="col-md-12 btn btn-danger" value={el.course_section.id} onClick={handleGrade}>Update</button>
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