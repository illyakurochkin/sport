import React, {Component} from 'react';
import styled from 'styled-components';
import MainClientInfo from './MainClientInfo';
import api from '../../utils/api';
import {withRouter} from 'react-router-dom';

const Container = styled.div``;

class Client extends Component {
  state = {client: null};

  componentDidMount() {
    console.log('in client');
    const {location: {pathname}} = this.props;

    const clientId = pathname.substring('/clients/'.length);

    api.get(`/api/clients/${clientId}`)
    .then(response => this.setState({client: response.data.client}));
  }

  render() {
    const {client} = this.state;

    if(!client) {
      return null;
    }

    console.log('client', client);

    return (
      <Container>
        <MainClientInfo client={client}/>
        <hr/>
      </Container>
    );
  }
}

export default withRouter(Client);
