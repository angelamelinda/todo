import React, { Component } from 'react';

import ListTask from '../../components/ListTask';
import AddTask from '../../components/AddTask';

class Homepage extends Component {
    render() {
        return (
            <React.Fragment>
                <AddTask />
                <ListTask />
            </React.Fragment>      
        )
    }
}

export default Homepage;