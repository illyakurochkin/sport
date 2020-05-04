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

class CoachesTimetable extends Component {
  state = {currentCoachId: _.get(this.props.timetables[0], 'coach.coachId')};

  renderList() {
    const {timetables} = this.props;
    const {currentCoachId} = this.state;

    const coaches = timetables.map(row => row.coach);

    return coaches.map(coach => (
      <a
        onClick={() => this.setState({currentCoachId: coach.coachId})}
        style={{
          display: 'inline-block',
          borderRadius: 2,
          padding: 2,
          cursor: 'pointer',
          marginRight: 20,
          backgroundColor: currentCoachId === coach.coachId ? '#CCC' : 'white'
        }}
      >
        {coach.name}
      </a>
    ))
  }

  renderTimetable() {
    const {timetables} = this.props;
    const {currentCoachId} = this.state;

    console.log(timetables);
    const timetable = timetables.find(t => t.coach.coachId === currentCoachId).tables;

    return <Timetable timetable={timetable}/>
  }

  render() {
    return (
      <Container>
        <Header as="h2" align="center">Coaches timetables</Header>
        <FlexContainer>
          <Content>
            <ListContainer>
              <Header as="h3">Coaches</Header>
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

CoachesTimetable.propTypes = {
  timetables: PropTypes.array.isRequired
};

export default CoachesTimetable;
