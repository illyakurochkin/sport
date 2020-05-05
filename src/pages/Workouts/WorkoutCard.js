import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    height: 20px;
    width: 20px;
    color: red;
    font-size: 20px;
    font-weight: 700;
  }
`;

const LinksContainer = styled.div`
  margin-bottom: 15px;
`;

const StyledHeader = styled(Header)`
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

class WorkoutCard extends Component {
  goToCoach = () => {
    const {workout, userType, history} = this.props;

    if (!workout.coach) {
      return;
    }

    if (userType === 'COACH') {
      return history.push('/home');
    }

    return history.push(`/coaches/${workout.coach.coachId}`);
  };

  goToGym = () => {
    const {workout, userType, history} = this.props;

    if (userType === 'manager') {
      return history.push('/home');
    }

    console.log('go to gym', workout.gym);

    return history.push(`/gyms/${workout.gym.gymId}`);
  };

  goToClient = () => {
    const {workout, userType, history} = this.props;
    if (userType === 'CLIENT') {
      return history.push('/home');
    }

    return history.push(`/clients/${workout.client.clientId}`);
  };

  render() {
    const {workout} = this.props;

    console.log('workout', workout);
    const {client, coach, gym, startTime, endTime, price, date} = workout;

    return (
      <Container>
        <LinksContainer>
          <StyledHeader onClick={this.goToCoach} as="h3">Coach: <a>{(coach && coach.name) || '-'}</a></StyledHeader>
          <StyledHeader onClick={this.goToGym} as="h3">Gym: <a>{gym.address}</a></StyledHeader>
          <StyledHeader onClick={this.goToClient} as="h3">Client: <a>{client.name}</a></StyledHeader>
        </LinksContainer>
        <Row>
          <div>
            <StyledHeader as="h4">Date: {date}</StyledHeader>
            <StyledHeader as="h4">Start: {startTime}</StyledHeader>
            <StyledHeader as="h4">End: {endTime}</StyledHeader>
          </div>
          <Header as="h2" color="primary">{price} UAH</Header>
        </Row>
      </Container>
    );
  }
}

WorkoutCard.propTypes = {
  workout: PropTypes.object.isRequired,
  userType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userType: state.user.client ? 'CLIENT' : 'COACH',
});

const Connected = connect(mapStateToProps)(WorkoutCard);

export default withRouter(Connected);
