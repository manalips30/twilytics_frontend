import React from 'react'
import "./contacts.css"; 

const Contacts = ({ contacts, searchKey }) => {
  console.log(contacts)
  return (
    <div>
        <div className='cardWrapper'>
      {contacts.map((contact) => (
        <div className="card" key={contact.poi_name}>
         <div className="card-body">
            <div className="card-title">
              <img className="profilepicture"
              src={contact["user.profile_image_url_https"]}
              alt="new"
              />
            </div>
            <div className = "card-title">
              <h5 className="title">{contact.poi_name}</h5>
            </div>
            <div className = "card-title">
              <h5 className="emoji">{contact.sentiment}</h5>
            </div>
            <div className = "card-title">
              <h5 className="date">{contact.created_at}</h5>
            </div>
            <h6 className="location">{contact["user.location"]}</h6>
            <p className="card-text">{contact.full_text}</p>
            <button className="buttonTweet" onClick={()=> window.open(`https://twitter.com/TulsiGabbard/status/${contact.id}`, "_blank")} >View Tweet</button>
          </div>
        </div>
      ))}
        </div>
    </div>
  )
};

export default Contacts