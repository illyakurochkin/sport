import React, {Component} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Form, Header} from 'semantic-ui-react';
import styled from 'styled-components';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {signup} from '../../redux/actions/userActions';

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

const Divider = styled.div`
  height: 30px;
  width: 100%;
`;

const input = styled.input``;

const Signup = ({goBack, handleSubmit}) => {
  const dispatch = useDispatch();
  const onSubmit = (params) => dispatch(signup(params)).then(goBack);

  return (
    <Container>
      <Header as="h1">Sign Up</Header>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>

        <Form.Field>
          <label>Email</label>
          <Field name="email" type="email" placeholder="example@gmail.com" component={input}/>
        </Form.Field>

        <Form.Field>
          <label>Password</label>
          <Field name="password" type="password" placeholder='******' component={input}/>
        </Form.Field>

        <Divider/>
        <Header as="h3">Client Info</Header>

        <Form.Field>
          <label>First name</label>
          <Field name="firstName" type="text" placeholder="Vasyl" component={input}/>
        </Form.Field>

        <Form.Field>
          <label>Last name</label>
          <Field name="firstName" type="text" placeholder="Petrenko" component={input}/>
        </Form.Field>

        <Form.Field>
          <label>Middle name</label>
          <Field name="middleName" type="text" placeholder="Bogdanovych" component={input}/>
        </Form.Field>

        <Form.Field>
          <label>Birth date</label>
          <Field name="birthDate" type="text" placeholder='yyyy.mm.dd' component={input}/>
        </Form.Field>

        <Form.Field>
          <label>Phone</label>
          <Field name="phone" type="text" placeholder='0684452759' component={input}/>
        </Form.Field>

        <Form.Field>
          <label>Photo url</label>
          <Field name="photo" type="text" placeholder='https://photos.com/image.jpg' component={input}/>
        </Form.Field>

        <ButtonContainer>
          <StyledButton primary type='submit'>Submit</StyledButton>
        </ButtonContainer>

        <p align="center">
          Already have an account? <a color="primary" onClick={goBack} style={{textDecoration: 'underline'}}>Sign In</a>
        </p>
      </StyledForm>
    </Container>
  );
};


Signup.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default reduxForm({form: 'SignUp'})(Signup);
