import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RequestDeleteTask, RequestChangeStatus } from '../../redux/Action/action_todo';

class ListTask extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }
    handleDelete(e) {
        e.preventDefault();
        
        let id = e.target.parentNode.getAttribute('id');
        this.props.RequestDeleteTask(id);
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
        this.props.RequestChangeStatus(id, detailTask);
    }
    render() {
        return (
            <div className="list-tasks row">
                {
                    Object.keys(this.props.listTask).map((key) => (
                        <div className={ this.props.listTask[key].status == 'Completed' ? 'col-12 task-completed' : 'col-12' } key={this.props.listTask[key]._id} id={this.props.listTask[key]._id}>
                            {this.props.listTask[key].name}
                            <button onClick={this.handleDelete}>Delete</button>
                            <button>Edit</button>
                            <button onClick={this.handleChangeStatus}>Done</button>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      listTask: state.Task.listTask,
    }
  }
  
const matchDispatchToProps = (dispatch) => {
    return {
        RequestDeleteTask : (idTask) => dispatch(RequestDeleteTask(idTask)),
        RequestChangeStatus : (id, detailTask) => dispatch(RequestChangeStatus(id, detailTask))
    }
}

export default connect(mapStateToProps,matchDispatchToProps)(ListTask);
