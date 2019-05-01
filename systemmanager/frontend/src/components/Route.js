import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';


import Unauthenticated from './guest/Unauthenticated.js';

import GuestMain from './guest/Home.js';
import GuestLogin from './guest/Login.js';
import GuestSearchMasterSchedule from './guest/SearchMasterSchedule.js';
import GuestViewCourseCatalog from './guest/ViewCourseCatalog.js';


import StudentMain from './student/Main.js';

import AdminMain from './admin/Main.js';
import AdminCourseCatalog from './admin/CourseCatalog.js';
import AdminViewStudentRecord from './admin/ViewStudentRecord.js';
import AdminStudentHold from './admin/StudentHold.js';
import AdminStudentTerm from './admin/StudentTerm.js';
import AdminStudentEnrollSection from './admin/Student_Enroll_Section.js';
import AdminLockUnlockUserAccount from './admin/LockUnlockUserAccount.js';
import AdminMasterSchedule from './admin/MasterSchedule.js';
import AdminUpdateSectionMasterP1 from './admin/Update_Section_Slots.js';
import AdminUpdateSectionMasterP2 from './admin/Update_Section_Faculty.js';
import AdminProfile from './admin/MyProfile.js';
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
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={GuestMain} />
          <Route path="/master-schedule" component={GuestSearchMasterSchedule} />
          <Route path="/course-catalog" component={GuestViewCourseCatalog} />

          <Route path="/login" component={GuestLogin} />

          <Route path="/student/main" component={StudentMain} />
          
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

        </div>
      </BrowserRouter>
    );
  }
}

export default MyRoute;
