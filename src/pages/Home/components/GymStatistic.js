import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Header} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ScrollBox = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

class GymStatistic extends Component {
  goToClient = clientId => this.props.history.push(`/clients/${clientId}`);

  render() {
    const {statistic} = this.props;

    return (
      <Container>
        <Header as="h3" color="primary">Clients</Header>
        <ScrollBox>
          {statistic.clients.map(row => (
            <p key={row.clientId}>
              <a
                style={{cursor: 'pointer'}}
                color="primary"
                onClick={() => this.goToClient(row.clientId)}
              >
                {row.clientName}
              </a>
              {' ' + row.amountOfWorkouts}
            </p>
          ))}
        </ScrollBox>
      </Container>
    );
  }
}

GymStatistic.propTypes = {
  statistic: PropTypes.object.isRequired,
};

export default withRouter(GymStatistic);
