import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Header} from 'semantic-ui-react';
import ClientCard from './components/ClientCard';
import Search from '../components/Search';
import {fetchClients} from '../../redux/actions/clientsActions';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';

const List = styled.div`
  margin-top: 30px;
  width: 700px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const search = (client, query) => {
  const q = (query && query.toLowerCase().trim()) || '';

  return client && (_.get(client, 'name', '').toLowerCase().includes(q) ||
    _.get(client, 'phone', '').toLowerCase().includes(q) ||
    _.get(client, 'email', '').toLowerCase().includes(q) ||
    _.get(client, 'age', '').toLowerCase().includes(q));
};

class Clients extends Component {
  state = {query: ''};

  get cards() {
    const {clients, history} = this.props;
    const {query} = this.state;

    return clients && clients
      .filter(client => search(client, query))
      .map(client => (
        <ClientCard
          key={client.coachId}
          client={client}
          onClick={() => history.push(`/clients/${client.clientId}`)}
        />
      ));
  }

  componentDidMount() {
    this.props.fetchClients();
  }

  render() {
    const {query} = this.state;

    return (
      <div>
        <Header as="h1">Clients</Header>
        <Search query={query} onChange={query => this.setState({query})}/>
        <List>{this.cards}</List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clients: state.clients,
});

const Connected = connect(mapStateToProps, {fetchClients})(Clients);

export default withRouter(Connected);
