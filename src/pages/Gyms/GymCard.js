import React, {Component} from 'react';
import {Icon, Item} from 'semantic-ui-react';

class GymCard extends Component {
  render() {
    const {gym, onClick} = this.props;
    
    return (
      <Item onClick={onClick}>
        <Item.Image onClick={onClick} size="medium" src={gym.photos[0]}/>
        <Item.Content>
          <Item.Header><a style={{cursor: 'pointer'}} onClick={onClick}>{gym.address}</a></Item.Header>
          <Item.Description>
            {gym.description || 'lksfjldfjs lsdkjfsd klskdjfsl ' +
            'kjlksjdf lskj sldkfj lsdkjf lsdkjfls dflksjd' +
            'sdlfkjsd flkj sldkjf lsdkfj lsdkfj' +
            's dlkfj sdlfjk sdlfkj lsdkfj sldfkjsdlfkjsld'}
          </Item.Description>
          {gym.phone && (
            <Item.Extra>
              <Icon color='blue' name='phone'/> {gym.phone}
            </Item.Extra>
          )}
          {gym.email && (
            <Item.Extra>
              <Icon color="blue" name="mail"/> {gym.email}
            </Item.Extra>
          )}
        </Item.Content>
      </Item>
    );
  }
}

export default GymCard;