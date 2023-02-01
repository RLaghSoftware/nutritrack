import React, { useState } from "react";
import axios from 'axios'; //used to "get" from database




export default function ViewCapsule(input){

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
        
        axios.get('/entries-grouped', { params: { sTime: state.Time, eTime: state.EndTime } }) 
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
            <p><font size="3"> <b> {((entries.created_at).replace("T06:00:00.000Z",""))} stats:</b></font> </p>
            <p>**************************************</p>
            <h1>Calories: {entries.TotCal}</h1> 
            <p>Protein: {entries.totProt}</p>
            <p>Fat: {entries.totFat}</p>
            <p>Carbs: {entries.totCarb}</p>
            <p>**************************************</p>
            
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
          
                <p>  Enter Start Date: </p> <input
                    type="date"
                    name="Time"
                    value={state.Time}
                    onChange={handleChange}
                />
                <br/>
                <p>  Enter End Date:</p> <input
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
}

