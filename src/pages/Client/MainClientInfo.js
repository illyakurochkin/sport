import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header, Icon, Image} from 'semantic-ui-react';
import styled from 'styled-components';
import {Label} from 'semantic-ui-react';
import moment from 'moment';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  
  &>* {
    flex: 1;
  }
`;

const StyledImage = styled(Image)`
  margin-right: 20px;
`;

const StyledHeader = styled(Header)`
  margin: 0;
  padding: 0;
`;

class MainClientInfo extends Component {
  render() {
    const {client} = this.props;

    const subscription = !!client.subscriptions.find(a => {
      const start = moment(a.startDate);
      const end = moment(a.endDate);

      return moment().isBetween(start, end);
    });

    return (
      <Container>
        <div>
          <StyledImage size="medium" src={client.photo}/>
        </div>
        <div>
          <StyledHeader as="h1">{client.name}</StyledHeader>
          {subscription !== undefined && (
            <Label as='a' color={subscription ? 'green' : 'gray'} horizontal>
              {subscription ? 'Has active subscription' : 'Has not active subscription'}
            </Label>)}
          {client.email && <p><Icon color="blue" name="mail"/> {client.email}</p>}
          {client.phone && <p><Icon color="blue" name="phone"/> {client.phone}</p>}
          {client.age && <p><Icon color="blue" name="star outline"/> {client.age} years</p>}
        </div>
      </Container>
    );
  }
}

MainClientInfo.propTypes = {
  client: PropTypes.object.isRequired
};

export default MainClientInfo;
