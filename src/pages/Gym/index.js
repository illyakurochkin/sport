import React, {Component} from 'react';
import styled from 'styled-components';
import MainGymInfo from './components/MainGymInfo';
import api from '../../utils/api';
import {withRouter} from 'react-router-dom';

const Container = styled.div``;

class Gym extends Component {
  state = {gym: null, timetables: null, statistic: null};

  componentDidMount() {
    const {location: {pathname}} = this.props;

    const gymId = pathname.substring('/gyms/'.length);
    
    console.log('this.props.location', this.props.location);
    console.log('gymId', gymId);

    api.get('/gym', {params: {id: gymId}})
      .then(response => this.setState({
        gym: response.data.gym,
        timetables: response.data.coaches,
        statistic: response.data.statistic,
      }));
  }

  render() {
    const {gym, statistic, timetables} = this.state;

    if (!gym) {
      return null;
    }

    return (
      <Container>
        <MainGymInfo
          gym={gym}
          timetables={timetables}
          statistic={statistic}
        />
      </Container>
    )
  }
}

export default withRouter(Gym);
