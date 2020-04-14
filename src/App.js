import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import { Grid } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import StarRatings from 'react-star-ratings';

// const classes = useStyles();
const styles = {
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
};




class App extends Component {
  constructor() {
    super();
    this.state =
    {
      question: [],
      correact_answer: '',
      score: 0,
      index: 0,
      select: [],
      value: '',
      check: false,
      text: '',
      flag: true,
      width: 0,
      totalqustion: 20,
      rating: 0


    }
  }
  componentDidMount() {
    return fetch(`https://opentdb.com/api.php?amount=20&category=9&difficulty=hard&type=multiple`)
      .then((response) => response.json())
      .then((responseJson) => {

        for (var key in responseJson) {

          this.setState({ question: responseJson[key], correact_answer: responseJson.results.correct_answer })

        }

      })
      .catch((error) => {
        alert(error.message)
      });
  }





  nextquestion = () => {
    const { value, question } = this.state;
    if (value === '' || value === null) {
      alert("please Select Value")
    }
    else {

      if (value === question[this.state.index].correct_answer) {


        this.setState(state => {
          if (state.width  === 20) {
            return { width: 0 }

          }
          var width = this.state.index / this.state.totalqustion + 10
          return { width: width, index: this.state.index + 1, score: this.state.score + 1 }
        })
      }
      else {

        this.setState({ index: this.state.index + 1, check: false, score: this.state.score - 1 })


      }
    }


  }

  changeRating = (newRating, name) => {

    const { question } = this.state;
    console.log("new===>", newRating)
    if (question[this.state.index].difficulty == "hard" || newRating >= 3) {
      this.setState({ rating: newRating })

    }


    // if(newRating>3)
    // {
    //   this.setState({
    //     rating: newRating
    //   });
    // }
  }


  render() {
    console.log(this.state.value, this.state.score)
    const style = {
      width: this.state.width 
    };


    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={styles.title}>
              Quiz App
          </Typography>

          </Toolbar>
        </AppBar>

        <div className="wrapper" onClick={(e) => { this.handleClick(e) }}>
          {'Score: ' + this.state.score} <br />
          {this.state.width + '%'}
          <div className="bar" style={style} />
        </div>
        <StarRatings
          rating={this.state.rating}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={3}
          name='rating'

        />
        {this.state.question.length <=20? <div className="QuizBorder">
            <div style={{ flexDirection: 'row', borderColor: 'green' }}>
              <p>Question{this.state.question.length && this.state.question[this.state.index].question}</p>
              <p><input type="radio" value={this.state.value} key={this.state.index} name="radio-button-demo" onClick={(e) => { this.setState({ value: this.state.question[0].incorrect_answers }) }} />:{!!this.state.question.length && this.state.question[0].incorrect_answers}</p>
              <p><input type="radio" value={this.state.value} key={this.state.index} onClick={(e) => { this.setState({ value: this.state.question[1].incorrect_answers }) }} />{!!this.state.question.length && this.state.question[1].incorrect_answers}</p>
              <p><input type="radio" value={this.state.value} key={this.state.index} onClick={(e) => { this.setState({ value: this.state.question[2].incorrect_answers }) }} />{!!this.state.question.length && this.state.question[2].incorrect_answers}</p>
              <p><input type="radio" value={this.state.value} key={this.state.index} onClick={(e) => { this.setState({ value: this.state.question[this.state.index].correct_answer, flag: true }) }} />{!!this.state.question.length && this.state.question[this.state.index].correct_answer}</p>
              <button className="btn btn-danger" onClick={this.nextquestion}>Next</button>
            </div>


          </div>

      :<p>Quiz Over</p>}
      </div>
    );
  }
}
export default withStyles(styles)(App)


