import React, {Component} from 'react';
import {Button, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchWorkouts} from '../../redux/actions/workoutsActions';
import WorkoutCard from './WorkoutCard';
import {withRouter} from 'react-router-dom';

class Workouts extends Component {
  componentDidMount() {
    const {user: {userType, userData}} = this.props;

    const filter = {};

    if (userType === 'client') {
      filter.clientId = userData.clientId
    } else if (userType === 'manager') {
      filter.gymId = userData.gymId;
    } else if (userType === 'coach') {
      filter.coachId = userData.coachId;
    }

    this.props.fetchWorkouts(filter);
  }

  renderWorkouts() {
    const {workouts} = this.props;

    return workouts && workouts.map(workout => (
      <WorkoutCard key={JSON.stringify(workout)} workout={workout}/>
    ));
  }

  render() {
    const {history, user} = this.props;

    return (
      <div>
        <Header as="h1">Workouts</Header>
        {user.userType === 'client' &&
        <Button primary onClick={() => history.push('/create-workout')}>Create Workout</Button>}
        {this.renderWorkouts()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('workouts', state);
  return ({
    workouts: state.workouts,
    user: state.user,
  });
};

const Connected = connect(mapStateToProps, {fetchWorkouts})(Workouts);

export default withRouter(Connected);
