import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

// View Course Catalog -> Add (Button) -> Fill out Required 
// -> (optional inputs) -> submit -> return json of for course id to master
class UpdateCourseMajor extends Component {
  state = {
    courseID: undefined,
    origMajorList: undefined,
    majorList: undefined,
    majorID: undefined,
    origMinorList: undefined,
    minorList: undefined,
    minorID: undefined,
    courseMajorMinorList: undefined
  }
  componentDidMount(){
    this.setState({'courseID': this.props.data.state.courseID})
    let majorList = [];
    let minorList = [];
    axios
    .get('/major-list.json')
    .then(res=>{
      this.setState({origMajorList: res.data.data});
      axios
      .get('/minor-list.json')
      .then(res=>{
        this.getRequirementList()
        this.setState({origMinorList: res.data.data})
      })
    })
  }
  getRequirementList = () => {
    let majorList = [];
    axios
    .get(`/major-list.json`,{
      params:{
        courseID:this.props.data.state.courseID
      }
    })
    .then(res=>{
      majorList = res.data.data
      let newMajorList = this.state.origMajorList.filter(el=>majorList.filter(el2=>el.id==el2.id).length!==1);
      if (newMajorList.length!=0)
        this.setState({majorList:newMajorList,majorID:newMajorList[0].id});
      else
        this.setState({majorList:undefined, majorID:undefined})
      axios
      .get(`/minor-list.json`,{
        params:{
          courseID:this.props.data.state.courseID
        }
      })
      .then(res=>{
        this.setState({courseMajorMinorList:[...res.data.data,...majorList]})
        let newMinorList = this.state.origMinorList.filter(el=>res.data.data.filter(el2=>el.id==el2.id).length!==1);
        if (newMinorList.length!=0)
          this.setState({minorList:newMinorList,minorID:newMinorList[0].id});
        else
          this.setState({minorList:undefined, minorID:undefined})
      })
    })
  }
  removeRequirement = (majorMinor, isMajor) => (event) => {
    event.preventDefault()
    if (isMajor){
      axios
      .put(`/major-details.json/${majorMinor}`, {
        'courseID': this.state.courseID,
        'isAdding': 'false'
      })
      .then(res => {
        this.getRequirementList()
      })
      .catch(err => {
        this.setState({result:err})
      })
    }
    else {
      axios
      .put(`/minor-details.json/${majorMinor}`, {
        'courseID': this.state.courseID,
        'isAdding': 'false'
      })
      .then(res=>{
        this.getRequirementList()
      })
      .catch(err => {
        this.setState({result:err})
      })
    }
  }
  addMajorRequirement = (event) =>{
    event.preventDefault()
    axios
    .put(`/major-details.json/${this.state.majorID}`, {
      'courseID': this.state.courseID,
      'isAdding': 'true'
    })
    .then(res => {
      this.getRequirementList()
    })
    .catch(err => {
      this.setState({result:err})
    })
  }
  addMinorRequirement = (event) => {
    event.preventDefault()
    axios
    .put(`/minor-details.json/${this.state.minorID}`, {
      'courseID': this.state.courseID,
      'isAdding': 'true'
    })
    .then(res=>{
      this.getRequirementList()
    })
    .catch(err => {
      this.setState({result:err})
    })
  }
  handleMajorID = (event) => {
    console.log(event.target.value)
    this.setState({majorID:event.target.value})
  }  
  handleMinorID = (event) => {
    console.log(event.target.value)
    this.setState({minorID:event.target.value})
  }
  render(){
    const Table = () => {
      return(
        <div className="col-md-12">
          <h3 className="col-md-12 text-center">Major or Minors Currently Registered For</h3>
          <table className="table">
            <thead style={{backgroundColor:"#696969", color:"white"}}>
              <tr>
                <td><strong>Major/Minor</strong></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.state.courseMajorMinorList.map(el=>(
                <Row majorMinor={el} />
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    const Row = (majorMinor) => {
      return(
        <tr>
          {majorMinor.majorMinor.type==undefined?(
            <td>Minor in {majorMinor.majorMinor.name}</td>
          ):(
            <td>{majorMinor.majorMinor.id===5?(null):(`${majorMinor.majorMinor.type} in `)}{majorMinor.majorMinor.name}</td>
          )}
          {majorMinor.majorMinor.type==undefined?(
            <td>
              <input className="col-md-12 btn btn-danger" onClick={this.removeRequirement(majorMinor.majorMinor.id, false)} value="Remove"/>
            </td>
          ):(
            <td>
              <input className="col-md-12 btn btn-danger" onClick={this.removeRequirement(majorMinor.majorMinor.id, true)} value="Remove"/>
            </td>
          )}
        </tr>
      )
    }
    const SelectMajor = () => {
      return(
        <form className="form-inline" onSubmit={this.addMajorRequirement}>
          <label>Major: </label>
          <select className="form-control col-md-7 mx-2" value={this.state.majorID} onChange={this.handleMajorID}>
            {this.state.majorList.map(el=>(
              <option key={el.id} value={el.id}>{el.id===5?(null):(`${el.type} in `)}{el.name}</option>
            ))}
          </select>
          <button className="btn btn-primary col-md-3" type="submit">Add</button>
        </form>
      );
    }
    const SelectMinor = () => {
      return(
        <form className="form-inline" onSubmit={this.addMinorRequirement}>
          <label>Minor: </label>
          <select className="form-control col-md-7 mx-2" value={this.state.minorID} onChange={this.handleMinorID}>
            {this.state.minorList.map(el=>(
              <option key={el.id} value={el.id}>Minor in {el.name}</option>
            ))}
          </select>
          <button className="btn btn-primary col-md-3" type="submit">Add</button>
        </form>
      );
    }
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8 border rounded m-4 p-4 h-100">
              <div className="col-md-12">
                <Link to={{
                  pathname: '/admin/view-course-list'
                }} className="offset-md-8 col-md-4 btn btn-success">Back to Course List</Link>
              </div>
              <br />
              <div className="col-md-12">
                <h3 className="text-center">Add/Remove Course to Major/Minor</h3>
                {this.state.majorID ==undefined || this.state.majorList==undefined?(
                  <p></p>
                ):(
                  <SelectMajor />
                )}
                <br />
                {this.state.minorID ==undefined || this.state.minorList==undefined?(
                  <p></p>
                ):(
                  <SelectMinor />
                )}
                <br />
                {this.state.courseMajorMinorList==undefined?(
                  <p></p>
                ):(
                  this.state.courseMajorMinorList.length==0?(
                    <p></p>
                  ):(
                    <Table />
                  )
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}



export default UpdateCourseMajor;
