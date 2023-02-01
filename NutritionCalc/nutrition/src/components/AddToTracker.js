import React, { useState } from "react";




function submit(input, state){
    
   //fetch method to post data and add it into the local database after submit button is clicked
     fetch('http://localhost:3000/store-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // We convert the React state to JSON and send it as the POST body
    body: JSON.stringify({
      Date: state.Created_at,
      Calories: state.Calories,
      Protein: state.Protein,
      Fat: state.Fat,
      Carbs: state.Carbs
    }
      
      )

    })
    
    .then(function(response) {
      
      console.log(response)
      
      return response.json();
    });
     input.setPage("home");
     alert("Posted "); //alerts user of post
  
     
 }

export default function AddToTracker(input){

// uses state to created variables
    const [state, setState] = useState({
        Created_at: '',
        Calories: '0',
        Protein: '0',
        Fat: '0',
        Carbs: '0',
      })

      const handleChange = e => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        })
      }
  
  //html of add page. Text input gets sent to state variables
    return(
        <div className="Trackerheader">
            <h1>Add To Tracker</h1>
      
          {/* <br/> */}
       
        <p>Date :</p> 
          <input
            type="date"
            name="Created_at"
            value={state.Created_at}
            onChange={handleChange}
          />
        
        <br/>
        
        <p> Calories: </p>
          <input
            type="number"
            name="Calories"
            value={state.Calories}
            onChange={handleChange}
          />
    
        <br/>
       
        <p> Protein: </p>
          <input
            type="nunmber"
            name="Protein"
            value={state.Protein}
            onChange={handleChange}
          />
       
        <br/>
       
        <p>  Fat: </p>
          <input
            type="number"
            name="Fat"
            value={state.Fat}
            onChange={handleChange}
          />
       
        <br/>
       
 
        
        <p> Carbs: </p>
          <input
            type="number"
            name="Carbs"
            value={state.Carbs}
            onChange={handleChange}
            />
       
            <br/>
        
     
  

            <button className="button button1" onClick={() => submit(input, state)}>Submit</button>
            <button className="button button1" onClick={() => input.setPage('home')}>Go Back</button>
        </div>
    )
}