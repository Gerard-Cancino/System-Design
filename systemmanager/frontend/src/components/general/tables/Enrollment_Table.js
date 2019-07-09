import React, { PureComponent } from 'react';

function checkAddDrop(term) {
  let today = new Date();
  let year = parseInt(today.getFullYear());
  // Spring november 4 2019 to january 27 2020
  // Fall April 1 to Sept 1
  // Fall + Spring
  if (term.year==year||term.year==year-1){
    let month = parseInt(today.getMonth());
    // Spring
    if((month>10||month<2)&&term.season=="SP"){
      let beginTerm = new Date((term.year-1)+"-11-04");
      let endTerm = new Date(term.year+"-01-27");
      if(beginTerm<today<endTerm){
        return true;
      }
    }
    // Fall
    else if((month>5&&month<10)&&term.season=="F"&&term.year==year){
      let beginTerm = new Date(term.year+"-04-01");
      let endTerm = new Date(term.year+"-09-01");
      if(beginTerm<today<endTerm){
        return true;
      }
    }
  }
  return false;
}


class SearchTerm extends PureComponent {
  state = {
    enrollmentList: undefined
  }
  componentDidMount(){
    this.setState({enrollmentList: this.props.enrollmentList})
  }
  componentWillReceiveProps(data){
    console.log(data)
    this.setState({enrollmentList: data.enrollmentList})
  }
  render () {
    const {handleDrop} = this.props
  
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
                  <td className="col-md-1">{el.course_section.course.id}</td>
                  <td className="col-md-2">{el.course_section.course.name}</td>
                  <td className="col-md-1">{el.course_section.number}</td>
                  <td className="col-md-2">{el.course_section.faculty.user.firstName} {el.course_section.faculty.user.lastName}</td>
                  <td className="col-md-3">
                    {el.course_section.slot.map(slot=>(
                      <p className="col-md-12">{slot.day.name} {slot.time.start}-{slot.time.end}</p>
                    ))}
                  </td>
                  <td className="col-md-2">{el.course_section.room.building.code}{el.course_section.room.number}</td>
                  {!checkAddDrop(el.course_section.term)?(
                    <td className="col-md-1"><button className="btn btn-danger" disabled>Drop</button></td>
                  ):(
                    <td className="col-md-1">
                      <button className="col-md-12 btn btn-danger" onClick={(e)=>handleDrop(e,el.course_section.id,el.student.user.email)}>Drop</button>
                    </td>
                  )}
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