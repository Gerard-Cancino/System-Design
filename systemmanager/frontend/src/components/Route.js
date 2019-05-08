import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';


import Unauthenticated from './guest/Unauthenticated.js';

import GuestMain from './guest/Home.js';
import GuestLogin from './guest/Login.js';
import GuestSearchMasterSchedule from './guest/SearchMasterSchedule.js';
import GuestViewCourseCatalog from './guest/ViewCourseCatalog.js';


import StudentMain from './student/Main.js';

import AdminAddPrereq from './admin/Add_Prereq.js';
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
import AdminViewRemoveStudentEnrollSection from './admin/View_Remove_Student-Enroll-Section.js';
import AdminViewSectionList from './admin/View_Section-List.js';
import AdminViewStudentDegreeAudit from './admin/View_Student_Degree-Audit.js';
import AdminViewStudentGrades from './admin/StudentGrade.js';
import AdminViewStudentInfo from './admin/View_Student_Info.js';
import AdminViewStudentTerm from './admin/View_Student_Term.js';
// npm run dev to create main.js

const Authorization = (WrappedComponent, allowedRoles) => {
  return class WithAuthorization extends React.Component {
    state = {
      props: '',
      user: {
        email: 'MooreM',
        role: 'A',
      }
    }
    render(){

      const { role, id} = this.state.user
      if (allowedRoles.includes(role)) {
        if (this.props.location.state!=null){
          return <WrappedComponent user={this.state.user.email} data={this.props.location}/>
        }
        else
          return <WrappedComponent user={this.state.user.email} />
      }
      else
        return <Unauthenticated />
    }
  }
}

class MyRoute extends Component {
  render() {

    const AAdminAddPrereq = Authorization(AdminAddPrereq,['A']);
    const AAdminCreateCourse = Authorization(AdminCreateCourse,['A']);
    const AAdminCreateSection = Authorization(AdminCreateSection, ['A'])
    const AAdminMain = Authorization(AdminMain,['A']);
    const AAdminRegisterStudentEnroll = Authorization(AdminRegisterStudentEnroll,['A']);
    const AAdminUpdateCourse = Authorization(AdminUpdateCourse,['A']);
    const AAdminUpdateSectionInfo = Authorization(AdminUpdateSectionInfo,['A']);
    const AAdminUpdateSectionSlot = Authorization(AdminUpdateSectionSlot,['A']);
    const AAdminUpdateStudentGrade = Authorization(AdminUpdateStudentGrade, ['A']);
    const AAdminViewAddStudentHold = Authorization(AdminViewAddStudentHold,['A']);
    const AAdminViewCourseList = Authorization(AdminViewCourseList,['A']);
    const AAdminViewEditProfile = Authorization(AdminViewEditProfile,['A']);
    const AAdminViewRemoveStudentEnrollSection = Authorization(AdminViewRemoveStudentEnrollSection, ['A']);
    const AAdminViewSectionList = Authorization(AdminViewSectionList,['A']);
    const AAdminViewStudentDegreeAudit = Authorization(AdminViewStudentDegreeAudit,['A']);
    const AAdminViewStudentGrades = Authorization(AdminViewStudentGrades,['A']);
    const AAdminViewStudentInfo = Authorization(AdminViewStudentInfo,['A']);
    const AAdminViewStudentTerm = Authorization(AdminViewStudentTerm,['A']);

    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={GuestMain} />
          <Route path="/master-schedule" component={GuestSearchMasterSchedule} />
          <Route path="/course-catalog" component={GuestViewCourseCatalog} />

          <Route path="/login" component={GuestLogin} />

          <Route path="/student/main" component={StudentMain} />

          <Route path="/admin/add-prerequisite" component={AAdminAddPrereq} />
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
          <Route path="/admin/view-remove-student-enroll-section" component={AAdminViewRemoveStudentEnrollSection} />
          <Route path="/admin/view-section-list" component={AAdminViewSectionList} />
          <Route path="/admin/view-student-degree-audit" component={AAdminViewStudentDegreeAudit} />
          <Route path="/admin/view-student-grade" compononent={AAdminViewStudentGrades}/>
          <Route path="/admin/view-student-info" component={AAdminViewStudentInfo} />
          <Route path="/admin/view-student-term" component={AAdminViewStudentTerm} />

        </div>
      </BrowserRouter>
    );
  }
}

export default MyRoute;
