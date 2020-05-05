import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Header, Icon, Image} from 'semantic-ui-react';
import Carousel from 'nuka-carousel';
import GymStatistics from './GymStatistics';
import {Button} from 'semantic-ui-react';
import Modal from 'react-modal';
import EquipmentCard from '../EquipmentList/EquipmentCard';

const Container = styled.div``;

const Images = styled(Carousel)`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  
  &>div {
    flex: 1;
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

class MainGymInfo extends Component {
  state = {modalIsOpen: false};

  openModal = () => this.setState({modalIsOpen: true});

  closeModal = () => this.setState({modalIsOpen: false});

  renderModal() {
    const {gym} = this.props;
    const {modalIsOpen} = this.state;

    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.closeModal}
        style={{
          width: 500,
          height: 500,
          margin: 'auto',
          backgroundColor: 'white',
          borderWidth: 2,
          borderColor: '#CCC',
          padding: 20
        }}
        contentLabel="Example modal"
      >
        <Header as="h2">Equipment</Header>
        {gym.equipmentList.map(e => <EquipmentCard equipment={e}/>)}
      </Modal>
    )
  }


  render() {
    const {gym, timetables} = this.props;
    console.log('this.props', this.props);

    return (
      <Container>
        <Header as="h1">{gym.address}</Header>
        <Images {...settings}>
          {gym.gymPhotos.map(photo => <div key={photo.photoUrl}><Image src={photo.photoUrl}/></div>)}
        </Images>
        <p>{gym.description}</p>
        <FlexContainer>
          <div>
            <Button onClick={this.openModal}>Show Equipment</Button>
            {this.renderModal()}
          </div>
          <div>
            {gym.phone && <p align="right"><Icon color="blue" name="phone"/> {gym.phone}</p>}
            {gym.email && <p align="right"><Icon color="blue" name="mail"/> {gym.email}</p>}
            {gym.fine && <p align="right"><Icon color="blue" name="star"/> {gym.fine} UAH</p>}
          </div>
        </FlexContainer>
        <GymStatistics timetables={timetables}/>
      </Container>
    );
  }
}

MainGymInfo.propTypes = {
  gym: PropTypes.object.isRequired,
  timetables: PropTypes.array.isRequired
};

export default MainGymInfo;
