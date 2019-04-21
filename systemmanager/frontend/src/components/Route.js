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
import AdminUpdateSectionMaster from './admin/UpdateSectionMaster.js';
// npm run dev to create main.js

const Authorization = (WrappedComponent, allowedRoles) => {
  return class WithAuthorization extends React.Component {
    state = {
      props: '',
      user: {
        id: 1,
        role: 'A',
      }  
    }
    render(){

      const { role, id} = this.state.user
      if (allowedRoles.includes(role)) {
        if (this.props.location.state!=null){  
          return <WrappedComponent data={this.props.location}/>
        }
        else
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
    const AAdminUpdateSectionMaster = Authorization(AdminUpdateSectionMaster, ['A'])
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
          <Route path="/admin/student-hold" component={AAdminStudentHold} />
          <Route path="/admin/lock-unlock-user-account" component={AAdminLockUnlockUserAccount} />
          <Route path="/admin/view-master-schedule" component={AAdminViewMasterSchedule} />
          <Route path="/admin/update-section-master" component={AAdminUpdateSectionMaster}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default MyRoute;
