import React, { Component } from 'react';
import {BrowserRouter, Route,Redirect} from 'react-router-dom';
import axios from 'axios';


import Unauthenticated from './guest/Unauthenticated.js';

import GuestMain from './guest/Home.js';
import GuestLogin from './guest/Login.js';
import GuestSearchMasterSchedule from './guest/SearchMasterSchedule.js';
import GuestViewCourseCatalog from './guest/ViewCourseCatalog.js';


import StudentMain from './student/Main.js';

import AdminAddPrereq from './admin/Add_Prereq.js';
import AdminCreateAccount from './admin/Create_Account.js';
import AdminCreateCourse from './admin/Create_Course.js';
import AdminCreateSection from './admin/Create_Section.js';
import AdminMain from './admin/Main.js';

import AdminRegisterStudentEnroll from './admin/Register_Student-Enroll';
import AdminUpdateCourse from './admin/Update_Course';
import AdminUpdateSectionInfo from './admin/Update_Section-Info';
import AdminUpdateSectionSlot from './admin/Update_Section-Slots.js';
import AdminUpdateStudentGrade from './admin/Update_Student_Grade.js';
import AdminViewAddStudentHold from './admin/View_Add_Student-Hold';
import AdminViewCourseList from './admin/View_Course-List.js';
import AdminViewEditProfile from './admin/View_Edit_Profile.js';
import AdminViewSectionList from './admin/View_Section-List.js';
import AdminViewStudentDegreeAudit from './admin/View_Student_Degree-Audit.js';
import AdminViewStudentGrades from './admin/StudentGrade.js';
import AdminViewAdviseeDetails from './admin/Advisees.js';
import AdminViewStudentInfo from './admin/View_Student_Info.js';
import AdminViewStudentTerm from './admin/View_Student_Term.js';
import AdminViewAdviseeList from './admin/View_Advisees_List.js';
// npm run dev to create main.js

const Authorization = (user,handleUser, WrappedComponent, allowedRoles) => {
  return class WithAuthorization extends React.Component {
    state = {
      props: '',
      user: {
        email: undefined,
        role: 'G',
      }
    }
    componentDidMount(){
      this.setState({user:user})
    }
    getUser () {
      axios
      .get('/token-user',{ 
        params: {
          token: localStorage.getItem('token')
        }
      })
      .then(res=>{
        handleUser(res.data.email,res.data.type)
      })
      .catch(res=>{
        handleUser(undefined,'G')
      })
    }
    handleGetToken = () => {
      console.log('getting token')
      this.getUser()
    }
    render(){
      if (localStorage.getItem('token')!=undefined && user.email==undefined){
        this.getUser()
      }
      if (localStorage.getItem('token')==undefined && user.email!=undefined){
        handleUser(undefined,undefined)
        window.location.replace("/login")
        return undefined;
        
      }
      if (allowedRoles.includes(user.role)) {
        return <WrappedComponent handleGetToken={this.handleGetToken.bind(this)} user={user.email} data={this.props.location}/>
      }
      else{
        if (user.role=="A"){
          console.log('is admin')
          window.location.replace("/admin/main")
          return undefined;
        }
        else if (user.role=='F'){
          <Redirect to="/faculty/main" />
        }
        else if (user.role=='S'){
          <Redirect to="/student/main" />
          return <StudentMain handleGetToken={this.handleGetToken.bind(this)} user={this.state.user.email} data={this.props.location}/>
        }
        else if (user.role=='R'){
          <Redirect to="/researcher/main"/>
          return undefined;
        }
      }
      return <GuestMain />
    }
  }
}

