import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { RequestDeleteTask, RequestEditTask, RequestGetAllTask } from '../../redux/Action/action_todo';

export class ListTask extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleDelete(e) {
        e.preventDefault();
        
        let id = e.target.parentNode.getAttribute('id');
        this.props.RequestDeleteTask(id).then(() => {;
            this.props.RequestGetAllTask();
        })
    }
    handleChangeStatus(e) {
        e.preventDefault();
        
        let id = e.target.parentNode.getAttribute('id');
        let data = Object.keys(this.props.listTask).filter((key) => {
            if (this.props.listTask[key]._id == id) {
                return true;
            } 
        }).map((key) => {
            return this.props.listTask[key];
        })
        if(data[0].status == 'Completed') {
            data[0].status = 'On Going';
        } else if(data[0].status == 'On Going') {
            data[0].status = 'Completed';
        } 
        let detailTask = {
            'name':data[0].name,
            'status':data[0].status,
            'created_date':data[0].created_date
        }
        this.props.RequestEditTask(id, detailTask);
        this.props.RequestGetAllTask();
    }
    handleEdit(e) {
        let id = e.target.parentNode.getAttribute('id');
        let data = Object.keys(this.props.listTask).filter((key) => {
            if (this.props.listTask[key]._id == id) {
                return true;
            } 
        }).map((key) => {
            return this.props.listTask[key];
        })
        this.props.edit(data);
    }
    render() {
        let listTasks = this.props.isFetched && Object.keys(this.props.listTask).map((key) => (
                <div key={this.props.listTask[key]._id} id={this.props.listTask[key]._id} className={ this.props.listTask[key].status == 'Completed' ? 'col-12 task-completed' : 'col-12' }>
                    {this.props.listTask[key].name}
                    <button className="button-delete" onClick={this.handleDelete}>Delete</button>
                    <button className="button-edit" onClick={this.handleEdit}>Edit</button>
                    <button className="button-change-status" onClick={this.handleChangeStatus}>Done</button>
                </div>
            ))
    
        return (
            <div className="list-tasks row">
                {listTasks}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      listTask: state.Task.listTask,
      isFetched: state.Task.isFetched
    }
  }
  
const matchDispatchToProps = (dispatch) => {
    return {
        RequestGetAllTask : () => dispatch(RequestGetAllTask()),
        RequestDeleteTask : (idTask) => dispatch(RequestDeleteTask(idTask)),
        RequestEditTask : (id, detailTask) => dispatch(RequestEditTask(id, detailTask))
    }
}

export default connect(mapStateToProps,matchDispatchToProps)(ListTask);
