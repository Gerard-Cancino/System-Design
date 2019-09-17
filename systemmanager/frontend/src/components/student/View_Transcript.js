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
  componentDidMount(){
    this.getTranscript()
  }
  getTranscript(){
    let map = new Object();
    axios
    .get(`/term-list.json`)
    .then(termList=>{
      axios
      .get(`/transcript-list.json/${this.props.user}`)
      .then(res=>{
        termList.data.data.map(term=>{
          let transcriptTerm = res.data.data.filter(transcript=>
            transcript.year.toString()===term.year&&transcript.season.toString()===term.season
          )
          map[term.id] = transcriptTerm;
        })
        this.setState({transcriptList:map})
      })
      .catch(err=>{
        this.setState({result: err,transcriptList:undefined});
      }) 
    })

  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4">
              <h2 className="col-md-12 text-center">View Student's Transcript</h2>
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
