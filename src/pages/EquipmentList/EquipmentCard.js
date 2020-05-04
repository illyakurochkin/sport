import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Image} from 'semantic-ui-react';

const Container = styled.div`
  padding: 10px;
  border: 1px solid #CCC;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Photo = styled(Image).attrs({size: 'small'})`
  margin-right: 10px;
`;

class EquipmentCard extends Component {
  render() {
    const {equipment} = this.props;
    
    return (
      <Container>
        <Photo src={equipment.photo}/>
        <div>
          <p>
            {'name: '}
            <span color="primary">{equipment.name}</span>
          </p>
          <p>
            {'type: '}
            <span color="primary">{equipment.type}</span>
          </p>
          <p>
            {'condition: '}
            <span color="primary">{equipment.condition}</span>
          </p>
        </div>
      </Container>
    );
  }
}

EquipmentCard.propTypes = {
  equipment: PropTypes.object.isRequired
};

export default EquipmentCard;