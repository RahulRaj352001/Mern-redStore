import React from "react";
import appStore from "../../../images/app-store.png";
import playStore from "../../../images/play-store.png";
import "./footer.css"
export default function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download app for IOS and Android mobile phone</p>
        <img src={appStore} alt="AppStore" />
        <img src={playStore} alt="PlayStore" />
      </div>
      <div className="midFooter">
        <h4>REDSTORE.</h4>
        <p>High Quality is our first Priority</p>
        <p>Copyright 2021 &copy; MeRahulRajput</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com/RahulRaj352001">Instagram</a>
        <a href="https://github.com/RahulRaj352001">Youtube</a>
        <a href="https://github.com/RahulRaj352001">Github</a>
      </div>
    </footer>
  );
}
