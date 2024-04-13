import React, { useState } from 'react';

function FeedBack() {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [loding,setLoding] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(feedback!==''){
    setLoding(true)
    setFeedbackList([...feedbackList, feedback]);
    setFeedback('');
    setTimeout(()=>{
      setLoding(false)
    },3000)
    
    }
  };

  return (
    <div style={{ textAlign: 'center', 
    maxWidth: '600px', 
    maxHeight:'80vh',
    overflowY:'scroll',
    scrollbarWidth:'thin',
    scrollbarColor: 'lightgrey white',
    margin: '0 auto', 
    padding: '20px' ,
    }}>
      <h1 style={{ color: 'black' }}>Feedback Page</h1>
      <form onSubmit={handleSubmit}>
        <textarea rows="10" cols="38"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          style={{row:'100', marginBottom: '10px',padding:'15px 30px'  }}
        />
        <br />
        <button type="submit" style={{width: '100%', padding: '10px', backgroundColor: 'lightgreen', border: 'none', borderRadius: '4px', cursor: 'pointer'  }}
        
        >{loding?'Submiting....':'Submit'}
        </button>
      </form>
      
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {feedbackList.map((item, index) => (
          <li key={index} style={{ backgroundColor: 'lightblue', padding: '10px', margin: '5px', borderRadius: '5px' }}>{item}</li>
        ))}
      </ul>
      

    </div>
  );
}

export default FeedBack;