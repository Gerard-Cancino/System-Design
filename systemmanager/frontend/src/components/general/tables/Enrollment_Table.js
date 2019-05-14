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
    else if((month>5||month<10)&&term.season=="F"){
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
  render () {
    const {enrollmentList,handleDrop} = this.props
  
    return (
      !enrollmentList?(
        <p></p>
      ) : (
        enrollmentList.length == 0?(
          <p>Could not find enrollment</p>
        ) : (
          <table className="col-md-12">
            <thead className="col-md-12">
              <tr className="col-md-12">
                <td className="col-md-1">ID</td>
                <td className="col-md-2">Name</td>
                <td className="col-md-1">Number</td>
                <td className="col-md-2">Faculty</td>
                <td className="col-md-3">Time</td>
                <td className="col-md-2">Room-Building</td>
                <td className="col-md-1"></td> {/*Drop*/}
              </tr>
            </thead>
            <tbody className="col-md-12">
              {enrollmentList.map(el => (
                <tr className="col-md-12" key={el.course_section.id}>
                  <td className="col-md-1">{el.course_section.course.id}</td>
                  <td className="col-md-2">{el.course_section.course.name}</td>
                  <td className="col-md-1">{el.course_section.number}</td>
                  <td className="col-md-2">{el.course_section.faculty.user.firstName} {el.course_section.faculty.user.lastName}</td>
                  <td className="col-md-3">
                    {el.course_section.slot.map(el=>{
                      <p className="col-md-12">{el.day.name} {el.time.start}-{el.time.end}</p>
                    })}
                  </td>
                  <td className="col-md-2">{el.course_section.room.building.code}{el.course_section.room.number}</td>
                  {!checkAddDrop(el.course_section.term)?(
                    <td className="col-md-1"><button className="btn btn-danger" disabled>Drop</button></td>
                  ):(
                    <td className="col-md-1">
                      <button className="col-md-12 btn btn-danger" onClick={(e)=>handleDrop(e,el.course_section.id,el.student.user.id)}>Drop</button>
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