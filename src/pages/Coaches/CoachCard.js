import React, {Component} from 'react';
import {Icon, Item} from 'semantic-ui-react';

class CoachCard extends Component {
  render() {
    const {coach, onClick} = this.props;

    return (
      <Item onClick={onClick} style={{paddingBottom: 30, cursor: 'pointer'}}>
        <Item.Image onClick={onClick} size="small" src={coach.photo}/>
        <Item.Content>
          <Item.Header><a style={{cursor: 'pointer'}} onClick={onClick}>{coach.name}</a></Item.Header>
          {coach.age && (
            <Item.Extra>
              <Icon color="blue" name="star outline"/> {coach.age} years
            </Item.Extra>
          )}
          {coach.sportRang && (
            <Item.Extra>
              <Icon color="blue" name="trophy"/> {coach.sportRang}
            </Item.Extra>
          )}
          {coach.phone && (
            <Item.Extra>
              <Icon color='blue' name='phone'/> {coach.phone}
            </Item.Extra>
          )}
          {coach.email && (
            <Item.Extra>
              <Icon color="blue" name="mail"/> {coach.email}
            </Item.Extra>
          )}
        </Item.Content>
      </Item>
    );
  }
}

export default CoachCard;
