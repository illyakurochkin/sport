import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Signin from './pages/Signin';
import {fetchUser} from './redux/actions/userActions';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import EquipmentList from './pages/EquipmentList';
import Coach from './pages/Coach';
import Coaches from './pages/Coaches';
import Gym from './pages/Gym';
import Gyms from './pages/Gyms';
import Clients from './pages/Clients';
import Client from './pages/Client';
import CreateWorkout from './pages/CreateWorkout';
import Signup from './pages/Signin/Signup';
import Menu from './pages/components/Menu';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.div`
  width: 700px;
  margin: 50px auto;
`;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const {user} = this.props;

    return (
      <Container>
        <Wrapper>
          <Router>
            {user && <Menu/>}
            <Switch>
              {user ? (
                <Fragment>
                  <Route exact path="/home" component={Home}/>
                  <Route exact path="/workouts" component={Workouts}/>
                  <Route exact path="/coaches" component={Coaches}/>
                  <Route exact path="/gyms" component={Gyms}/>
                  <Route exact path="/clients" component={Clients}/>
                  <Route exact path="/equipment" component={EquipmentList}/>
                  <Route exact path="/gyms/:id" component={Gym}/>
                  <Route exact path="/coaches/:id" component={Coach}/>
                  <Route exact path="/clients/:id" component={Client}/>
                  <Route exact path="/create-workout" component={CreateWorkout}/>
                  <Route path="*" render={() => <Redirect to="/home" />} />
                </Fragment>
              ) : (
                <Fragment>
                  <Route exact path="/login" component={Signin}/>
                  <Route exact path="/signup" component={Signup}/>
                  <Route path="*" render={() => <Redirect to="/login" />} />
                </Fragment>
              )}
            </Switch>
          </Router>
        </Wrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps, {fetchUser})(App);
