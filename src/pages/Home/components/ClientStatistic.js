import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Header} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

const Container = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  
  &>* {
    flex: 1;
  }
`;

const ScrollContainer = styled.div`
  width: 350px;
  height: 300px;
  overflow: auto;
`;

class ClientStatistic extends Component {
  goToWorkouts = () => this.props.history.push('/workouts');
  goToGym = (gymId) => this.props.history.push(`/gyms/${gymId}`);
  goToCoach = (coachId) => this.props.history.push(`/coaches/${coachId}`);

  render() {
    const {statistic} = this.props;

    return (
      <Container>
        <Header as="h2">Statistic</Header>
        <p>
          <a onClick={this.goToWorkouts}>Workouts:</a>
          {` ${statistic.workouts}`}
        </p>
        <Row>
          <div>
            <Header as="h3">Gyms</Header>
            <ScrollContainer>
              {statistic.gyms.map(gym => (
                <p><a onClick={() => this.goToGym(gym.gymId)}>{gym.address}</a></p>
              ))}
            </ScrollContainer>
          </div>
          <div>
            <Header as="h3">Coaches</Header>
            <ScrollContainer>
              {statistic.coaches.map(coach => (
                <p><a onClick={() => this.goToCoach(coach.coachId)}>{coach.name}</a></p>
              ))}
            </ScrollContainer>
          </div>
        </Row>
      </Container>
    );
  }
}

ClientStatistic.propTypes = {
  statistic: PropTypes.object.isRequired,
};

export default withRouter(ClientStatistic);
