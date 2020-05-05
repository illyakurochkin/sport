import React, {Component} from 'react';
import styled from 'styled-components';
import MainGymInfo from './MainGymInfo';
import api from '../../utils/api';
import {withRouter} from 'react-router-dom';

const Container = styled.div``;

class Gym extends Component {
  state = {gym: null, timetables: null, statistic: null};

  componentDidMount() {
    const {location: {pathname}} = this.props;
    const gymId = pathname.substring('/gyms/'.length);

    api.get(`/api/gyms/${gymId}`)
      .then(response => this.setState({
        gym: response.data,
        timetables: response.data.timetables,
      }));
  }

  render() {
    const {gym, timetables} = this.state;

    if (!gym) {
      return null;
    }

    return (
      <Container>
        <MainGymInfo gym={gym} timetables={timetables}/>
      </Container>
    )
  }
}

export default withRouter(Gym);
