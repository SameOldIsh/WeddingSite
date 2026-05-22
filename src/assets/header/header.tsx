import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../styles/header.css'

function Header() {
  return (
    <div className="headContainer">
      <div>
        <div style={{ width: "100%" }}>
          <div className="headerBona" style={{ textAlign: "center", fontSize: "2.5rem", color: "#929f79" }}>C I A N A</div>
        </div>
        <div style={{ width: "100%" }}>
          <div className="headerTitle" style={{ textAlign: "center", color: "#929f79", fontSize: "1.5rem", marginTop: "10px" }}>n</div>
        </div>
        <div style={{ width: "100%" }}>
          <div className="headerBona" style={{ textAlign: "center", fontSize: "2.5rem", color: "#929f79"     }}>I S M A E L</div>
        </div>
        <div className="headerLinks" >
          <div>
            <a
              style={{
                
                color: "#929f79"
              }}
              href="/"
            >
              RSVP
            </a>
          </div>
          <div>
            <a
              style={{
               
                color: "#929f79" 
              }}
              href="#link"
            >
              Travel
            </a>
          </div>
          <div>
            <a
              style={{
            
                color: "#929f79"
              }}
              href="#link"
            >
              Registry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
