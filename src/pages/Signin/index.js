import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Button, Form, Header} from 'semantic-ui-react';
import {setPage} from '../../redux/actions/pageActions';
import {signin} from '../../redux/actions/userActions';
import Signup from './Signup';

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

class Signin extends Component {
  state = {username: '', password: '', showSignUp: false};

  onSubmit = () => {
    const {signin, setPage} = this.props;
    const {username, password} = this.state;

    signin(username, password)
    .then(user => setPage({name: 'home', user}));
  };

  render() {
    const {username, password} = this.state;
    console.log('state', this.state);

    if(this.state.showSignUp) {
      return <Signup goBack={() => this.setState({showSignUp: false})}/>
    }

    return (
      <Container>
        <Header as="h1">Sign In</Header>
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
          <ButtonContainer>
            <StyledButton primary type='submit'>Submit</StyledButton>
          </ButtonContainer>
          <p align="center">
            {'Don\'t have an account? '}
            <a
              color="primary"
              onClick={() => this.setState({showSignUp: true})}
              style={{textDecoration: 'underline', cursor: 'pointer'}}
            >Sign Up</a></p>
        </StyledForm>
      </Container>
    );
  }
}

export default connect(null, {signin, setPage})(Signin);
