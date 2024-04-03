 import './App.css';
import React, {Component} from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      result: null,
      SearchInput: ''
    }
  }

  fetchSearch = SearchInput => {
    fetch(`https://hn.algolia.com/api/v1/search?query=${SearchInput}`)
    .then(response=> response.json())
    .then(data=> this.setState({result : data}))
  }

  componentDidMount (){
   const {SearchInput} = this.state
   this.fetchSearch(SearchInput)
  }

    onSearchange = e => {
      this.setState ({SearchInput: e.target.value})
    }

    onSearchSubmit= e=> {
       const {SearchInput} = this.state
       this.fetchSearch(SearchInput)
       e.preventDefault()
    }
  
  
  render(){
    const {SearchInput , result} = this.state
    return (
      <div>
        <div>
         <Search value={SearchInput} onChange={this.onSearchange} onSubmit={this.onSearchSubmit}> 
         </Search>
        </div>
         {result? (<Show data={result.hits}></Show>) : null}
      </div>
    )
  }
}




class Search extends Component {
  render (){
    const {value, onChange, onSubmit} = this.props
    return(
      <form onSubmit={onSubmit}>
          <input type='text' value={value} onChange={onChange}/>
          <button type='submit'>Search</button>
      </form>
    )
  } 
}

class Show extends Component {
  render (){
    const {data} = this.props
    return(
      <div>
        {data.map(item=>
          <div> 
            {item.author}
          </div>) }
      </div>
    )
  }
}

export default App;
 