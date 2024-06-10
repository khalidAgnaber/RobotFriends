import React, {Component} from 'react';
import CardList from '../components/CardList';
import { robots } from '../robots';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component{
    constructor(){
        super(); 
        this.state=
        {robots:robots,
        searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
        return response.json();
        })
        .then(users => {
        this.setState({robots:users}); 
    });
}

    onSearchChange = (event) =>{
        this.setState({searchfield: event.target.value})
    }



    render(){
        const{robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        console.log(filteredRobots);
    return(
        <div className='tc'>
            <h1>Robot Friends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
        <ErrorBoundary>
        <CardList robots={filteredRobots} />
        </ErrorBoundary>
        </Scroll>
        </div>
    );
}
}

export default App;
