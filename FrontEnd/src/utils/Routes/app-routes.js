import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../pages/auth/login";
import CreateUsers from "../../pages/admin/accounts/CreateUsers";
import CreateBulkUsers from "../../pages/admin/accounts/CreatebulkUsers";
import AllUsers from "../../pages/admin/accounts/AllUsers";
import UpdateUser from "../../pages/admin/accounts/UpdateUser";
import Dashboard from "../../pages/student/dashboard/Dashboard";
import AllResume from "../../pages/student/resume/AllResume";
import NewResume from "../../pages/student/resume/NewResume";
import Generate from "../../pages/student/resume/Generate";
import LoginAdmin from "../../pages/auth/loginAdmin";
import DashboardAdmin from "../../pages/admin/dashboard/DashboardAdmin";
import AddOpportunities from "../../pages/admin/opportunities/AddOpportunities";
import AllOppotunities from "../../pages/admin/opportunities/AllOppotunities";
import CreateStream from "../../pages/admin/streams/CreateStream";
import AllStreams from "../../pages/admin/streams/AllStreams";
import UpdateStream from "../../pages/admin/streams/UpdateStream";
import Opportunity from "../../pages/admin/opportunities/Opportunity";
import NotFound from "../../pages/404/NotFound";
import Profile from "../../pages/student/Profile/Profile";
import EligibleOpportunities from "../../pages/student/opportunities/EligibleOpportunities";
import UpdateOpportunities from "../../pages/admin/opportunities/UpdateOpportunities";
import UpdateProcess from "../../pages/admin/opportunities/UpdateProcess";
import Applicants from "../../pages/admin/opportunities/Applicants";
import GetApplicants from "../../pages/admin/opportunities/GetApplicants";
import SelectionProcessSelected from "../../pages/admin/opportunities/SelectionProcessSelected";
import Applications from "../../pages/student/applications/Applications";
import StudentViewOpportunity from "../../pages/student/opportunities/ViewOpportunity";
import StudentViewApplicants from "../../pages/student/opportunities/GetApplicants";
import StudentViewSelectionProcessSelected from "../../pages/student/opportunities/SelectionProcessSelected";
import StudentViewAllOpportunities from "../../pages/student/opportunities/AllOppotunities";

const createRoutes = () => (
  <>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/adminLogin" component={LoginAdmin} />
      <Route exact path="/admin" component={DashboardAdmin} />
      <Route exact path="/admin/addStudents" component={CreateUsers} />
      <Route exact path="/admin/addBulkStudents" component={CreateBulkUsers} />
      <Route exact path="/admin/allStudents" component={AllUsers} />
      <Route exact path="/admin/updateStudent/:id" component={UpdateUser} />
      <Route exact path="/admin/addOpportunity" component={AddOpportunities} />
      <Route exact path="/admin/allOpportunities" component={AllOppotunities} />
      <Route
        exact
        path="/admin/updateOpportunities/:id"
        component={UpdateOpportunities}
      />
      <Route exact path="/admin/updateProcess/:id" component={UpdateProcess} />
      <Route
        exact
        path="/admin/opportunity/:id/selectionProcess/:processId/selected"
        component={SelectionProcessSelected}
      />
      <Route exact path="/admin/applicants/:id" component={GetApplicants} />
      <Route exact path="/admin/opportunity/:id" component={Opportunity} />
      <Route exact path="/admin/applicants/:id" component={Applicants} />
      <Route exact path="/admin/createStream" component={CreateStream} />
      <Route exact path="/admin/allStreams" component={AllStreams} />
      <Route exact path="/admin/updateStream/:id" component={UpdateStream} />

      <Route exact path="/login" component={Login} />
      <Route exact path="/student" component={Dashboard} />
      <Route exact path="/student/allResumes" component={AllResume} />
      <Route exact path="/student/editResume/:id" component={NewResume} />
      <Route exact path="/student/resume/:id" component={Generate} />
      <Route exact path="/student/profile" component={Profile} />
      <Route exact path="/student/applications" component={Applications} />
      <Route
        exact
        path="/student/eligibleOpportunities"
        component={EligibleOpportunities}
      />
      <Route
        exact
        path="/student/allOpportunities"
        component={StudentViewAllOpportunities}
      />
      <Route
        exact
        path="/student/opportunity/:id"
        component={StudentViewOpportunity}
      />
      <Route
        exact
        path="/student/applicants/:id"
        component={StudentViewApplicants}
      />
      <Route
        exact
        path="/student/opportunity/:id/selectionProcess/:processId/selected"
        component={StudentViewSelectionProcessSelected}
      />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default createRoutes;
