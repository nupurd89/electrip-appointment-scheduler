import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';

export default class EditExercise extends Component{
  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeStopTime = this.onChangeStopTime.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username : "",
      description : "",
      duration: 0,
      startTime: '10:00',
      stopTime:'11:00',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          startTime: response.data.startTime,
          stopTime: response.data.stopTime,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if(response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }




  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description : e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeStartTime(startTime) {
    this.setState({
      startTime: startTime
    });
  }

  onChangeStopTime(stopTime) {
    this.setState({
      stopTime: stopTime
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e){
    e.preventDefault(); //prevents default HTML form submition from taking place

    const exercise = { //can only create variables if theyre only used in method
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      startTime: this.state.startTime,
      stopTime: this.state.stopTime,
      date: this.state.date

    }

    console.log(exercise);
    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3> Edit Exercise Log </h3>
        <form onSubmit= {this.onSubmit}>
          <div className = "form-group">
            <label> Username: </label>
            <select ref= "userInput"
              required
              className = "form-control"
              value = {this.state.username}
              onChange = {this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                return <option
                  key = {user}
                  value = {user}>{user}
                  </option>;
                  })
                }
              </select>
          </div>
      <div className="form-group">
        <label>Location: </label>
        <input  type="text"
            required
            className="form-control"
            value={this.state.description}
            onChange={this.onChangeDescription}
            />
      </div>
      <div className="form-group">
        <label>Duration (in minutes): </label>
        <input
            type="text"
            className="form-control"
            value={this.state.duration}
            onChange={this.onChangeDuration}
            />
      </div>
      <div className="form-group">
        <label>Date: </label>
        <div>
          <DatePicker
            selected={this.state.date}
            onChange={this.onChangeDate}
          />
        </div>
      </div>
      <div className="form-group">
        <label> Start Time:   </label>
        <TimePicker
          value={this.state.startTime}
          onChange={this.onChangeStartTime}

        />
      </div>
      <div className="form-group">
        <label> Stop Time:   </label>
        <TimePicker
          value={this.state.stopTime}
          onChange={this.onChangeStopTime}
        />
      </div>


      <div className="form-group">
        <input type="submit" value="Edit Appointment" className="btn btn-primary" />
      </div>
    </form>
    </div>
    )
  }
}
