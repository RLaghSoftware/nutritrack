import React, { useState } from "react";
import axios from 'axios'; //used to "get" from database




export default function ViewTracker(input){

//creates state to store variables
      const [state, setState] = useState({ 
            Time:'',
            EndTime:'',
           entries: [],
         });


         
         const handleChange = e => {
            setState({
              ...state,
              [e.target.name]: e.target.value,
            })
          }

    let [inSearch, setSearch] = React.useState(false); //orignally, system is not searching for query, and user inputs filters
 

    function search(){ //if filters are added, system uses axios.get to send parameters to the backend, logs results, and displays data
        console.log(state.Time);
        console.log(state.EndTime);
        
        axios.get('/entries', { params: { sTime: state.Time, eTime: state.EndTime } }) 
        .then((response) => {
          const data = response.data;
          setState({ entries: data }); 
          console.log('Data has been received!!');
       
        })  
        .catch(() => {
          console.log('Error retrieving data!!!');
        });
        
        setSearch(true)
    }

    function displayUsers (entries) {

        if (!entries.length) return null;
      
//html of a formatted map showcasing retrieved data
      
        return entries.map((entries, index) => (
          <div key={index} className="test">
            <p> Meal {entries.ID} stats:</p>
            <p>**************************************</p>
            <h1>Calories: {entries.Calories}</h1> 
            <p>Protein: {entries.Protein}</p>
            <p>Fat: {entries.Fat}</p>
            <p>Carbs: {entries.Carbs}</p>
            <p>**************************************</p>
            <p><font size="3"> <b>Posted on: {((entries.created_at).replace("T06:00:00.000Z",""))}</b></font> </p>
            <button className="button button2" onClick={() => DeleteEntry(entries.ID)}>Delete</button>
            <p>________________________________________________________________________________________________________________________________________________________________________________________________</p>
            
           
          </div>
        )); 
      };
    

    if(inSearch){


   return(
       //header section for results
       <div className="blog-">
           <h1>Results:</h1>
         {displayUsers(state.entries)}
         <button className="button button1" onClick={() => input.setPage('home')}>Go Back</button>
       </div>
     
    );
    }
 

        
       

    
    else{
        return(
            // html of search page, what the user first sees. Text input is sent to state variables
            <div className="viewcap" >
                <h1>Enter time frame</h1>
          
                <p>Enter Start Date: </p> <input
                    type="date"
                    name="Time"
                    value={state.Time}
                    onChange={handleChange}
                />
                <br/>
                <p> Enter End Date: </p> <input
                    type="date"
                    name="EndTime"
                    value={state.EndTime}
                    onChange={handleChange}
                />
                <br/>
                
                <button className="button button1" onClick={() => search()}>Search</button>
                <button className="button button1" onClick={() => input.setPage('home')}>Go Back</button>
            </div>
        )
    }

    function DeleteEntry(ID)
    {
     // console.log(ID)
      alert("Entry Removed");
      // Delete Entry
      const res = axios.delete('/remove-with-id', { data: { entry: ID } });

      input.setPage('home');
    }
}

