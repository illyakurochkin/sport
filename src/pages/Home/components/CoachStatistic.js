import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {setPage} from '../../../redux/actions/pageActions';

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

class CoachStatistic extends Component {
  goToWorkouts = () => this.props.setPage({name: 'workouts'});
  goToGym = (gymId) => this.props.setPage({name: 'gym', gymId});
  goToClient = (clientId) => this.props.setPage({name: 'client', clientId});
  
  render() {
    const {statistic} = this.props;
    
    return (
      <div>
        <Header as="h2">Statistic</Header>
        <p>
          <a onClick={this.goToWorkouts}>Workouts:</a>
          {` ${statistic.workouts}`}
        </p>
        <Row>
          <div>
            <ScrollContainer>
              {statistic.gyms.map(gym => (
                <p><a onClick={() => this.goToGym(gym.gymId)}>{gym.address}</a></p>
              ))}
            </ScrollContainer>
          </div>
          <div>
            <ScrollContainer>
              {statistic.clients.map(client => (
                <p><a onClick={() => this.goToClient(client.clientId)}>{client.name}</a></p>
              ))}
            </ScrollContainer>
          </div>
        </Row>
      </div>
    );
  }
}

CoachStatistic.propTypes = {
  statistic: PropTypes.object.isRequired
};

export default connect(null, {setPage})(CoachStatistic);