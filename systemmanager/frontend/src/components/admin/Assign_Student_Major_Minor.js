import React, { Component, PureComponent } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

const findGeneral = (isStudent,majorList) => {
  if(isStudent==true){
    for (let i = 0; i<majorList.length; i++) {
      if (majorList[i].major.id == 5)
        majorList.splice(i,1);
    }
    return majorList
  }
  else{
    for (let i = 0; i<majorList.length; i++) {
      if (majorList[i].id == 5)
        majorList.splice(i,1);
    }
    return majorList
  }
}

class FindStudent extends PureComponent {
  componentWillReceiveProps(){
    this.forceUpdate
  }
  render(){
    const {handleChange} = this.props
    return(
      <div className="form-group col-md-12">
        <label>Student:</label>
        <input name="studentUsername" className="form-control" onChange={handleChange} placeholder="student username" required/>
      </div>
    )
  }
}

class MajorMinorDetail extends PureComponent {
  render(){
    const {majorMinor} = this.props;
    return(
      majorMinor==undefined?(
        <p>Can be assigned another major/minor</p>
      ):(
        majorMinor.minor==undefined?(
          <div className="col-md-8">
            <p>{majorMinor.major.name}</p>
          </div>
        ):(
          <div className="col-md-8">
            <p>Minor in {majorMinor.minor.name}</p>
          </div>
        )
      )
    )
  }
}

