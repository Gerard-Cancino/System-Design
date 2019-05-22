import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class MasterSchedule extends Component {
  state = {
    transcriptList: undefined,
    status: undefined
  }
  getTranscript(){
    axios
    .get(`/transcript-list.json/${this.props.user}`)
    .then(res=>{
      this.setState({transcriptList: res.data})
    })
    .catch(err=>{
      this.setState({status: err});
    })
  }
  componentDidMount(){
    this.getTranscript()
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value || undefined;
    this.setState(prevState => {
      const newState = {...prevState};
      newState[name] = value;
      return newState;
    })
  }
  render(){
    let currentSeason = undefined;
    let currentYear = undefined;
    const changeSeason = (el) =>{
      if (currentSeason==undefined || el.season!=currentSeason){
        currentSeason = el.season;
        return <tr className="table-info"><td colspan="4"><h5 className="col-md-12 text-center">{el.season} {el.year}</h5></td></tr>
      }
    }
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4">
              <h2 className="col-md-12 text-center">View Student's Transcript</h2>
              {this.state.transcriptList==undefined?(
                <p></p>
              ):(
                this.state.transcriptList.length == 0?(
                  <p>No Transcript inputted</p>
                ):(
                  <div className="col-md-12">
                    <h4 className="col-md-12 text-center ">{this.state.transcriptList[0].student.user.firstName} {this.state.transcriptList[0].student.user.lastName}</h4>
                    <table className="table table-striped">
                      <thead style={{backgroundColor:"#696969", color:"white"}}>
                        <tr>
                          <td >Course ID</td>
                          <td >Course Name</td>
                          <td >Grade</td>
                          <td >Season - Year</td>
                        </tr>
                      </thead>
                      <tbody >
                        {this.state.transcriptList.map(el => (
                          <React.Fragment>
                            {changeSeason(el)}
                            <tr>
                              <td>{el.course.id}</td>
                              <td>{el.course.name}</td>
                              <td>{el.gradeReceived}</td>
                              <td>{el.season} {el.year}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </div>
          </div> 
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default MasterSchedule;
