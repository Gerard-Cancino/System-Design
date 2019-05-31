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
// import AdminUpdateStudentGrade from './admin/Update_Student-Grade.js';
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
import AdminViewGradeList from './admin/View_Grade_List.js';
import AdminViewStudentTranscript from './admin/View_Student_Transcript.js';
import AdminViewCourseDetails from './admin/View_Course_Details.js';
import AdminUpdateStudentGrade from './admin/Update_Student_Grade.js';
// npm run dev to create main.js
import FacultyMain from './faculty/Main.js';
import FacultyUpdateSectionSlots from './faculty/Update_Section-Slots.js';
import FacultyUpdateStudentGrade from './faculty/Update_Student_Grade.js';
import FacultyViewAddStudentHold from './faculty/View_Add_Student-Hold.js';
import FacultyViewAdviseeList from './faculty/View_Advisees_List.js';
import FacultyViewCourseList from './faculty/View_Course-List.js';
import FacultyViewEditProfile from './faculty/View_Edit_Profile.js';
import FacultyViewGradeList from './faculty/View_Grade_List.js';
import FacultyViewSectionList from './faculty/View_Section-List.js';
import FacultyViewStudentDegreeAudit from './faculty/View_Student_Degree-Audit.js';
import FacultyViewStudentInfo from './faculty/View_Student_Info.js';
import FacultyViewStudentTerm from './faculty/View_Student_Term.js';

