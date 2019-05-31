import React, { PureComponent } from 'react';

class TranscriptTable extends PureComponent {
  render () {
    const {transcriptSectionList} = this.props;
    let semesterTotalGPA = 0;
    let semesterCredits = 0
    let overallTotalGPA = 0;
    let overallCredits = 0
    return (
      transcriptSectionList==undefined?(
        <p></p>
      ):(
        <div>
          {Object.keys(transcriptSectionList).map(year=>(
            Object.keys(transcriptSectionList[year]).map(season=>(
              <React.Fragment>
                <h3 className="col-md-12 text-center">{season} {year}</h3>
                <table className="table table-striped"> 
                  <thead style={{backgroundColor:"#696969", color:"white"}}>
                    <tr> 
                      <td>Course ID</td>
                      <td>Course</td>
                      <td>Grade</td>
                      <td>GPA</td>
                      <td>Credits</td>
                    </tr>
                  </thead>
                  <tbody>
                    {transcriptSectionList[year][season].map(el=>(
                      <tr>
                        <td>{el.course.id}</td>
                        <td>{el.course.name}</td>
                        <td>{el.gradeReceived}</td>
                        {el.gradeReceived==undefined?(
                          <td></td>
                        ):(
                          <React.Fragment>
                            {el.gradeReceived=='A'?(<td><span hidden>{semesterTotalGPA += (4*parseInt(el.course.numberOfCredits))}{semesterCredits+=parseInt(el.course.numberOfCredits)}</span><p>4</p></td>):(null)}
                            {el.gradeReceived=='B'?(<td><span hidden>{semesterTotalGPA += (3*parseInt(el.course.numberOfCredits))}{semesterCredits+=parseInt(el.course.numberOfCredits)}</span><p>3</p></td>):(null)}
                            {el.gradeReceived=='C'?(<td><span hidden>{semesterTotalGPA += (2*parseInt(el.course.numberOfCredits))}{semesterCredits+=parseInt(el.course.numberOfCredits)}</span><p>2</p></td>):(null)}
                            {el.gradeReceived=='D'?(<td><span hidden>{semesterTotalGPA += (1*parseInt(el.course.numberOfCredits))}{semesterCredits+=parseInt(el.course.numberOfCredits)}</span><p>1</p></td>):(null)}
                            {el.gradeReceived=='F'?(<td><span hidden>{semesterTotalGPA += (0*parseInt(el.course.numberOfCredits))}{semesterCredits+=parseInt(el.course.numberOfCredits)}</span><p>0</p></td>):(null)}
                          </React.Fragment>
                        )}
                        <td>{el.course.numberOfCredits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="col-md-12">
                  <p className="text-right">Semester GPA: {(semesterTotalGPA/parseInt(semesterCredits)).toString().substring(0,4)}</p>
                  <span hidden>{overallTotalGPA+=semesterTotalGPA}{overallCredits+=semesterCredits}</span>
                  <span hidden>{semesterTotalGPA=0}{semesterCredits=0}</span>
                </div>
                <br />
              </React.Fragment>
            ))
          ))}
          <div className="col-md-12">
            <p className="text-right"><strong>Overall GPA: </strong>{(overallTotalGPA/parseInt(overallCredits)).toString().substring(0,4)}</p>
          </div>
        </div>
      )
    )}
}
export default TranscriptTable;