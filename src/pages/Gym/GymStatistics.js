import React, {Component} from 'react';
import styled from 'styled-components';
import {Header} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CoachesTimetable from './CoachesTimetable';

const Container = styled.div``;

//const BlueText = styled.span.attrs({color: 'primary'})``;

/*
<Header as="h2">Statistic</Header>
        <Header as="h3">
          {'Total workouts: '}
          <BlueText>{statistic.totalWorkouts}</BlueText>
        </Header>
        <Header as="h3">
          {'Total clients: '}
          <BlueText>{statistic.totalClients}</BlueText>
        </Header>
        <Header as="h3">
          {'Total coaches: '}
          <BlueText>{statistic.totalCoaches}</BlueText>
        </Header>
 */
class GymStatistics extends Component {
  
  render() {
    const {statistic, timetables} = this.props;
    
    console.log('timetables --+++--+++', timetables);
    return (
      <Container>
        <CoachesTimetable timetables={timetables}/>
      </Container>
    );
  }
}

GymStatistics.propTypes = {
  statistic: PropTypes.object.isRequired,
  timetables: PropTypes.array.isRequired
};

export default GymStatistics;