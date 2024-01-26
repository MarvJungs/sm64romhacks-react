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
import '../App.css';
import { useState, useEffect } from 'react';
import {setCookie} from '../cookies.js';


export default function Layout() {
    return (
        <div className="container text-white">
          <div className='row justify-content-center'>
            <Header />
            <Outlet />
            <Footer />
          </div>
        </div>
    )
}

function Header() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if(loading) return ("Loading...")
    if(error) return ("Error" + error)

    console.log(user)

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="/">
            <img className="img-responsive d-inline-block align-text-top" src={logo} alt="Logo" width="160" height="90"></img>
          </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/hacks">ROM Hacks</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/megapack">Megapack</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Events
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/events/wsrm2024">WSRM2024</a></li>
                    <li><a className="dropdown-item" href="/events/league2023">League 2023</a></li>
                    <li><a className="dropdown-item" href="/events/ssrm2023">SSRM2023</a></li>
                    <li><a className="dropdown-item" href="/events/wsrm2023">WSRM2023</a></li>
                    <li><a className="dropdown-item" href="/events/league2022">League 2022</a></li>
                    <li><a className="dropdown-item" href="/events/ssrm2022">SSRM2022</a></li>
                    <li><a className="dropdown-item" href="/events/wsrm2022">WSRM2022</a></li>
                    <li><a className="dropdown-item" href="/events/ssrm2021">SSRM2021</a></li>
                    <li><a className="dropdown-item" href="/events/wsrm2021">WSRM2021</a></li>
                    <li><a className="dropdown-item" href="/events/ssrm2020">SSRM2020</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Gameplay Tools
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/codes">Code</a></li>
                    <li><a className="dropdown-item" href="/stardisplay" target='_blank' rel='noreferrer'>Star Display</a></li>
                    <li><a className="dropdown-item" href="/patcher">Online Patcher</a></li>
                    <li><a className="dropdown-item" href="/plugins" target='_blank' rel='noreferrer'>Plugin Guide</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/faq" target='_blank'>FAQ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/streams">Streams</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://discord.sm64romhacks.com" target='_blank' rel='noreferrer'>Discord</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://ko-fi.com/marvjungs" target='_blank' rel='noreferrer'>Support</a>
                </li>
                {
                 !user.logged_in ? (
                    <li className='nav-item'>
                      <a className='nav-link' href="/login">Login</a>
                    </li>
                  ) : (
                    <li className='nav-item dropdown'>
                      <a className='nav-link dropdown-toggle' href="#" role='button' data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={'https://cdn.discordapp.com/avatars/' + user.data.discord_id + "/" + user.data.discord_avatar + ".jpg"} width={16} height={16} />&nbsp;{user.data.discord_username}
                      </a>
                      <ul className='dropdown-menu'>
                        <li>
                          <a className='dropdown-item' href={'/users/' + user.data.discord_id}>
                            Profile
                          </a>
                        </li>
                        <hr/>
                        <li>
                          <a className='dropdown-item' href="/login/logout.php">
                            Logout
                          </a>
                        </li>
                        <li>
                          <a className='dropdown-item text-danger' href='/login/deleteAccount.php'>
                            Delete Account
                          </a>
                        </li>
                      </ul>
                    </li>
                  )
                }
              </ul>
            </div>
        </nav>
        <hr/>
      </>
    );
}

function Footer() {
    const date = new Date();
    return (
      <footer className="text-center text-white">
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
          {date.getFullYear().toString()}
        </div>
      </footer>
    );
}
  