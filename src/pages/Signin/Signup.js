import React, {Component} from 'react';
import {Button, Form} from 'semantic-ui-react';
import styled from 'styled-components';
import api from '../../utils/api';

const Container = styled.div`
  margin: 60px auto;
  padding: 50px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);
  width: 500px;
  border-radius: 5px;
`;

const StyledForm = styled(Form)`
  margin-top: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const StyledButton = styled(Button)`
  width: 200px;
  margin: 0 auto;
`;

class Signup extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    photo: '',
    email: '',
    phone: ''
  };
  
  onSubmit = () => {
    const {username, password, firstName, lastName, middleName, birthDate, photo, email, phone} = this.state;
  
    api.post('/createUser', this.state)
  }
  
  render() {
    const {goBack} = this.props;
    const {username, password, firstName, lastName, middleName, birthDate, photo, email, phone} = this.state;
    
    return (
      <Container>
        <StyledForm onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Username</label>
            <input
              value={username}
              onChange={e => this.setState({username: e.target.value})}
              placeholder='username'
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              value={password}
              onChange={e => this.setState({password: e.target.value})}
              type="password"
              placeholder='******'
            />
          </Form.Field>
    
    
          <Form.Field>
            <label>First name</label>
            <input
              value={firstName}
              onChange={e => this.setState({firstName: e.target.value})}
              type="text"
              placeholder='Vasyl'
            />
          </Form.Field>
          <Form.Field>
            <label>Last name</label>
            <input
              value={lastName}
              onChange={e => this.setState({lastName: e.target.value})}
              type="text"
              placeholder='Petrenko'
            />
          </Form.Field>
          <Form.Field>
            <label>Middle name</label>
            <input
              value={middleName}
              onChange={e => this.setState({middleName: e.target.value})}
              type="text"
              placeholder='Bogdanovych'
            />
          </Form.Field>
          <Form.Field>
            <label>Birth date</label>
            <input
              value={password}
              onChange={e => this.setState({middleName: e.target.value})}
              type="text"
              placeholder='12.02.1991'
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              value={email}
              onChange={e => this.setState({email: e.target.value})}
              type="email"
              placeholder='example@mail.com'
            />
          </Form.Field>
          <Form.Field>
            <label>Phone</label>
            <input
              value={phone}
              onChange={e => this.setState({phone: e.target.value})}
              type="email"
              placeholder='+380684452759'
            />
          </Form.Field>
          <Form.Field>
            <label>Photo url</label>
            <input
              value={photo}
              onChange={e => this.setState({photo: e.target.value})}
              type="email"
              placeholder='https://photos.com/image.jpg'
            />
          </Form.Field>
          <ButtonContainer>
            <StyledButton primary type='submit'>Submit</StyledButton>
          </ButtonContainer>
          <p>Already have an account? <a color="primary" onClick={goBack} style={{textDecoration: 'underline'}}>Sign In</a></p>
        </StyledForm>
      </Container>
    );
  }
}

export default Signup;