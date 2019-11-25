import React from 'react'
import "./contacts.css"; 

const Contacts = ({ contacts, searchKey }) => {
  console.log(contacts)
  return (
    <div>
      <h1>Search Result</h1>
        <p>
            {JSON.stringify(searchKey, null, 2)}
        </p>
        <div className='cardWrapper'>
      {contacts.map((contact) => (
        
        <div className="card" key={contact.poi_name}>
         <div className="card-body">
            <h5 className="card-title">{contact.poi_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{contact.created_at}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{contact["user.location"]}</h6>
            <p className="card-text">{contact.full_text}</p>
          </div>
        </div>
      ))}
        </div>
    </div>
  )
};

export default Contacts