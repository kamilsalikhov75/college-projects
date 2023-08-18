import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../../assets/logo.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Link to="/index.html" className="logo__link">
          <img src={logo} className="logo__img" />
        </Link>
      </div>
    </footer>
  );
}

export { Footer };
