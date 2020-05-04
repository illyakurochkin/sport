import React, {Component} from 'react';
import {Icon, Item} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ClientCard extends Component {
  render() {
    const {client, onClick} = this.props;
    
    return (
      <Item onClick={onClick}>
        <Item.Image onClick={onClick} size="small" src={client.photo}/>
        <Item.Content>
          <Item.Header><a style={{cursor: 'pointer'}} onClick={onClick}>{client.name}</a></Item.Header>
          {client.age && (
            <Item.Extra>
              <Icon color="blue" name="star outline"/> {client.age} years
            </Item.Extra>
          )}
          {client.sportRang && (
            <Item.Extra>
              <Icon color="blue" name="trophy"/> {client.sportRang}
            </Item.Extra>
          )}
          {client.phone && (
            <Item.Extra>
              <Icon color='blue' name='phone'/> {client.phone}
            </Item.Extra>
          )}
          {client.email && (
            <Item.Extra>
              <Icon color="blue" name="mail"/> {client.email}
            </Item.Extra>
          )}
        </Item.Content>
      </Item>
    );
  }
}

ClientCard.propTypes = {
  client: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ClientCard;
