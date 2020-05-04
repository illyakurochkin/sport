import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Timetable from '../components/Timetable';
import {Header} from 'semantic-ui-react';

const Container = styled.div`
  margin-top: 100px;
`;

const FlexContainer = styled.div`
  border: 1px solid #CCC;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  overflow: auto;
`;

const TimetableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class GymsTimetable extends Component {
  state = {currentGymId: _.get(this.props.timetables[0], 'gym.gymId')};

  renderList() {
    const {timetables} = this.props;
    const {currentGymId} = this.state;

    const gyms = timetables.map(row => row.gym);

    return gyms.map(gym => (
      <a
        onClick={() => this.setState({currentGymId: gym.gymId})}
        style={{
          display: 'inline-block',
          borderRadius: 2,
          padding: 2,
          cursor: 'pointer',
          marginRight: 20,
          backgroundColor: currentGymId === gym.gymId ? '#CCC' : 'white'
        }}
      >
        {gym.address}
      </a>
    ))
  }

  renderTimetable() {
    const {timetables} = this.props;
    const {currentGymId} = this.state;

    console.log('currentGymId', currentGymId);
    console.log('timetables', timetables);

    const timetable = timetables.find(t => t.gym.gymId === currentGymId).table;
    console.log('tt', timetable);
    return <Timetable timetable={timetable}/>
  }

  render() {
    return (
      <Container>
        <Header as="h2" align="center">Gyms timetables</Header>
        <FlexContainer>
          <Content>
            <ListContainer>
              <Header as="h3">Gyms</Header>
              {this.renderList()}
            </ListContainer>
            <div>
              <TimetableContainer>
                {this.renderTimetable()}
              </TimetableContainer>
            </div>
          </Content>
        </FlexContainer>
      </Container>
    );
  }
}

GymsTimetable.propTypes = {
  timetables: PropTypes.array.isRequired
};

export default GymsTimetable;
