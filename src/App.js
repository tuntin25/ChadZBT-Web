import { useState, useEffect } from "react"


const App = () => {
  const[value,setValue] = useState(null)
  const[message,setMessage] = useState(null)
  const[previousChats, setPreviousChats] = useState([])
  const[currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () =>{
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }
  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  } 
   
  const getMessages = async () =>{
    const options = {
      method:'POST',
      headers:{
          'Content-Type' : 'application/json'
      },
  
      body: JSON.stringify({
          message: value,
      })
  }
    try{
      const response = await fetch('http://localhost:8000/completions',options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    }catch(error){
      console.error(error)
    }
  }

  useEffect(()=>{
    console.log(currentTitle, value,message)
    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats,
          {
            title: currentTitle,
            role: "user",
            content: value
          }, 
          {
            title: currentTitle, 
            role: message.role,
            content: message.content
          }

        ]
      ))
    }
  }, [message, currentTitle])

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitle = Array.from(new Set(previousChats.map(previousChats => previousChats.title)))
  //console.log(uniqueTitle)

  return (
    <div className="app">
      <section className="side-bar">
        <button className="new-chat-btn" onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitle?.map((uniqueTitle,index) => <li key="index" onClick={()=>handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Developed by Nik</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>ChadZBT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role"> {chatMessage.role}</p>
            <p >{chatMessage.content}</p>
            </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
          <input id="input"
                placeholder="Send a message"
                value={value} onChange={(e) => setValue(e.target.value)}/>
            <div type="button" id="submit" onClick={getMessages}>➤</div>
          </div>
          <p>
            Free Research Preview.
            ChadZBT may produce inaccurate information about people, places, or facts. 
            ChadZBT May 14 Version
          </p>
        </div>
      </section>
    </div>
  );
}

export default App
