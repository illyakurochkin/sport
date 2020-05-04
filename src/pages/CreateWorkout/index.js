import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Button, Header, Icon} from 'semantic-ui-react';
import SearchDropdown from './SearchDropdown';
import CoachCard from '../Coaches/CoachCard';
import GymCard from '../Gyms/GymCard';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../utils/api';
import {withRouter} from 'react-router-dom';

const StepContainer = styled.div`
  padding: 30px;
`;

const FlexContainer = styled.div`
  border-bottom: 1px solid gba(0,0,0,0.35);
`;

const Card = styled.div`
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.35);
  border-radius: 5px;
  margin: 30px 0 60px 0;
`;

const StyledDatepicker = styled(Datepicker)`
  border: 1px solid #CCC;
  height: 20px;
  border-radius: 20px;
  padding: 18px;
  width: 200px;
  margin-bottom: 20px;
  margin-vertical: 20px;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CoachName = styled.h4.attrs({className: 'blue'})`
  cursor: pointer;
  padding: 4px;
  margin-vertical: 4px;
  border-radius: 3px;
  ${props => props.selected && 'background-color: #CCC;'}
`;

const CloseButton = styled(Button).attrs({
  circular: true,
  basic: true,
  size: 'mini',
  icon: 'close',
  color: 'red'
})``;

class CreateWorkout extends Component {
  state = {
    coach: this.props.coach,
    gym: this.props.gym,
    date: null,
    time: ['10:00', '11:00'],
    coaches: [],
    loading: false,
    withCoach: false
  };

  renderCoachList(coaches) {
    const {coach} = this.state;

    return coaches.map(c => (
      <CoachName
        selected={coach && coach.coachId === c.coachId}
        color="primary"
        onClick={() => this.setState({coach: coach && c.coachId === coach.coachId ? null : c})}
      >{c.name}</CoachName>
    ));
  }

  renderCoachStep(n) {
    const {coach, coaches, loading} = this.state;

    return (
      <StepContainer>
        <Row>
          <Header as="h3">
            {coach && <Icon name="check circle outline" color="green"/>}
            {`${n}. Choose available coach`}
          </Header>
          <CloseButton onClick={() => this.setState({coach: null})}/>
        </Row>
        <FlexContainer>
          {!coaches.length && !loading ?
            <p>There are no coaches available coaches. Please, try another time or gym.</p> :
            <ul>{this.renderCoachList(coaches)}</ul>
          }
          {coach && (
            <CoachCard coach={coach}/>
          )}
        </FlexContainer>
      </StepContainer>
    )
  }

  renderGymStep(n) {
    const {gym} = this.state;

    return (
      <StepContainer>
        <Row>
          <Header as="h3">
            {gym && <Icon name="check circle outline" color="green"/>}
            {`${n}. Choose gym`}
          </Header>
          <CloseButton onClick={() => this.setState({gym: null, coaches: []})}/>
        </Row>
        <FlexContainer>
          <SearchContainer>
            <SearchDropdown
              style={{flex: 1}}
              value={gym}
              onSelect={gym => this.setState({gym, coaches: []})}
              type="gym"
            />
          </SearchContainer>
          {gym && <GymCard gym={gym}/>}
        </FlexContainer>
      </StepContainer>
    )
  }

  renderDateStep(n) {
    const {date, time} = this.state;

    return (
      <StepContainer>
        <Row>
          <Header as="h3">
            {date && time && <Icon name="check circle outline" color="green"/>}
            {`${n}. Choose date and time range`}
          </Header>
          <CloseButton onClick={() => this.setState({date: null, time: null})}/>
        </Row>
        <Column>
          <StyledDatepicker
            placeholder={'date'}
            selected={date}
            onChange={date => this.setState({date, coaches: []})}
          />
          <TimeRangePicker
            value={time}
            onChange={time => this.setState({time, coaches: []})}
            clearIcon={null}
            disableClock
          />
        </Column>
      </StepContainer>
    );
  }

  onWithCoachClick = () => {
    const {gym, date, time} = this.state;

    if (!(date && time && gym)) {
      return;
    }

    const withCoach = !this.state.withCoach;

    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const m = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
    const year = date.getFullYear();

    const dateString = `${d}.${m}.${year}`;


    this.setState({withCoach});

    if (withCoach) {
      const [start, end] = time;

      this.setState({loading: true});

      api.get(`/api/gyms/${gym.gymId}/coaches`, {
        params: {
          date: dateString,
          startTime: start + ':00',
          endTime: end + ':00'
        }
      })
      .then(({data}) => this.setState({loading: false, coaches: data}));
    }
  };

  onCreateWorkout = () => {
    const {history} = this.props;

    const {gym, date, time, withCoach, coach} = this.state;

    if (!gym || !date || !time || (withCoach && !coach)) {
      return;
    }

    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const m = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
    const year = date.getFullYear();
    //yyyy-MM-dd'T'HH:mm:ssZ
    // const dateString = `${year}-${m}-${d} ${time[0].toString()}:00`;
    const dateString = `${year}.${m}.${d}`;

    api.post('/api/workouts', {}, {
      params: {
        gymId: gym.gymId,
        dateStart: dateString,
        startTime: time[0].toString() + ':00',
        endTime: time[1].toString() + ':00',
        coachId: coach && coach.coachId
      },
    }).then(() => history.push('/workouts'));

  };

  render() {
    const {withCoach, loading, coaches} = this.state;

    return (
      <div>
        <Header as="h1">Create Workout</Header>
        <Card>
          {this.renderGymStep(1)}
          {this.renderDateStep(2)}
          <ButtonContainer>
            <Button
              color={withCoach && 'green'}
              onClick={this.onWithCoachClick}
            >With Coach</Button>
          </ButtonContainer>
          {withCoach && !loading && coaches && coaches.length && this.renderCoachStep(3)}
          <ButtonContainer>
            <Button size="big" primary onClick={this.onCreateWorkout}><Icon name="add"/>Create Workout</Button>
          </ButtonContainer>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({client: state.user});

const Connected = connect(mapStateToProps)(CreateWorkout);

export default withRouter(Connected);
