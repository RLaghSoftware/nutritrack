
import './App.css'; //styling
import React, { useEffect } from 'react';
import AddToTracker from './components/AddToTracker'; //importing pages
import ViewTracker from './components/ViewTracker';
import MyForm from './components/MyForm'


function App() {

  
  let [currPage, setPage] = React.useState('home') //starts on home page
  if(currPage === 'home'){
    //html of home page
    return (
      <div className="App">
        <h1>
          Track your Diet!
        </h1> 
    
       
        <button className='button button3'onClick={() => setPage('addtotracker')}>
          Add meal 
        </button>
        <p> After every meal, input the nutritional facts by clicking the 'Add meal' button
         (while recommended in grams, measurement unit is arbitrary) </p>
         <button className='button button3' onClick={() => setPage('viewtracker')}>
          View all meals
        </button>
        <p> Allows you to view all meals in a specific time frame, and even remove certain meals.</p>
        <button className='button button3' onClick={() => setPage('MyForm')}>
         View daily nutrition
        </button>
        <p> Tracks and displays your nutrition for each individual day. Dates that are displayed can be filtered by you.</p>
         
        
        
       
      
        
      </div>
      
    );
  }
  else if (currPage === 'addtotracker'){// changes pages after button click
    
    return (
      <AddToTracker setPage = {setPage}/>
    );
  }
  else if (currPage === 'viewtracker'){
    return (
      <ViewTracker setPage = {setPage}/>
    );
  }
  else if (currPage === 'MyForm'){
    return (
      <MyForm setPage = {setPage}/>
    );
  }

  else{
    return (
      <div>
        refresh page if here
      </div>
    );
  }
}

export default App;

