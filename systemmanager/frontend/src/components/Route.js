import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';


import Unauthenticated from './guest/Unauthenticated.js';

import GuestMain from './guest/Home.js';
import GuestLogin from './guest/Login.js';
import GuestSearchMasterSchedule from './guest/SearchMasterSchedule.js';
import GuestViewCourseCatalog from './guest/ViewCourseCatalog.js';


import StudentMain from './student/Main.js';

import AdminMain from './admin/Main.js';
import AdminViewStudentRecord from './admin/ViewStudentRecord.js';
import AdminStudentHold from './admin/StudentHold.js';
import AdminLockUnlockUserAccount from './admin/LockUnlockUserAccount.js';
import AdminViewMasterSchedule from './admin/SearchMasterSchedule.js';
import AdminUpdateSectionMasterForm from './admin/UpdateSectionMasterForm.js';
// npm run dev to create main.js

const Authorization = (WrappedComponent, allowedRoles) => {
  return class WithAuthorization extends React.Component {
    state = {
      user: {
        id: 1,
        role: 'A',
      }  
    }
    render(){
      const { role, id} = this.state.user
      if (allowedRoles.includes(role)) {
        return <WrappedComponent/>
      }
      else 
        return <Unauthenticated />
    }
  }
}

class MyRoute extends Component {
  render() {

    const AAdminMain = Authorization(AdminMain, ['A'])
    const AAdminViewStudentRecord = Authorization(AdminViewStudentRecord, ['A'])
    const AAdminStudentHold = Authorization(AdminStudentHold, ['A'])
    const AAdminLockUnlockUserAccount = Authorization(AdminLockUnlockUserAccount, ['A'])
    const AAdminViewMasterSchedule = Authorization(AdminViewMasterSchedule, ['A'])
    const AAdminUpdateSectionMasterForm = Authorization(AdminUpdateSectionMasterForm, ['A'])
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={GuestMain} />
          <Route path="/master-schedule" component={GuestSearchMasterSchedule} />
          <Route path="/course-catalog" component={GuestViewCourseCatalog} />

          <Route path="/login" component={GuestLogin} />

          <Route path="/student/main" component={StudentMain} />
          
          <Route path="/admin/main" component={AAdminMain} />
          <Route path="/admin/view-student-information" component={AAdminViewStudentRecord} />
          <Route path="/admin/add-student-hold" component={AAdminStudentHold} />
          <Route path="/admin/lock-unlock-user-account" component={AAdminLockUnlockUserAccount} />
          <Route path="/admin/view-master-schedule" component={AAdminViewMasterSchedule} />
          <Route path="/admin/update-section-master-form" component={AAdminUpdateSectionMasterForm} />

        </div>
      </BrowserRouter>
    );
  }
}

export default MyRoute;
