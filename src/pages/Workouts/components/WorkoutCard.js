import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {setPage} from '../../../redux/actions/pageActions';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
  
  &:before {
    content: 'x';
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
`;

class WorkoutCard extends Component {
  goToCoach = () => {
    const {workout, userType, setPage} = this.props;
    
    if (!workout.coach) {
      return;
    }
    
    if (userType === 'coach') {
      return setPage('home');
    }
    setPage('coach', workout.coach.coachId);
  };
  
  goToGym = () => {
    const {workout, userType, setPage} = this.props;
    if (userType === 'admin') {
      return setPage('home');
    }
    setPage('gym', workout.gym.gymId);
  };
  
  goToClient = () => {
    const {workout, userType, setPage} = this.props;
    if (userType === 'client') {
      return setPage('home');
    }
    setPage('client', workout.client.clientId);
  };
  
  render() {
    const {workout} = this.props;
    const {client, coach, gym, startTime, endTime, payment, date} = workout;
    
    return (
      <Container>
        <LinksContainer>
          <StyledHeader onPress={this.goToCoach} as="h3">Coach: <a>{(coach && coach.name) || '-'}</a></StyledHeader>
          <StyledHeader onPress={this.goToGym} as="h3">Gym: <a>{gym.address}</a></StyledHeader>
          <StyledHeader onPress={this.goToClient} as="h3">Client: <a>{client.name}</a></StyledHeader>
        </LinksContainer>
        <StyledHeader as="h4">Date: {date}</StyledHeader>
        <StyledHeader as="h4">Start: {startTime}</StyledHeader>
        <StyledHeader as="h4">End: {endTime}</StyledHeader>
        <StyledHeader as="h4">Payment: {payment}</StyledHeader>
      </Container>
    );
  }
}

WorkoutCard.propTypes = {
  workout: PropTypes.object.isRequired,
  userType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userType: state.user.userType
});

export default connect(mapStateToProps, {setPage})(WorkoutCard);
