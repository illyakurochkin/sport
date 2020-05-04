import React, {Component} from 'react';
import styled from 'styled-components';
import MainCoachInfo from './components/MainCoachInfo';
import api from '../../utils/api';
import {withRouter} from 'react-router';

const Container = styled.div``;

class Coach extends Component {
  state = {coach: null, timetables: null};

  componentDidMount() {
    const {location: {pathname}} = this.props;

    const coachId = pathname.substring('/coaches/'.length);

    console.log('coachId', this.props.location);

    api.get('/coach', {params: {id: coachId}})
    .then(response => this.setState({coach: response.data.coach, timetables: response.data.gyms}));

  }

  render() {
    const {coach, timetables} = this.state;

    console.log(this.props);

    if (!coach || !timetables) {
      return null;
    }

    return (
      <Container>
        <MainCoachInfo coach={coach} timetables={timetables}/>
      </Container>
    );
  }
}

export default withRouter(Coach);
