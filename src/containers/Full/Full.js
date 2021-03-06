import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import IngestionWizard from '../../views/IngestionWizard/';
import Ontologies from '../../views/Ontologies/';
import Vocabulary from '../../views/Vocabulary/';
import Dashboard from '../../views/Dashboard/';
import Dataset from '../../views/Dataset/';
import DatasetDetail from '../../views/DatasetDetail/DatasetDetail';
import UserStory from '../../views/UserStory/';
import Profile from '../../views/Profile/';
import Settings from '../../views/Settings/';
import DashboardManager from '../../views/DashboardManager/DashboardManager';
import Organizations from '../../views/Settings/Organizations';
import Users from '../../views/Settings/Users';

class Full extends Component {
  render() {
    const { history } = this.props
    const divStyle = {
      'paddingLeft': '10px',
      'paddingRigth': '0px',
    };
    const mainDiv = {
      'backgroundColor' : 'white'
    }
    return (
      <div className="app">
        <Header history={history}/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main" style={mainDiv}>
            <Breadcrumb />
            <div className="container-fluid" style={divStyle}>
              <Switch>
                <Route path="/home" name="Dashboard" exact component={Dashboard}/>
                <Route path="/ingestionwizzard" name="Forms" component={IngestionWizard} history={history} />
                <Route path="/ontologies" name="Ontologies" component={Ontologies} />
                <Route path="/vocabulary" name="Vocabulary" component={Vocabulary} />
                <Route path="/dashboard" name="Dashboard manager" component={DashboardManager} />
                <Route path="/user_story" name="User Story" component={UserStory} />
                <Route exact path="/dataset" name="Dataset" component={Dataset} />
                <Route exact path="/dataset/:id" name="Dataset Detail" component={DatasetDetail} />
                <Route path="/profile" name="Profile" component={Profile} />
                <Route path="/settings" name="Settings" component={Settings} />
                <Route path="/organizations" name="Organizations" component={Organizations} />
                <Route path="/users" name="Users" component={Users} />
                <Redirect from="/" to="/home"/>
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
