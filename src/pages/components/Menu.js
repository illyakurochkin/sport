import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Button, Menu as SemanticMenu} from 'semantic-ui-react';
import {signin, signout} from '../../redux/actions/userActions';
import {Link, withRouter} from 'react-router-dom';

const Container = styled.div`
  left: 50px;
  position: fixed;
  width: 250px;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  border-radius: 10px;
  
  margin-top: 100px;
  
  background-color: #EEF6FB;
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: 100px;
`;

const AuthInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const UserType = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const AuthButton = styled(Button).attrs({primary: true})`
  flex: 1;
`;

const SemanticMenuContainer = styled.div`
  padding: 20px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
`;

class Menu extends Component {
  onSignin = () => this.props.signin('username', 'password');
  onSignout = () => this.props.signout();

  renderMenuItems() {
    const {user: {userType}, location: {pathname}} = this.props;

    return (
      <SemanticMenuContainer>
        <SemanticMenu secondary vertical>
          <Link to="/home">
            <SemanticMenu.Item name="home" active={pathname === '/home'}/>
          </Link>
          <Link to="/workouts">
            <SemanticMenu.Item name="workouts" active={pathname === '/workouts' || pathname === '/create-workout'}/>
          </Link>
          <Link to="/coaches">
            <SemanticMenu.Item name="coaches" active={pathname.startsWith('/coach')}/>
          </Link>
          <Link to="/gyms">
            <SemanticMenu.Item name="gyms" active={pathname.startsWith('/gym')} />
          </Link>

          {(userType === 'manager' || userType === 'coach') && (
            <Link to="/clients">
              <SemanticMenu.Item name="clients" active={pathname.startsWith('client')}/>
            </Link>
          )}
          {userType === 'manager' && (
            <Link to="/equipment">
              <SemanticMenu.Item name="equipment" active={pathname === '/equipment'}/>
            </Link>
          )}
        </SemanticMenu>
      </SemanticMenuContainer>
    )
  }

  renderAuthContainer() {
    const {user} = this.props;
    console.log('user', user);
    return (
      <AuthContainer>
        {user && (
          <AuthInfo>
            <UserType>{user.userType}</UserType>
            <p>{user.userData.name ? user.userData.name : user.userData.address}</p>
          </AuthInfo>
        )}
        <AuthButton
          content={user ? 'sign out' : 'sign in'}
          onClick={() => user ? this.onSignout() : this.onSignin()}
        />
      </AuthContainer>
    );
  }

  render() {
    return (
      <Container>
        {this.renderAuthContainer()}
        {this.renderMenuItems()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log('redux state', state);
  return {
    user: state.user,
  };
};

const Connected = connect(mapStateToProps, {signin, signout})(Menu);

export default withRouter(Connected);
