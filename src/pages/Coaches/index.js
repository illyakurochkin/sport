import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Header} from 'semantic-ui-react';
import CoachCard from './CoachCard';
import Search from '../components/Search';
import {fetchCoaches} from '../../redux/actions/coachesActions';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';

const List = styled.div`
  margin-top: 30px;
  width: 700px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const search = (coach, query) => {
  console.log('search', coach, query);
  const q = (query && query.toLowerCase().trim()) || '';

  console.log('coach', coach);
  return coach && (_.get(coach, 'name', '').toLowerCase().includes(q) ||
    _.get(coach, 'phone', '').toLowerCase().includes(q) ||
    _.get(coach, 'email', '').toLowerCase().includes(q) || //)// ||
    _.get(coach, 'sportRang', '').toLowerCase().includes(q) ||
    String(_.get(coach, 'age', '')).toLowerCase().includes(q));
};

class Coaches extends Component {
  state = {query: ''};

  componentDidMount() {
    this.props.fetchCoaches();
  }

  renderCards() {
    const {coaches, history} = this.props;
    const {query} = this.state;

    return coaches && coaches
      .filter(coach => search(coach, query))
      .map(coach => (
        <CoachCard
          key={coach.coachId}
          coach={coach}
          onClick={() => history.push(`/coaches/${coach.coachId}`)}
        />
      ));
  }

  render() {
    const {query} = this.state;

    return (
      <div>
        <Header as="h1">Coaches</Header>
        <Search query={query} onChange={query => this.setState({query})}/>
        <List>
          {this.renderCards()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({coaches: state.coaches});

const Connected = connect(mapStateToProps, {fetchCoaches})(Coaches);

export default withRouter(Connected);
