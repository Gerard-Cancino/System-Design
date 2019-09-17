import React, { Component } from 'react';
import axios from 'axios';

class TranscriptTable extends Component {
  state={
    termList: undefined
  }
  componentDidMount(){
    axios
    .get('/term-list.json')
    .then(res=>{
      this.setState({termList:res.data.data})
    })
  }
  getOverallGPA(oldTranscriptList){
    let transcriptList = new Array;
    Object.keys(oldTranscriptList).map(key=>{
      Object.keys(oldTranscriptList[key]).map(key2=>{
        transcriptList.push(oldTranscriptList[key][key2])
      })
    })
    let semesterTotalGPA = 0;
    let semesterCredits = 0;
    let transcriptHash = new Object;
    for(let i = 0;i<transcriptList.length;i++){
      if(transcriptList[i].gradeReceived!=undefined){
        if(transcriptHash[transcriptList[i].course.id.toString()]===undefined || transcriptHash[transcriptList[i].course.id.toString()].grade>transcriptList[i].gradeReceived){
          transcriptHash[transcriptList[i].course.id] = {grade: transcriptList[i].gradeReceived,credits:transcriptList[i].course.numberOfCredits};
        }
      }
    }
    Object.keys(transcriptHash).map(key=>{
      if(transcriptHash[key].grade=='A'){
        semesterTotalGPA += 4*parseInt(transcriptHash[key].credits);
        semesterCredits += transcriptHash[key].credits;
      }
      else if(transcriptHash[key].grade=='B'){
        semesterTotalGPA += 3*parseInt(transcriptHash[key].credits);
        semesterCredits += transcriptHash[key].credits;
      }
      else if(transcriptHash[key].grade=='C'){
        semesterTotalGPA += 2*parseInt(transcriptHash[key].credits);
        semesterCredits += transcriptHash[key].credits;
      }
      else if(transcriptHash[key].grade=='D'){
        semesterTotalGPA += 1*parseInt(transcriptHash[key].credits);
        semesterCredits += transcriptHash[key].credits;
      }
      else if(transcriptHash[key].grade=='F'){
        semesterTotalGPA += 0*parseInt(transcriptHash[key].credits);
        semesterCredits += transcriptHash[key].credits;
      }
    })
    return(semesterTotalGPA/semesterCredits).toString().substring(0,4)
  }
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
          {Object.keys(transcriptSectionList).map(term=>(
            transcriptSectionList[term].length!=0&&
              <React.Fragment>
                {this.state.termList==undefined?(
                  null
                ):(
                  <h3 className="col-md-12 text-center">{this.state.termList.find(el=>el.id==term).season} {this.state.termList.find(el=>el.id==term).year}</h3>
                )
                }
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
                    {transcriptSectionList[term].map(el=>(
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
                  <p className="text-right">Semester GPA: {(semesterTotalGPA==undefined?('TBA'):(semesterTotalGPA/parseInt(semesterCredits)).toString().substring(0,4))}</p>
                  <span hidden>{overallTotalGPA+=semesterTotalGPA}{overallCredits+=semesterCredits}</span>
                  <span hidden>{semesterTotalGPA=0}{semesterCredits=0}</span>
                </div>
                <br />
              </React.Fragment>
            ))
          }
 
          <div className="col-md-12">
            <p className="text-right"><strong>Overall GPA: </strong>{(this.getOverallGPA(transcriptSectionList))}</p>
          </div>
        </div>
      )
    )}
}
export default TranscriptTable;