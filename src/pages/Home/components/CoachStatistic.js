import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Header} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ScrollContainer = styled.div`
  width: 350px;
  height: 300px;
  overflow: auto;
`;

class CoachStatistic extends Component {
  goToWorkouts = () => this.props.history.push('/workouts');
  goToClient = (clientId) => this.props.history.push(`/clients/${clientId}`);

  render() {
    const {statistic} = this.props;

    return (
      <div>
        <Row>
          <a style={{cursor: 'pointer'}} onClick={this.goToWorkouts}><Header as="h3">{'Workouts - '}</Header></a>
          <p>{` ${statistic.workouts}`}</p>
        </Row>
        <Header as="h3">Clients</Header>
        <ScrollContainer>
          {statistic.clients.map(client => (
            <p><a style={{cursor: 'pointer'}} onClick={() => this.goToClient(client.clientId)}>{client.name}</a></p>
          ))}
        </ScrollContainer>
      </div>
    );
  }
}

CoachStatistic.propTypes = {
  statistic: PropTypes.object.isRequired
};

export default withRouter(CoachStatistic);