class AssignStudentMajorMinor extends Component {
  state = {
    studentUsername: undefined,
    student: undefined,
    majorList: undefined,
    minorList: undefined,
    allMajorList: undefined,
    allMinorList: undefined,
    majorMinorChange1: undefined,
    majorMinorChange2: undefined,
    majorMinorChange3: undefined
  }
  componentDidMount(){
    axios
    .get('/major-list.json')
    .then(res=>{
      this.setState({allMajorList:findGeneral(false,res.data.data)})
      this.setState({majorMinorChange1:res.data.data[0].id})
      this.setState({majorMinorChange2:res.data.data[0].id})
    })
    axios
    .get('/minor-list.json')
    .then(res=>{
      this.setState({allMinorList:res.data.data})
      this.setState({majorMinorChange3:res.data.data[0].id})
    })
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value || undefined;
    let inputState = {};
    inputState[name]=value;
    this.setState(inputState)
  }
  handleFindStudent = e => {
    e.preventDefault()
    axios
    .get(`/student-details.json/${this.state.studentUsername}`)
    .then(res=>{
      this.setState({student:res.data.data})
      this.getMajorMinor(res.data.data.user.email)
    })
    .catch(err=>{
      this.getMajorMinor(this.state.student.user.email)
      this.setState({result:err})
    })
  }
  getMajorMinor = (studentUsername) => {
    axios
    .get(`/student-major-list.json`,{
      params: {
        email:studentUsername
      }
    })
    .then(res=>{
      this.setState({majorList:findGeneral(true,res.data.data)})
    })
    .catch(err=>{
      this.setState({result:err})
    })
    axios
    .get(`/student-minor-list.json`,{
      params: {
        email:studentUsername
      }
    })
    .then(res=>{
      this.setState({minorList:res.data.data})
    })
    .catch(err=>{
      this.getMajorMinor(this.state.student.user.email)
      this.setState({result:err})
    })
  }
  handleRemoveMajorMinor = (e,majorMinor, isMajor) => {
    e.preventDefault()
    if(isMajor){
      axios
      .delete(`/student-major-details.json/${this.state.student.user.email}/${majorMinor}`)
      .then(res=>{
        this.setState({result:res})
        this.getMajorMinor(this.state.student.user.email)
      })
      .catch(err=>{
        this.getMajorMinor(this.state.student.user.email)
        this.setState({result:err})
      })
    }
    else{
      axios
      .delete(`/student-minor-details.json/${this.state.student.user.email}/${majorMinor}`)
      .then(res=>{
        this.setState({result:res})
        this.getMajorMinor(this.state.student.user.email)
      })
      .catch(err=>{
        this.getMajorMinor(this.state.student.user.email)
        this.setState({result:err})
      })
    }
  }
  handleChangeMajorMinor = (e,num) => {
    e.preventDefault()
    let major = undefined;
    let minor = undefined;
    if (num==0) {
      major = this.state.majorMinorChange1
    }
    else if (num==1) {
      major = this.state.majorMinorChange2
    }
    else if (num==2) {
      minor = this.state.majorMinorChange3
    }
    if (major!=undefined){
      axios
      .post(`/student-major-list.json`,{
        email:this.state.student.user.email,
        major:major
      })
      .then(res=>{
        this.setState({result:res})
        this.getMajorMinor(this.state.student.user.email)
      })
      .catch(err=>{
        this.setState({result:err})
      })
    }
    else if (minor!=undefined){
      axios
      .post(`/student-minor-list.json`,{
        email:this.state.student.user.email,
        minor: minor
      })
      .then(res=>{
        this.setState({result:res})
        this.getMajorMinor(this.state.student.user.email)
      })
      .catch(err=>{
        this.setState({result:err})
      })
    }
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row justify-content-center">
            <div className="col-md-10 border m-4 p-4">
            
            {this.state.student==undefined?(
              <form className="col-md-12" onSubmit={this.handleFindStudent}>
                <h2 className="col-md-12 text-center">Find Student</h2>
                <FindStudent handleChange={this.handleChange.bind(this)}/>
                <button className="col-md-12 btn btn-primary" type="submit">Find Student</button>
              </form>
            ):(
              this.state.majorList==undefined || this.state.allMajorList==undefined || this.state.minorList==undefined || this.state.allMinorList == undefined?(
                <p></p>
              ):(
                <div>
                  <h2 className="col-md-12 text-center">{this.state.student.user.firstName} {this.state.student.user.lastName}</h2>
                  <h4>Major 1:</h4>
                  <div className="col-md-12">
                    {this.state.majorList[0]==undefined?(
                      <div className="col-md-12">
                        <p>Another Major can be assigned to the student.</p>                 
                        <form onSubmit={(e)=>this.handleChangeMajorMinor(e,0)}>
                          <label className="col-md-3">Update Major to:</label>
                          <select className="col-md-6" name="majorMinorChange1" onChange={this.handleChange}>
                            {this.state.allMajorList.map(el=>(
                              <option value={el.id}>{el.name}</option>
                            ))}
                          </select>
                          <button type="submit" className="col-md-3 btn btn-primary">Submit</button>
                        </form>
                      </div>
                    ):(
                      <div className="row">
                        <MajorMinorDetail majorMinor={this.state.majorList[0]} />
                        <div className="col-md-4">
                          <form onSubmit={(e)=>this.handleRemoveMajorMinor(e,this.state.majorList[0].major.id,true)}>
                            <button className="col-md-10 btn btn-danger" >Remove</button>
                          </form>
                        </div>
                      </div>  
                    )}
                  </div>
                  <hr />
                  <h4>Major 2:</h4>
                  <div className="col-md-12">
                    {this.state.majorList[1]==undefined?(
                      <div className="col-md-12">
                        <p>Another Major can be assigned to the student.</p>                 
                        <form onSubmit={(e)=>this.handleChangeMajorMinor(e,1)}>
                          <label className="col-md-3">Update Major to:</label>
                          <select className="col-md-6" name="majorMinorChange2" onChange={this.handleChange}>
                            {this.state.allMajorList.map(el=>(
                              <option value={el.id}>{el.name}</option>
                            ))}
                          </select>
                          <button type="submit" className="col-md-3 btn btn-primary">Submit</button>
                        </form>
                      </div>
                    ):(
                      <div className="row">
                        <MajorMinorDetail majorMinor={this.state.majorList[1]} />
                        <div className="col-md-4">
                          <form onSubmit={(e)=>this.handleRemoveMajorMinor(e,this.state.majorList[1].major.id,true)}>
                            <button className="col-md-10 btn btn-danger" >Remove</button>
                          </form>
                        </div>
                      </div>  
                    )}
                  </div>
                  <hr />
                  <h4>Minor:</h4>
                  <div className="col-md-12">
                    {this.state.minorList[0]==undefined?(
                      <div className="col-md-12">
                        <p>A minor can be assigned to the student.</p>                 
                        <form onSubmit={(e)=>this.handleChangeMajorMinor(e,2)}>
                          <label className="col-md-3">Update Minor to:</label>
                          <select className="col-md-6" name="majorMinorChange3" onChange={this.handleChange}>
                            {this.state.allMinorList.map(el=>(
                              <option value={el.id}>{el.name}</option>
                            ))}
                          </select>
                          <button type="submit" className="col-md-3 btn btn-primary">Submit</button>
                        </form>
                      </div>
                    ):(
                      <div className="row">
                        <MajorMinorDetail majorMinor={this.state.minorList[0]} />
                        <div className="col-md-4">
                          <form onSubmit={(e)=>this.handleRemoveMajorMinor(e,this.state.minorList[0].minor.id,false)}>
                            <button className="col-md-10 btn btn-danger" >Remove</button>
                          </form>
                        </div>
                      </div>  
                    )}
                  </div>
                </div>
              )
            )}
            </div>
          </div>
        </section>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default AssignStudentMajorMinor;
