import React, { Component } from 'react';

//I will take in the student transcrip and one major
class DegreeAuditTable extends Component {
  // I need to get a list of all courses pertaining to a major/minor
  // Based on those courses, there needs to be status
  // if in transcript with a grade then the course is already taken
  // display overall gpa(parent component), major/program gpa
  
  compareCourses(transcriptList,majorRequirement){
    for(let i = 0;i<transcriptList.length;i++){
      if(transcriptList[i].course.id==majorRequirement.id){
        if(transcriptList[i].gradeReceived==undefined){
          return (
            <tr className="table-warning">
              <td >P</td>
              <td >{majorRequirement.id}</td>
              <td >{majorRequirement.name}</td>
              <td></td>
              <td></td>
              <td></td>
              <td >{transcriptList[i].season} {transcriptList[i].year}</td>
            </tr>
          )
        }
        else {
          if(transcriptList<='C'){
            return (
              <tr className="table-danger">
                <td >F</td>
                <td >{majorRequirement.id}</td>
                <td >{majorRequirement.name}</td>
                <td >{transcriptList[i].gradeReceived}</td>
                {transcriptList[i].gradeReceived=='F'?(<td><p>0</p></td>):(null)}
                <td>{majorRequirement.numberOfCredits}</td>
                <td >{transcriptList[i].season} {transcriptList[i].year}</td>
              </tr>
            )
          }
          else{
            return (
              <tr className="table-success">
                <td >C</td>
                <td >{majorRequirement.id}</td>
                <td >{majorRequirement.name}</td>                        
                <td>{transcriptList[i].gradeReceived}</td>        
                {transcriptList[i].gradeReceived=='A'?(<td><p>4</p></td>):(null)}
                {transcriptList[i].gradeReceived=='B'?(<td><p>3</p></td>):(null)}
                {transcriptList[i].gradeReceived=='C'?(<td><p>2</p></td>):(null)}
                {transcriptList[i].gradeReceived=='D'?(<td><p>1</p></td>):(null)}
                {transcriptList[i].gradeReceived=='F'?(<td><p>0</p></td>):(null)}
                <td>{majorRequirement.numberOfCredits}</td>
                <td >{transcriptList[i].season} {transcriptList[i].year}</td>
              </tr>
            )
          }
        }
      }
    }
    return (
      <tr>
        <td >R</td>
        <td >{majorRequirement.id}</td>
        <td >{majorRequirement.name}</td>
        <td></td>
        <td ></td>
        <td></td>
        <td ></td>
      </tr>
    )
  }
  getGPA(transcriptList,majorRequirements){
    let semesterTotalGPA = 0;
    let semesterCredits = 0;
    for(let i = 0;i<transcriptList.length;i++){
      for (let major of majorRequirements){
        if(transcriptList[i].course.id==major.id){
          if(transcriptList[i].gradeReceived!=undefined){
            if(transcriptList[i].gradeReceived=='A'){
              semesterTotalGPA += 4*parseInt(transcriptList[i].course.numberOfCredits);
              semesterCredits += transcriptList[i].course.numberOfCredits;
            }
            else if(transcriptList[i].gradeReceived=='B'){
              semesterTotalGPA += 3*parseInt(transcriptList[i].course.numberOfCredits);
              semesterCredits += transcriptList[i].course.numberOfCredits;
            }
            else if(transcriptList[i].gradeReceived=='C'){
              semesterTotalGPA += 2*parseInt(transcriptList[i].course.numberOfCredits);
              semesterCredits += transcriptList[i].course.numberOfCredits;
            }
            else if(transcriptList[i].gradeReceived=='D'){
              semesterTotalGPA += 1*parseInt(transcriptList[i].course.numberOfCredits);
              semesterCredits += transcriptList[i].course.numberOfCredits;
            }
            else if(transcriptList[i].gradeReceived=='F'){
              semesterTotalGPA += 0*parseInt(transcriptList[i].course.numberOfCredits);
              semesterCredits += transcriptList[i].course.numberOfCredits;
            }
          }
        }
      }
    }
    console.log(semesterTotalGPA)
    console.log(semesterCredits)
    return (semesterTotalGPA/semesterCredits).toString().substring(0,4);
  }

  render () {
    const {transcriptSectionList, major, isMajor} = this.props;
    let transcript = undefined;
    let semesterTotalGPA = 0;
    let semesterCredits = 0;
    return (
      transcriptSectionList==undefined || major==undefined?(
        <p></p>
      ):(
        <React.Fragment>
          {isMajor==true?(
            major.id == 5?(
              <h4 className="col-md-12 text-center">{major.name}</h4>
            ):(
              <h4 className="col-md-12 text-center">{major.type} in {major.name}</h4>
            )
          ):(
            <h4 className="col-md-12 text-center">Minor in {major.name}</h4>
          )}
          <table className="table table-striped"> 
            <thead style={{backgroundColor:"#696969", color:"white"}}>
              <tr> 
                <td>Status</td>
                <td>Course ID</td>
                <td>Name</td>
                <td>Grade</td>
                <td>GPA</td>
                <td>Credits</td>
                <td>Term</td>
              </tr>
            </thead>
            <tbody>
            {major.requirement.map(requirement=>(
              this.compareCourses(transcriptSectionList,requirement)
            ))}
            </tbody>
          </table>
          <div className="col-md-12">
          {isMajor==true?(
            <p className="text-right">Major GPA: {this.getGPA(transcriptSectionList,major.requirement)}</p>
          ):(
            <p className="text-right">Minor GPA: {this.getGPA(transcriptSectionList,major.requirement)}</p>
          )}    
          </div>
          <br />
        </React.Fragment>
      )
    )}
}
export default DegreeAuditTable;