import './message.css';

function Message({ title }) {
  return (
    <div className="loading">
      <div className="container">
        <h1 className="title">{title}</h1>
      </div>
    </div>
  );
}

export { Message };
