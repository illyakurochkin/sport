import React, {Component} from 'react';
import api from '../../utils/api';
import styled from 'styled-components';
import {Header} from 'semantic-ui-react';
import EquipmentCard from './EquipmentCard';

const Container = styled.div``;

class EquipmentList extends Component {
  state = {equipmentList: null};

  get equipment() {
    const {equipmentList} = this.state;
    return equipmentList && equipmentList.map(e => <EquipmentCard equipment={e}/>);
  }

  componentDidMount() {
    api.get('/equipment')
    .then(response =>
      this.setState({equipmentList: response.data.equipmentList}))
  }

  render() {
    return (
      <Container>
        <Header as="h1">Equipment</Header>
        {this.equipment}
      </Container>
    );
  }
}

export default EquipmentList;
