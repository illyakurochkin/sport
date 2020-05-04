import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Header, Item} from 'semantic-ui-react';
import GymCard from './components/GymCard';
import Search from '../components/Search';
import {fetchGyms} from '../../redux/actions/gymsActions';
import _ from 'lodash';

const List = styled(Item.Group)`
  width: 700px;
`;

const search = (gym, query) => {
  const q = (query && query.toLowerCase().trim()) || '';

  return gym && (_.get(gym, 'address', '').toLowerCase().includes(q) ||
    _.get(gym, 'description', '').toLowerCase().includes(q) ||
    _.get(gym, 'phone', '').toLowerCase().includes(q) ||
    _.get(gym, 'email', '').toLocaleString().includes(q));
};

class Gyms extends Component {
  state = {query: ''};

  componentDidMount() {
    this.props.fetchGyms();
  }

  renderCards() {
    const {gyms, history} = this.props;
    const {query} = this.state;

    return gyms && gyms.filter(gym => search(gym, query))
    .map(gym => (
      <GymCard
        key={gym.gymId}
        gym={gym}
        onClick={() => history.push(`/gyms/${gym.gymId}`)}
      />
    ));
  }

  render() {
    const {query} = this.state;

    return (
      <div>
        <Header as="h1">Gyms</Header>
        <Search query={query} onChange={query => this.setState({query})}/>
        <List divided>
          {this.renderCards()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = ({gyms}) => ({gyms});

export default connect(mapStateToProps, {fetchGyms})(Gyms);
