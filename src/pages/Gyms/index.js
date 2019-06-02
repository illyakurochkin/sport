import React, {Component} from 'react';
import styled from 'styled-components';
import {fetchGyms} from '../../redux/actions/gymsActions';
import {setPage} from '../../redux/actions/pageActions';
import {connect} from 'react-redux';
import GymCard from './components/GymCard';
import {Header, Item} from 'semantic-ui-react';
import Search from '../components/Search';
import _ from 'lodash';

const List = styled(Item.Group)`
  width: 700px;
`;

const search = (gym, query) => {
  const q = query.toLowerCase().trim();
  
  return _.get(gym, 'address', '').toLowerCase().includes(q) ||
   _.get(gym, 'description', '').toLowerCase().includes(q) ||
    _.get(gym, 'phone', '').toLowerCase().includes(q) ||
    _.get(gym, 'email', '').toLocaleString().includes(q);
};

class Gyms extends Component {
  state = {query: ''};
  
  componentDidMount() {
    this.props.fetchGyms({});
  }
  
  renderCards() {
    const {gyms} = this.props;
    const {query} = this.state;
    
    return gyms && gyms.filter(gym => search(gym, query))
    .map(gym => (
      <GymCard
        key={gym.gymId}
        gym={gym}
        onClick={() => setPage({name: 'gym', gym})}
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

const mapStateToProps = ({page, gyms}) => ({
  page,
  gyms
});

export default connect(mapStateToProps, {fetchGyms, setPage})(Gyms);
