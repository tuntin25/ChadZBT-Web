
const App = () => {
  return (
    <div className="app">
      <section className="side-bar">
        <button className="new-chat-btn">+ New Chat</button>
        <ul className="history">
          <li></li>
        </ul>
        <nav>
          <p>Developed by Nik</p>
        </nav>
      </section>
      <section className="main">
        <h1>ChadZBT</h1>
        <ul className="feed"></ul>
        <div className="bottom-section">
          <div className="input-container">
          <input id="input"
                placeholder="Send a message"/>
            <div type="button" id="submit">➤</div>
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
