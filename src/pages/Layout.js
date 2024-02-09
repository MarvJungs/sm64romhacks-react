import {Outlet} from 'react-router-dom';
import logo from "../assets/logo.png"
import smwc from "../assets/smwc.gif"
import mfgg from "../assets/mfgg.png"
import luigibros from "../assets/luigibros.png"
import simpleflips from "../assets/simpleflips.png"
import smmdb from "../assets/smmdb.png"
import dd64 from "../assets/64DD_logo.png"
import kuribo from "../assets/kuribo64.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitch, faYoutube, faTwitter, faPaypal } from "@fortawesome/free-brands-svg-icons";
//import '../App.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';


export default function Layout() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    fetch('/api/user/')
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        throw response;
    })
    .then(data => {
        setUser({
          admin: data.admin,
          data: data.data,
          logged_in: data.logged_in
        })
    })
    .catch(error => {
      setError(error);
    })
    .finally(setLoading(false))
  }, []);
  useEffect(() => {
    setInterval(() => {
      const t = new Date();
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      };
      const time = new Intl.DateTimeFormat('sv', options).format(t);
      setTime(time);
    }, 1000);
  }, [time]);

    return (
          <Container fluid={true}>
            <Container>
              <Header user={user}/>
              <p className='text-end'>{time}</p>
              <Outlet context={{user: user,
                                error: error,
                                loading: loading}}/>
              <Footer />
              </Container>
          </Container>
    )
}

function Header({user}) {
    return (
      <>
        <Navbar collapseOnSelect variant='dark' expand='lg'>
          <Container>
            <Navbar.Brand href="/">
              <img className="d-inline-block align-top" src={logo} alt="Logo" width="160" height="90"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
            <Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
            <Nav className='me-auto'>
              <Nav.Link href='/hacks'>ROM Hacks</Nav.Link>
              <Nav.Link href='/megapack'>Megapack</Nav.Link>
              <NavDropdown title='Events' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/events/wsrm2024'>WSRM2024</NavDropdown.Item>
                <NavDropdown.Item href='/events/league2023'>League 2023</NavDropdown.Item>
                <NavDropdown.Item href='/events/ssrm2023'>SSRM2023</NavDropdown.Item>
                <NavDropdown.Item href='/events/wsrm2023'>WSRM2023</NavDropdown.Item>
                <NavDropdown.Item href='/events/league2022'>League 2022</NavDropdown.Item>
                <NavDropdown.Item href='/events/ssrm2022'>SSRM2022</NavDropdown.Item>
                <NavDropdown.Item href='/events/wsrm2022'>WSRM2022</NavDropdown.Item>
                <NavDropdown.Item href='/events/ssrm2021'>SSRM2021</NavDropdown.Item>
                <NavDropdown.Item href='/events/wsrm2021'>WSRM2021</NavDropdown.Item>
                <NavDropdown.Item href='/events/ssrm2020'>SSRM2020</NavDropdown.Item>
                <NavDropdown.Item href='/events/wsrm2020'>WSRM2020</NavDropdown.Item>
                <NavDropdown.Item href='/events/ssrm2019'>SSRM2019</NavDropdown.Item>
                <NavDropdown.Item href='/events/wsrm2019'>WSRM2019</NavDropdown.Item>
                <NavDropdown.Item href='/events/ssrm2018'>SSRM2018</NavDropdown.Item>
                <NavDropdown.Item href='/events/wsrm2018'>WSRM2018</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='Gameplay Tools' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/codes'>Codes</NavDropdown.Item>
                <NavDropdown.Item href='/stardisplay'>Star Display</NavDropdown.Item>
                <NavDropdown.Item href='/patcher'>Online Patcher</NavDropdown.Item>
                <NavDropdown.Item href='/plugins'>Plugin Guide</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href='/faq'>FAQ</Nav.Link>
              <Nav.Link href='/streams'>Streams</Nav.Link>
              <Nav.Link href='/discord'>Discord</Nav.Link>
              <Nav.Link href='/support'>Support!</Nav.Link>
              {
                !user.logged_in ? (
                  <Nav.Link href='/login'>Login</Nav.Link>
                ) : (
                  <>
                    <img src={'https://cdn.discordapp.com/avatars/' + user.data.discord_id + "/" + user.data.discord_avatar + ".jpg"} width={32} height={32} alt='' />
                    <NavDropdown title={user.data.discord_username} id='basic-nav-dropdown'>
                      <NavDropdown.Item href={'/users/'.concat(user.data.discord_id)}>Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href='/login/logout.php'>Logout</NavDropdown.Item>
                      <NavDropdown.Item href='/login/deleteAccount.php'>Delete Account</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )
              }
            </Nav>
          </Container>
        </Navbar>
        <hr/>
      </>
    );
}

function Footer() {
    const date = new Date();
    return (
      <footer className="text-center text-white bg-dark">
        <hr/>
        <div className="container p-4">
          <section className="mb-4">
            <a className="btn btn-outline-light btn-floating m-1" href="https://discord.sm64romhacks.com" role="button">
              <FontAwesomeIcon icon={faDiscord} />
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="https://www.twitch.tv/sm64romhacks" role="button">
              <FontAwesomeIcon icon={faTwitch} />
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="https://www.youtube.com/@sm64romhacks28" role="button">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="https://twitter.com/sm64romhacks" role="button">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="https://ko-fi.com/marvjungs" role="button">
              <FontAwesomeIcon icon={faPaypal} />
            </a>
          </section>
          <hr/>
          <section>
            <div className="row">
              <div className="col">
                <b>Affiliates:</b>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <a href="https://www.smwcentral.net" target="_blank" rel="noreferrer">
                  <img src={smwc} alt="SMW Central"></img>
                </a>
              </div>
              <div className="col">
                <a href="http://www.mfgg.net" target="_blank" rel="noreferrer">
                  <img src={mfgg} alt="Mario Fan Games Galaxy"></img>
                </a>
              </div>
              <div className="col">
                <a href="http://www.superluigibros.com" target="_blank" rel="noreferrer">
                  <img src={luigibros} alt="Super Luigi Bros - Mario & Luigi Mega Fan Site"></img>
                </a>
              </div>
              <div className="col">
                <a href="https://www.youtube.com/user/SimpleFlips" target="_blank" rel="noreferrer">
                  <img src={simpleflips} alt="SimpleFlips"></img>
                </a>
              </div>
              <div className="col">
                <a href="http://smmdb.ddns.net" target="_blank" rel="noreferrer">
                  <img src={smmdb} alt="Super Mario Maker Database"></img>
                </a>
              </div>
              <div className="col">
                <a href="https://64dd.org" target="_blank" rel="noreferrer">
                  <img src={dd64} alt="64DD"></img>
                </a>
              </div>
              <div className="col">
                <a href="http://kuribo64.net" target="_blank" rel="noreferrer">
                  <img src={kuribo} alt="Kuribo64"></img>
                </a>
              </div>
            </div>
          </section>
        </div>
        <hr/>
        <div className="text-center p-3">
          &copy;<a href="https://sm64romhacks.com/">sm64romhacks.com</a>&nbsp;&#8226;&nbsp;<a href="/tos">Terms Of Service</a>&nbsp;&#8226;&nbsp;<a href="/privacy-policy">Privacy Policy</a><br/>
          2019 - {date.getFullYear().toString()}
        </div>
      </footer>
    );
}
  