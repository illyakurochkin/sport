import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {Button, Form, Header} from 'semantic-ui-react';
import {signin} from '../../redux/actions/userActions';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Field, reduxForm} from 'redux-form';

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

const input = styled.input``;

const Signin = ({handleSubmit, history}) => {
  const dispatch = useDispatch();

  const onSubmit = ({email, password}) => {
    console.log('email', email);
    console.log('password', password);
    return dispatch(signin(email, password))
      .then(() => history.push('/home'));
  };

  return (
    <Container>
      <Header as="h1">Sign In</Header>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label>Username</label>
          <Field name="email" placeholder='username' component={input}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Field name="password" type="password" placeholder='******' component={input}/>
        </Form.Field>
        <ButtonContainer>
          <StyledButton primary type='submit'>Submit</StyledButton>
        </ButtonContainer>
        <p align="center">
          {'Don\'t have an account? '}
          <Link
            to="/signup"
            color="primary"
            style={{textDecoration: 'underline', cursor: 'pointer'}}
          >Sign Up</Link></p>
      </StyledForm>
    </Container>
  );
};

const Connected = reduxForm({form: 'signIn'})(Signin);

export default withRouter(Connected);
