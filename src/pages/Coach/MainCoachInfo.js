import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header, Icon, Image} from 'semantic-ui-react';
import styled from 'styled-components';
import GymsTimetable from './GymsTimetable';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled(Header)`
  margin-bottom: 20px;
`;

const StyledImage = styled(Image)`
  margin-right: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class MainCoachInfo extends Component {
  
  
  render() {
    const {coach, timetables} = this.props;
    
    return (
      <Container>
        <FlexContainer>
          <div>
            <StyledImage size="medium" src={coach.photo}/>
          </div>
          <div>
            <StyledHeader as="h1">{coach.name}</StyledHeader>
            {coach.age && <p><Icon color="blue" name="star outline"/> {coach.age} years</p>}
            {coach.sportRang && <p><Icon color="blue" name="trophy"/> {coach.sportRang}</p>}
            {coach.email && <p><Icon color="blue" name="mail"/> {coach.email}</p>}
            {coach.phone && <p><Icon color="blue" name="phone"/> {coach.phone}</p>}
            {coach.payment && <p><Icon color="blue" name="money bill alternate outline"/> {coach.payment} UAH</p>}
          </div>
        </FlexContainer>
        <GymsTimetable timetables={timetables}/>
      </Container>
    );
  }
}

MainCoachInfo.propTypes = {
  coach: PropTypes.object.isRequired,
  timetables: PropTypes.object.isRequired
};

export default MainCoachInfo;
