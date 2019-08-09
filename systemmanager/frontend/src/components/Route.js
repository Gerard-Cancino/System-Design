import React, { Component } from 'react';
import {BrowserRouter, Route,Redirect,Switch} from 'react-router-dom';
import axios from 'axios';


import Unauthenticated from './guest/Unauthenticated.js';

import GuestMain from './guest/Home.js';
import GuestLogin from './guest/Login.js';
import GuestSearchMasterSchedule from './guest/SearchMasterSchedule.js';
import GuestViewCourseCatalog from './guest/ViewCourseCatalog.js';
import GuestViewFacultyRoom from './guest/View_Faculty_Room.js';
import Guest404 from './guest/404.js'

import AdminMain from './admin/Main.js';
import AdminAddPrereq from './admin/Add_Prereq.js';
import AdminCreateAccount from './admin/Create_Account.js';
import AdminCreateCourse from './admin/Create_Course.js';
import AdminCreateSection from './admin/Create_Section.js';
import AdminRegisterStudentEnroll from './admin/Register_Student-Enroll';
import AdminUpdateCourse from './admin/Update_Course';
import AdminUpdateCourseMajor from './admin/Update_Course_Major.js';
import AdminUpdateSectionInfo from './admin/Update_Section-Info';
import AdminUpdateSectionSlot from './admin/Update_Section-Slots.js';
import AdminViewAddStudentHold from './admin/View_Add_Student-Hold';
import AdminViewCourseList from './admin/View_Course-List.js';
import AdminViewEditProfile from './admin/View_Edit_Profile.js';
import AdminViewSectionList from './admin/View_Section-List.js';
import AdminViewStudentDegreeAudit from './admin/View_Student_Degree-Audit.js';
import AdminViewStudentInfo from './admin/View_Student_Info.js';
import AdminViewStudentTerm from './admin/View_Student_Term.js';
import AdminViewStudentTranscript from './admin/View_Student_Transcript.js';
import AdminViewCourseDetails from './admin/View_Course_Details.js';
import AdminUpdateStudentGrade from './admin/Update_Student_Grade.js';
import AdminAssignStudentMajorMinor from './admin/Assign_Student_Major_Minor.js';
import AdminViewCatalog from './admin/ViewCourseCatalog.js';
import AdminViewSectionDetails from './admin/View_Section_Details';

// npm run dev to create main.js
import FacultyMain from './faculty/Main.js';
import FacultyViewSectionList from './faculty/View_Section-List.js';
import FacultyViewSectionDetails from './faculty/View_Section_Details.js';
import FacultyViewTerm from './faculty/View_Term.js';
import FacultyViewEditProfile from './faculty/View_Edit_Profile.js';
import FacultyViewEnrollmentList from './faculty/View_Enrollment_List.js';
import FacultyViewStudentAttendance from './faculty/View_Student_Attendance.js';
import FacultyAssignStudentAttendance from './faculty/Assign_Student_Attendance.js';
import FacultyViewStudentInfo from './faculty/View_Student_Info.js';
import FacultyAssignStudentGrade from './faculty/Assign_Student_Grade.js';
import FacultyViewAdviseeList from './faculty/View_Advisee_List.js';
import FacultyUpdateStudentGrade from './faculty/Update_Student_Grade.js';

import StudentMain from './student/Main.js';
import StudentViewSectionList from './student/View_Section_List.js';
import StudentViewTerm from './student/View_Term.js';
import StudentRegisterEnroll from './student/Register_Enroll.js';
import StudentViewHoldList from './student/View_Hold_List.js'
import StudentViewEditProfile from './student/View_Edit_Profile.js';
import StudentViewTranscript from './student/View_Transcript.js';
import StudentViewDegreeAudit from './student/View_Degree_Audit.js';
import StudentViewSectionDetails from './student/View_Section_Details.js';
import StudentViewInfo from './student/View_Info.js';
import StudentViewCourseDetails from './student/View_Course_Details';

import ResearcherMain from './researcher/Main.js';



