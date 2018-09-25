import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RequestAddTask } from '../../redux/Action/action_todo';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();

        let date = new Date();
        
        let taskName = this.task.value,
            taskStatus = "On Going",
            taskCreated_date = date.getTime(),
            detailTask = {name: taskName, status: taskStatus, created_date: taskCreated_date};

        this.props.RequestAddTask(detailTask);

        this.task.value = '';
    }
    render() {
        return (
            <div className="add-task">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="What you want to do?" ref={input => this.task = input}/>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      taskIsAdded: state.Task.isAdded,
    //   listConvertedCurrency: state.Convertion.listConvertedCurrency
    }
  }
  
const matchDispatchToProps = (dispatch) => {
    return {
        // RequestCurrencyData : () => dispatch(RequestCurrencyData()),
        RequestAddTask : (detailTask) => dispatch(RequestAddTask(detailTask))
    }
}

export default connect(mapStateToProps,matchDispatchToProps)(AddTask);