class MyRoute extends Component {
  state = {
    props: '',
    user: {
      email: undefined,
      role: 'G',
    }
  }
  handleUser = (email,role) =>{
    this.setState({user:{email:email,role:role}})
  }
  render() {
    const GGuestMain = Authorization(this.state.user,this.handleUser,GuestMain,['G'])
    const GGuestLogin = Authorization(this.state.user,this.handleUser,GuestLogin,['G'])

    const AAdminAddPrereq = Authorization(this.state.user,this.handleUser,AdminAddPrereq,['A']);
    const AAdminCreateAccount = Authorization(this.state.user,this.handleUser,AdminCreateAccount,['A']);
    const AAdminCreateCourse = Authorization(this.state.user,this.handleUser,AdminCreateCourse,['A']);
    const AAdminCreateSection = Authorization(this.state.user,this.handleUser,AdminCreateSection, ['A'])
    const AAdminMain = Authorization(this.state.user,this.handleUser,AdminMain,['A']);
    const AAdminRegisterStudentEnroll = Authorization(this.state.user,this.handleUser,AdminRegisterStudentEnroll,['A']);
    const AAdminUpdateCourse = Authorization(this.state.user,this.handleUser,AdminUpdateCourse,['A']);
    const AAdminUpdateSectionInfo = Authorization(this.state.user,this.handleUser,AdminUpdateSectionInfo,['A']);
    const AAdminUpdateSectionSlot = Authorization(this.state.user,this.handleUser,AdminUpdateSectionSlot,['A']);
    const AAdminUpdateStudentGrade = Authorization(this.state.user,this.handleUser,AdminUpdateStudentGrade, ['A']);
    const AAdminViewAddStudentHold = Authorization(this.state.user,this.handleUser,AdminViewAddStudentHold,['A']);
    const AAdminViewCourseList = Authorization(this.state.user,this.handleUser,AdminViewCourseList,['A']);
    const AAdminViewEditProfile = Authorization(this.state.user,this.handleUser,AdminViewEditProfile,['A']);
    const AAdminViewSectionList = Authorization(this.state.user,this.handleUser,AdminViewSectionList,['A']);
    const AAdminViewStudentDegreeAudit = Authorization(this.state.user,this.handleUser,AdminViewStudentDegreeAudit,['A']);
    const AAdminViewStudentGrades = Authorization(this.state.user,this.handleUser,AdminViewStudentGrades,['A']);
    const AAdminViewStudentInfo = Authorization(this.state.user,this.handleUser,AdminViewStudentInfo,['A']);
    const AAdminViewStudentTerm = Authorization(this.state.user,this.handleUser,AdminViewStudentTerm,['A']);
    const AAdminViewAdviseeDetails = Authorization(this.state.user,this.handleUser,AdminViewAdviseeDetails,['A']);
    const AAdminViewAdviseeList= Authorization(this.state.user,this.handleUser,AdminViewAdviseeList, ['A']);

    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={GGuestMain} />
          <Route path="/master-schedule" component={GuestSearchMasterSchedule} />
          <Route path="/course-catalog" component={GuestViewCourseCatalog} />

          <Route path="/login" component={GGuestLogin} />

          <Route path="/student/main" component={StudentMain} />

          <Route path="/admin/add-prerequisite" component={AAdminAddPrereq} />
          <Route path="/admin/create-account" component={AAdminCreateAccount} />
          <Route path="/admin/create-course" component={AAdminCreateCourse} />
          <Route path="/admin/create-section" component={AAdminCreateSection} />
          <Route path="/admin/main" component={AAdminMain} />
          <Route path="/admin/register-student-enroll" component={AAdminRegisterStudentEnroll} />
          <Route path="/admin/update-course" component={AAdminUpdateCourse} />
          <Route path="/admin/update-section-info" component={AAdminUpdateSectionInfo} />
          <Route path="/admin/update-section-slot" component={AAdminUpdateSectionSlot} />
          <Route path="/admin/update-student-grade" component={AAdminUpdateStudentGrade} />
          <Route path="/admin/view-add-student-hold" component={AAdminViewAddStudentHold} />
          <Route path="/admin/view-course-list" component={AAdminViewCourseList} />
          <Route path="/admin/view-edit-profile" component={AAdminViewEditProfile} />
          <Route path="/admin/view-section-list" component={AAdminViewSectionList} />
          <Route path="/admin/view-student-degree-audit" component={AAdminViewStudentDegreeAudit} />
          <Route path="/admin/view-student-grades" component={AAdminViewStudentGrades}/>
          <Route path="/admin/view-student-info" component={AAdminViewStudentInfo} />
          <Route path="/admin/view-student-term" component={AAdminViewStudentTerm} />
          <Route path="/admin/view-advisee-details" component={AAdminViewAdviseeDetails} />
          <Route path="/admin/view-advisee-list" component={AAdminViewAdviseeList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default MyRoute;
