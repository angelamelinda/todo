import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RequestAddTask, RequestEditTask, RequestGetAllTask } from '../../redux/Action/action_todo';
import _ from 'lodash';

export class AddTask extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if(this.task.value != '' && !_.isEmpty(this.props.dataEdit)) {
            let id = this.props.dataEdit[0]._id, 
                detailTask = { name: this.task.value, status: this.props.dataEdit[0].status, created_date: this.props.dataEdit[0].created_date}
            
            this.props.RequestEditTask(id, detailTask);
            
            if(this.props.taskIsAdded) {
                this.props.RequestGetAllTask();
            }
            
        } else if(this.task.value != ''){
            let date = new Date(),
                taskName = this.task.value,
                taskStatus = "On Going",
                taskCreated_date = date.getTime(),
                detailTask = {name: taskName, status: taskStatus, created_date: taskCreated_date};
    
            this.props.RequestAddTask(detailTask);

            if(this.props.taskIsAdded) {
                this.props.RequestGetAllTask();
            }
        }

        this.task.value = '';
    }
    render() {
        if(!_.isEmpty(this.props.dataEdit) ) {
            this.task.value = this.props.dataEdit[0].name;
        }
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
      taskIsAdded: state.Task.isAdded
    }
  }
  
const matchDispatchToProps = (dispatch) => {
    return {
        RequestEditTask : (id, detailTask) => dispatch(RequestEditTask(id, detailTask)),
        RequestAddTask : (detailTask) => dispatch(RequestAddTask(detailTask)),
        RequestGetAllTask : () => dispatch(RequestGetAllTask())
    }
}

export default connect(mapStateToProps,matchDispatchToProps)(AddTask);
