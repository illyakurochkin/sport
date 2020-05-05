import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCoaches} from '../../redux/actions/coachesActions';
import {fetchGyms} from '../../redux/actions/gymsActions';
import {Search} from 'semantic-ui-react';
import _ from 'lodash';

const initialState = {
  loading: false,
  results: [],
  value: ''
};

class SearchDropdown extends Component {
  state = initialState;

  componentDidMount() {
    const {type, fetchCoaches, fetchGyms, client, coach, gym} = this.props;

    switch (type) {
      case 'coach':
        return fetchCoaches(/*{
          clientId: _.get(client, 'clientId'),
          gymId: _.get(gym, 'gymId')
        }*/);
      case 'gym':
        return fetchGyms(/*{
          clientId: _.get(client, 'clientId'),
          coachId: _.get(coach, 'coachId')
        }*/);
    }
  }

  handleResultSelect = (e, result) => {
    console.log('e', e);
    console.log('result', result);

    this.setState({value: result.result.title})
    this.props.onSelect(result.result);
  };

  handleSearchChange = (e, {value}) => {
    const {source} = this.props;
    this.setState({loading: true, value});

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        loading: false,
        results: _.filter(source, isMatch)
      })
    }, 300)
  };

  render() {
    const {loading, results, value} = this.state;

    return (
      <Search
        loading={loading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={value}
      />
    );
  }
}

SearchDropdown.propTypes = {
  type: PropTypes.string.isRequired,
  gymId: PropTypes.object,
  clientId: PropTypes.object,
  coachId: PropTypes.object,
  onSelect: PropTypes.func.isRequired
};

const mapStateToProps = ({coaches, gyms, user}, {type}) => {
  let source = null;

  if (type === 'coach') {
    source = coaches && coaches.map(({photoUrl, sportRang, phone = '', email = '', name, payment, ...rest}) => ({
      title: name,
      description: `${phone} ${email}`,
      image: photoUrl,
      price: payment + ' UAH',

      photoUrl, sportRang, phone, email, name, payment, rest
    })) || [];

  } else if (type === 'gym') {
    source = gyms && gyms.map(gym => ({
      title: gym.street,
      description: `${gym.description}\n${gym.phone || ''} ${gym.email || ''}`,
      image: gym.gymPhotos[0].photoUrl,
      ...gym
    })) || [];
  }

  return {
    source,
    clientId: _.get(user, 'userData.clientId')
  }
};

export default connect(mapStateToProps, {fetchCoaches, fetchGyms})(SearchDropdown);
