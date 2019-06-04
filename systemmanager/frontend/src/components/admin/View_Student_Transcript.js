import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import TranscriptTable from '../general/tables/Transcript_Table.js';

class StudentTranscript extends Component {
  state = {
    email: undefined,
    transcriptList: undefined,
    result: undefined
  }
  getTranscript(){
    let map = new Object();
    axios
    .get(`/transcript-list.json/${this.state.email}`)
    .then(res=>{
      for (let el of res.data.data){
        if (map[el.year] == undefined){
          map[el.year] = new Object();
        }
        if (map[el.year][el.season] == undefined){
          map[el.year][el.season] = new Array();
        }
        if (map[el.year][el.season][0] == undefined){
          map[el.year][el.season][0]=el
        }
        else{
          let length = map[el.year][el.season].length
          map[el.year][el.season][length]=el
        }
      }
      this.setState({transcriptList:map,result:res})
    })
    .catch(err=>{
      this.setState({result: err,transcriptList:undefined});
    }) 
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
  handleSubmit = (e) =>{
    e.preventDefault();
    this.getTranscript();
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
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4">
              <h2 className="col-md-12 text-center">View Student's Transcript</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Student</label>
                  <input className="form-control" onChange={this.handleChange} name="email" placeholder="username"/>
                </div>
                <button type="submit" className="col-md-12 btn btn-primary">Get Transcript</button>
              </form>
              <br />
              {this.state.transcriptList==undefined?(
                <p></p>
              ):(
                this.state.transcriptList.length == 0?(
                  <p>No Transcript received. Has the student registered for or have taken courses?</p>
                ):(
                  <TranscriptTable transcriptSectionList={this.state.transcriptList}/>
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

export default StudentTranscript;