import StudentSearchStudentAdvisor from './student/SearchStudentAdvisor.js';
import StudentSectionTable from './student/Section_Table.js';
import StudentViewAddStudentHold from './student/View_Add_Student-Hold.js';
import StudentViewCourseList from './student/View_Course-List.js';
import StudentViewEditProfile from './student/View_Edit_Profile.js';
import StudentViewGradeList from './student/View_Grade_List.js';
import StudentViewSectionList from './student/View_Section-List.js';
import StudentViewStudentDegreeAudit from './student/View_Student_Degree-Audit.js';
import StudentViewStudentInfo from './student/View_Student_Info.js';
import StudentViewStudentTerm from './student/View_Student_Term.js';



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
        handleUser(res.data.data.email,res.data.data.type)
      })
      .catch(res=>{
        handleUser(undefined,'G')
      })
    }
    handleGetToken = () => {
      this.getUser()
    }
    render(){
      if (localStorage.getItem('token')!=undefined && user.email==undefined){
        this.getUser()
      }
      if (localStorage.getItem('token')==undefined && user.email!=undefined){
        handleUser(undefined,'G')
        window.location.replace("/login")
        return undefined;

      }
      if (allowedRoles.includes(user.role)) {
        return <WrappedComponent handleGetToken={this.handleGetToken.bind(this)} user={user.email} data={this.props.location}/>
      }
      else{
        if (user.role=="A"){
          window.location.replace("/admin/main")
          return undefined;
        }
        else if (user.role=='F'){
          window.location.replace("/faculty/main")
          return undefined;
        }
        else if (user.role=='S'){
          window.location.replace("/student/main")
          return undefined;
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
    // const AAdminUpdateStudentGrade = Authorization(this.state.user,this.handleUser,AdminUpdateStudentGrade, ['A']);
    const AAdminViewAddStudentHold = Authorization(this.state.user,this.handleUser,AdminViewAddStudentHold,['A']);
    const AAdminViewCourseList = Authorization(this.state.user,this.handleUser,AdminViewCourseList,['A']);
    const AAdminViewEditProfile = Authorization(this.state.user,this.handleUser,AdminViewEditProfile,['A']);
    const AAdminViewSectionList = Authorization(this.state.user,this.handleUser,AdminViewSectionList,['A']);
    const AAdminViewStudentDegreeAudit = Authorization(this.state.user,this.handleUser,AdminViewStudentDegreeAudit,['A']);
    const AAdminViewStudentGrades = Authorization(this.state.user,this.handleUser,AdminViewStudentGrades,['A']);
    const AAdminViewStudentInfo = Authorization(this.state.user,this.handleUser,AdminViewStudentInfo,['A']);
    const AAdminViewStudentTerm = Authorization(this.state.user,this.handleUser,AdminViewStudentTerm,['A']);
    const AAdminViewAdviseeDetails = Authorization(this.state.user,this.handleUser,AdminViewAdviseeDetails,['A']);
    const AAdminViewAdviseeList = Authorization(this.state.user,this.handleUser,AdminViewAdviseeList, ['A']);
    const AAdminViewGradeList = Authorization(this.state.user,this.handleUser,AdminViewGradeList, ['A']);
    const AAdminViewStudentTranscript = Authorization(this.state.user,this.handleUser,AdminViewStudentTranscript,['A']);
    const AAdminViewCourseDetails = Authorization(this.state.user,this.handleUser,AdminViewCourseDetails,['A']);
    const AAdminUpdateStudentGrade = Authorization(this.state.user,this.handleUser,AdminUpdateStudentGrade,['A']);

    const FFacultyMain = Authorization(this.state.user,this.handleUser,FacultyMain,['F']);
    const FFacultyUpdateSectionSlots = Authorization(this.state.user,this.handleUser,FacultyUpdateSectionSlots, ['F']);
    const FFacultyUpdateStudentGrade = Authorization(this.state.user,this.handleUser,FacultyUpdateStudentGrade,['F']);
    const FFacultyViewAddStudentHold = Authorization(this.state.user,this.handleUser,FacultyViewAddStudentHold,['F']);
    const FFacultyViewAdviseeList = Authorization(this.state.user,this.handleUser,FacultyViewAdviseeList,['F']);
    const FFacultyViewCourseList = Authorization(this.state.user,this.handleUser,FacultyViewCourseList,['F']);
    const FFacultyViewEditProfile = Authorization(this.state.user,this.handleUser,FacultyViewEditProfile, ['F']);
    const FFacultyViewGradeList = Authorization(this.state.user,this.handleUser,FacultyViewGradeList,['F']);
    const FFacultyViewSectionList = Authorization(this.state.user,this.handleUser,FacultyViewSectionList,['F']);
    const FFacultyViewStudentDegreeAudit = Authorization(this.state.user,this.handleUser,FacultyViewStudentDegreeAudit,['F']);
    const FFacultyViewStudentInfo = Authorization(this.state.user,this.handleUser,FacultyViewStudentInfo,['F']);
    const FFacultyViewStudentTerm = Authorization(this.state.user,this.handleUser,FacultyViewStudentTerm,['F']);

    const SStudentMain = Authorization(this.state.user,this.handleUser,StudentMain,['S']);
    const SStudentSearchStudentAdvisor = Authorization(this.state.user,this.handleUser,StudentSearchStudentAdvisor,['S']);
    const SStudentViewAddStudentHold = Authorization(this.state.user,this.handleUser,StudentViewAddStudentHold, ['S']);
    const SStudentViewCourseList = Authorization(this.state.user,this.handleUser,StudentViewCourseList,['S']);
    const SStudentViewEditProfile = Authorization(this.state.user,this.handleUser,StudentViewEditProfile,['S']);
    const SStudentViewGradeList = Authorization(this.state.user,this.handleUser,StudentViewGradeList,['S']);
    const SStudentViewSectionList = Authorization(this.state.user,this.handleUser,StudentViewSectionList,['S']);
    const SStudentViewStudentDegreeAudit = Authorization(this.state.user,this.handleUser,StudentViewStudentDegreeAudit, ['S']);
    const SStudentViewStudentInfo = Authorization(this.state.user,this.handleUser,StudentViewStudentInfo,['S']);
    const SStudentViewStudentTerm = Authorization(this.state.user,this.handleUser,StudentViewStudentTerm,['S']);

    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={GGuestMain} />
          <Route path="/master-schedule" component={GuestSearchMasterSchedule} />
          <Route path="/course-catalog" component={GuestViewCourseCatalog} />

          <Route path="/login" component={GGuestLogin} />

          <Route path="/admin/add-prerequisite" component={AAdminAddPrereq} />
          <Route path="/admin/create-account" component={AAdminCreateAccount} />
          <Route path="/admin/create-course" component={AAdminCreateCourse} />
          <Route path="/admin/create-section" component={AAdminCreateSection} />
          <Route path="/admin/main" component={AAdminMain} />
          <Route path="/admin/register-student-enroll" component={AAdminRegisterStudentEnroll} />
          <Route path="/admin/update-course" component={AAdminUpdateCourse} />
          <Route path="/admin/update-section-info" component={AAdminUpdateSectionInfo} />
          <Route path="/admin/update-section-slot" component={AAdminUpdateSectionSlot} />
          {/* <Route path="/admin/update-student-grade" component={AAdminUpdateStudentGrade} /> */}
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
          <Route path="/admin/view-grade-list" component={AAdminViewGradeList} />
          {/*Add the bottom two links to the other users*/}
          <Route path="/admin/view-student-transcript" component={AAdminViewStudentTranscript} />
          <Route path="/admin/view-course-details" component={AAdminViewCourseDetails} />
          <Route path="/admin/update-student-grade" component={AAdminUpdateStudentGrade} />


          <Route path="/faculty/main" component={FFacultyMain} />
          <Route path="/faculty/update-section-slots" component={FFacultyUpdateSectionSlots} />
          <Route path="/faculty/update-student-grade" component={FFacultyUpdateStudentGrade} />
          <Route path="/faculty/view-add-student-hold" component={FFacultyViewAddStudentHold} />
          <Route path="/faculty/view-advisee-list" component={FFacultyViewAdviseeList} />
          <Route path="/faculty/view-course-list" component={FFacultyViewCourseList} />
          <Route path="/faculty/view-edit-profile" component={FFacultyViewEditProfile} />
          <Route path="/faculty/view-grade-list" component={FFacultyViewGradeList} />
          <Route path="/faculty/view-section-list" component={FFacultyViewSectionList} />
          <Route path="/faculty/view-student-degree-audit" component={FFacultyViewStudentDegreeAudit} />
          <Route path="/faculty/view-student-info" component={FFacultyViewStudentInfo} />
          <Route path="/faculty/view-student-term" component={FFacultyViewStudentTerm} />

          <Route path="/student/main" component={SStudentMain} />
          <Route path="/student/view-add-student-hold" component={SStudentViewAddStudentHold} />
          <Route path="/student/search-student-advisor" component={SStudentSearchStudentAdvisor} />
          <Route path="/student/view-course-list" component={SStudentViewCourseList} />
          <Route path="/student/view-edit-profile" component={SStudentViewEditProfile} />
          <Route path="/student/view-grade-list" component={SStudentViewGradeList} />
          <Route path="/student/view-section-list" component={SStudentViewSectionList} />
          <Route path="/student/view-student-degree-audit" component={SStudentViewStudentDegreeAudit} />
          <Route path="/student/view-student-info" component={SStudentViewStudentInfo} />
          <Route path="/student/view-student-term" component={SStudentViewStudentTerm} />


        </div>
      </BrowserRouter>
    );
  }
}

export default MyRoute;
