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
<<<<<<< HEAD
import AdminCourseCatalog from './admin/CourseCatalog.js';
import AdminViewStudentRecord from './admin/ViewStudentRecord.js';
import AdminStudentHold from './admin/StudentHold.js';
import AdminStudentTerm from './admin/StudentTerm.js';
import AdminStudentEnrollSection from './admin/Student_Enroll_Section.js';
import AdminLockUnlockUserAccount from './admin/LockUnlockUserAccount.js';
import AdminMasterSchedule from './admin/MasterSchedule.js';
import AdminUpdateSectionMasterP1 from './admin/UpdateSectionMasterP1.js';
import AdminUpdateSectionMasterP2 from './admin/UpdateSectionMasterP2.js';
import AdminProfile from './admin/MyProfile.js';
import AdminViewStudentGrades from './admin/StudentGrade.js';
=======
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
import AdminViewStudentGrade from './admin/View_Student_Grade.js';
import AdminViewStudentInfo from './admin/View_Student_Info.js';
import AdminViewStudentTerm from './admin/View_Student_Term.js';
>>>>>>> 748c56383e8eefa030d56005c681b1b80b520207
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
<<<<<<< HEAD
    const AAdminMain = Authorization(AdminMain, ['A'])
    const AAdminCourseCatalog = Authorization(AdminCourseCatalog, ['A'])
    const AAdminViewStudentRecord = Authorization(AdminViewStudentRecord, ['A'])
    const AAdminStudentHold = Authorization(AdminStudentHold, ['A'])
    const AAdminStudentTerm = Authorization(AdminStudentTerm, ['A'])
    const AAdminStudentEnrollSection = Authorization(AdminStudentEnrollSection, ['A'])
    const AAdminLockUnlockUserAccount = Authorization(AdminLockUnlockUserAccount, ['A'])
    const AAdminMasterSchedule = Authorization(AdminMasterSchedule, ['A'])
    const AAdminUpdateSectionMasterP1 = Authorization(AdminUpdateSectionMasterP1, ['A'])
    const AAdminUpdateSectionMasterP2 = Authorization(AdminUpdateSectionMasterP2, ['A'])
    const AAdminProfile = Authorization(AdminProfile, ['A'])
    const AAdminViewStudentGrades = Authorization(AdminViewStudentGrades, ['A'])
=======
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
    const AAdminViewStudentGrade = Authorization(AdminViewStudentGrade,['A']);
    const AAdminViewStudentInfo = Authorization(AdminViewStudentInfo,['A']);
    const AAdminViewStudentTerm = Authorization(AdminViewStudentTerm,['A']);
>>>>>>> 748c56383e8eefa030d56005c681b1b80b520207
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={GuestMain} />
          <Route path="/master-schedule" component={GuestSearchMasterSchedule} />
          <Route path="/course-catalog" component={GuestViewCourseCatalog} />

          <Route path="/login" component={GuestLogin} />

          <Route path="/student/main" component={StudentMain} />

<<<<<<< HEAD
          <Route path="/admin/main" component={AAdminMain} />
          <Route path="/admin/course-catalog" component={AAdminCourseCatalog} />
          <Route path="/admin/view-student-information" component={AAdminViewStudentRecord} />
          <Route path="/admin/student-hold" component={AAdminStudentHold} />
          <Route path="/admin/student-term" component={AAdminStudentTerm} />
          <Route path="/admin/student-enroll-section" component={AAdminStudentEnrollSection} />
          <Route path="/admin/lock-unlock-user-account" component={AAdminLockUnlockUserAccount} />
          <Route path="/admin/view-master-schedule" component={AAdminMasterSchedule} />
          <Route path="/admin/update-section-master-p1" component={AAdminUpdateSectionMasterP1}/>
          <Route path="/admin/update-section-master-p2" component={AAdminUpdateSectionMasterP2}/>
          <Route path="/admin/profile" component={AAdminProfile}/>
          <Route path="/admin/view-student-grades" compononent={AdminViewStudentGrades}/>
=======
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
          <Route path="/admin/view-edit-student-grade" component={AAdminViewStudentGrade} />
          <Route path="/admin/view-student-info" component={AAdminViewStudentInfo} />
          <Route path="/admin/view-student-term" component={AAdminViewStudentTerm} />
>>>>>>> 748c56383e8eefa030d56005c681b1b80b520207

        </div>
      </BrowserRouter>
    );
  }
}

export default MyRoute;