const Authorization = (user,handleUser, WrappedComponent, allowedRoles) => {
  return class WithAuthorization extends React.Component {
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
        localStorage.removeItem('token')
        handleUser(undefined,'G')
      })
    }
    handleGetToken = () => {
      this.getUser()
    }
    render(){
      if (localStorage.getItem('token')==undefined && user.email!=undefined){
        handleUser(undefined,'G')
        window.location.replace("/login")
        return null;

      }
      if (localStorage.getItem('token')!=undefined && user.email==undefined){
        this.getUser()
      }
      else if (allowedRoles.includes(user.role)) {
        return <WrappedComponent handleGetToken={this.handleGetToken.bind(this)} user={user.email} data={this.props.location} history={this.props.history}/>
      }
      else{
        if (user.role=='A'){
          window.location.replace("/admin/main")
          return null;
        }
        else if (user.role=='F'){
          window.location.replace("/faculty/main")
          return null;
        }
        else if (user.role=='S'){
          window.location.replace("/student/main")
          return null;
        }
        else if (user.role=='R'){
          window.location.replace("/researcher/main")
          return null;
        }
        else if (user.role=='G'){
          window.location.replace("/404")
          return null;
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
    const GGuestMain = Authorization(this.state.user,this.handleUser.bind(this),GuestMain,['G'])
    const GGuestLogin = Authorization(this.state.user,this.handleUser.bind(this),GuestLogin,['G'])
    const GGuest404 = Authorization(this.state.user,this.handleUser.bind(this),Guest404,['G'])

    const AAdminAddPrereq = Authorization(this.state.user,this.handleUser.bind(this),AdminAddPrereq,['A']);
    const AAdminCreateAccount = Authorization(this.state.user,this.handleUser.bind(this),AdminCreateAccount,['A']);
    const AAdminCreateCourse = Authorization(this.state.user,this.handleUser.bind(this),AdminCreateCourse,['A']);
    const AAdminCreateSection = Authorization(this.state.user,this.handleUser.bind(this),AdminCreateSection, ['A'])
    const AAdminMain = Authorization(this.state.user,this.handleUser.bind(this),AdminMain,['A']);
    const AAdminRegisterStudentEnroll = Authorization(this.state.user,this.handleUser.bind(this),AdminRegisterStudentEnroll,['A']);
    const AAdminUpdateCourse = Authorization(this.state.user,this.handleUser.bind(this),AdminUpdateCourse,['A']);
    const AAdminUpdateCourseMajor = Authorization(this.state.user,this.handleUser.bind(this),AdminUpdateCourseMajor,['A']);
    const AAdminUpdateSectionInfo = Authorization(this.state.user,this.handleUser.bind(this),AdminUpdateSectionInfo,['A']);
    const AAdminUpdateSectionSlot = Authorization(this.state.user,this.handleUser.bind(this),AdminUpdateSectionSlot,['A']);
    const AAdminViewAddStudentHold = Authorization(this.state.user,this.handleUser.bind(this),AdminViewAddStudentHold,['A']);
    const AAdminViewCourseList = Authorization(this.state.user,this.handleUser.bind(this),AdminViewCourseList,['A']);
    const AAdminViewEditProfile = Authorization(this.state.user,this.handleUser.bind(this),AdminViewEditProfile,['A']);
    const AAdminViewSectionList = Authorization(this.state.user,this.handleUser.bind(this),AdminViewSectionList,['A']);
    const AAdminViewStudentDegreeAudit = Authorization(this.state.user,this.handleUser.bind(this),AdminViewStudentDegreeAudit,['A']);
    const AAdminViewStudentInfo = Authorization(this.state.user,this.handleUser.bind(this),AdminViewStudentInfo,['A']);
    const AAdminViewStudentTerm = Authorization(this.state.user,this.handleUser.bind(this),AdminViewStudentTerm,['A']);
    const AAdminViewStudentTranscript = Authorization(this.state.user,this.handleUser.bind(this),AdminViewStudentTranscript,['A']);
    const AAdminViewCourseDetails = Authorization(this.state.user,this.handleUser.bind(this),AdminViewCourseDetails,['A']);
    const AAdminUpdateStudentGrade = Authorization(this.state.user,this.handleUser.bind(this),AdminUpdateStudentGrade,['A']);
    const AAdminAssignStudentMajorMinor = Authorization(this.state.user,this.handleUser.bind(this),AdminAssignStudentMajorMinor,['A']);
    const AAdminViewCatalog = Authorization(this.state.user,this.handleUser.bind(this),AdminViewCatalog,['A']);
    const AAdminViewSectionDetails = Authorization(this.state.user,this.handleUser.bind(this),AdminViewSectionDetails,['A']);

    const FFacultyMain = Authorization(this.state.user,this.handleUser.bind(this), FacultyMain, ['F']);
    const FFacultyViewSectionList = Authorization(this.state.user,this.handleUser.bind(this),FacultyViewSectionList,['F']);
    const FFacultyViewSectionDetails = Authorization(this.state.user,this.handleUser.bind(this),FacultyViewSectionDetails,['F']);
    const FFacultyViewTerm = Authorization(this.state.user, this.handleUser.bind(this), FacultyViewTerm, ['F']);
    const FFacultyViewEditProfile = Authorization(this.state.user, this.handleUser.bind(this),FacultyViewEditProfile,['F']);
    const FFacultyViewEnrollmentList = Authorization(this.state.user,this.handleUser.bind(this),FacultyViewEnrollmentList,['F']);
    const FFacultyViewStudentAttendance = Authorization(this.state.user,this.handleUser.bind(this),FacultyViewStudentAttendance,['F']);
    const FFacultyAssignStudentAttendance = Authorization(this.state.user,this.handleUser.bind(this),FacultyAssignStudentAttendance,['F']);
    const FFacultyViewStudentInfo = Authorization(this.state.user,this.handleUser.bind(this), FacultyViewStudentInfo,['F']);
    const FFacultyAssignStudentGrade  = Authorization(this.state.user,this.handleUser.bind(this),FacultyAssignStudentGrade,['F']);
    const FFacultyViewAdviseeList = Authorization(this.state.user,this.handleUser.bind(this),FacultyViewAdviseeList,['F']);
    const FFacultyUpdateStudentGrade = Authorization(this.state.user,this.handleUser.bind(this),FacultyUpdateStudentGrade,['F']);

    const SStudentMain = Authorization(this.state.user,this.handleUser.bind(this),StudentMain,['S']);
    const SStudentViewSectionList = Authorization(this.state.user,this.handleUser.bind(this),StudentViewSectionList,['S']);
    const SStudentViewTerm = Authorization(this.state.user,this.handleUser.bind(this),StudentViewTerm,['S']);
    const SStudentRegisterEnroll = Authorization(this.state.user,this.handleUser.bind(this),StudentRegisterEnroll,['S']);
    const SStudentViewHoldList = Authorization(this.state.user,this.handleUser.bind(this),StudentViewHoldList,['S']);
    const SStudentViewEditProfile = Authorization(this.state.user,this.handleUser.bind(this),StudentViewEditProfile,['S']);
    const SStudentViewTranscript = Authorization(this.state.user,this.handleUser.bind(this),StudentViewTranscript,['S']);
    const SStudentViewDegreeAudit = Authorization(this.state.user,this.handleUser.bind(this),StudentViewDegreeAudit,['S']);
    const SStudentViewSectionDetails = Authorization(this.state.user,this.handleUser.bind(this),StudentViewSectionDetails,['S']);
    const SStudentViewInfo = Authorization(this.state.user,this.handleUser.bind(this),StudentViewInfo,['S']);
    const SStudentViewCourseDetails = Authorization(this.state.user,this.handleUser.bind(this),StudentViewCourseDetails,['S']);

    const RResearcherMain = Authorization(this.state.user,this.handleUser.bind(this), ResearcherMain,['R']);

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={GGuestMain} />
          <Route path="/master-schedule" component={GuestSearchMasterSchedule} />
          <Route path="/course-catalog" component={GuestViewCourseCatalog} />
          <Route path="/view-faculty-room" component={GuestViewFacultyRoom} />
          <Route path="/404" component={Guest404} />

          <Route path="/login" component={GGuestLogin} />

          <Route path="/admin/main" component={AAdminMain} />
          <Route path="/admin/add-prerequisite" component={AAdminAddPrereq} />
          <Route path="/admin/create-account" component={AAdminCreateAccount} />
          <Route path="/admin/create-course" component={AAdminCreateCourse} />
          <Route path="/admin/create-section" component={AAdminCreateSection} />
          <Route path="/admin/register-student-enroll" component={AAdminRegisterStudentEnroll} />
          <Route path="/admin/update-course" component={AAdminUpdateCourse} />
          <Route path="/admin/update-course-major" component={AAdminUpdateCourseMajor} />
          <Route path="/admin/update-section-info" component={AAdminUpdateSectionInfo} />
          <Route path="/admin/update-section-slot" component={AAdminUpdateSectionSlot} />
          <Route path="/admin/view-add-student-hold" component={AAdminViewAddStudentHold} />
          <Route path="/admin/view-course-list" component={AAdminViewCourseList} />
          <Route path="/admin/view-edit-profile" component={AAdminViewEditProfile} />
          <Route path="/admin/view-section-list" component={AAdminViewSectionList} />
          <Route path="/admin/view-student-degree-audit" component={AAdminViewStudentDegreeAudit} />
          <Route path="/admin/view-student-info" component={AAdminViewStudentInfo} />
          <Route path="/admin/view-student-term" component={AAdminViewStudentTerm} />
          <Route path="/admin/view-student-transcript" component={AAdminViewStudentTranscript} />
          <Route path="/admin/view-course-details" component={AAdminViewCourseDetails} />
          <Route path="/admin/update-student-grade" component={AAdminUpdateStudentGrade} />
          <Route path="/admin/assign-student-major-minor" component={AAdminAssignStudentMajorMinor} />
          <Route path="/admin/view-catalog" component={AAdminViewCatalog} />
          <Route path="/admin/view-section-details" component={AAdminViewSectionDetails} />


          <Route path="/faculty/main" component={FFacultyMain} />
          <Route path="/faculty/view-section-list" component={FFacultyViewSectionList} />
          <Route path="/faculty/view-section-details" component={FFacultyViewSectionDetails} />
          <Route path="/faculty/view-term" component={FFacultyViewTerm} />
          <Route path="/faculty/view-edit-profile" component={FFacultyViewEditProfile} />
          <Route path="/faculty/view-enrollment-list" component={FFacultyViewEnrollmentList} />
          <Route path="/faculty/view-student-attendance" component={FFacultyViewStudentAttendance} />
          <Route path="/faculty/assign-student-attendance" component={FFacultyAssignStudentAttendance} />
          <Route path="/faculty/view-student-info" component={FFacultyViewStudentInfo} />
          <Route path="/faculty/assign-student-grade" component={FFacultyAssignStudentGrade} />
          <Route path="/faculty/view-advisee-list" component={FFacultyViewAdviseeList} />
          <Route path="/faculty/update-student-grade" component={FFacultyUpdateStudentGrade} />

          <Route path="/student/main" component={SStudentMain} />
          <Route path="/student/view-section-list" component={SStudentViewSectionList} />
          <Route path="/student/view-term" component={SStudentViewTerm} />
          <Route path="/student/register-enroll" component={SStudentRegisterEnroll} />
          <Route path="/student/view-hold-list" component={SStudentViewHoldList} />
          <Route path="/student/view-edit-profile" component={SStudentViewEditProfile} />
          <Route path="/student/view-transcript" component={SStudentViewTranscript} />
          <Route path="/student/view-degree-audit" component={SStudentViewDegreeAudit} />
          <Route path="/student/view-section-details" component={SStudentViewSectionDetails} />
          <Route path="/student/view-info" component={SStudentViewInfo} />
          <Route path="/student/view-course-details" component={SStudentViewCourseDetails} />

          <Route path="/researcher/main" component={RResearcherMain} />

          <Route component={GGuest404} />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default MyRoute;
