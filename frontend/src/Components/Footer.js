import React from "react";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-info"></div>
      <div className="social">
        <p
          style={{ cursor: "pointer" }}
          onClick={() =>
            window.open("https://www.linkedin.com/in/kamlesh-mehta-70b431130/")
          }
          className="social-logo"
        >
          <FaLinkedin />
        </p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => window.open("https://github.com/Kamleshmehta1")}
          className="social-logo"
        >
          <AiFillGithub />
        </p>
        <p style={{ cursor: "pointer" }} className="social-logo">
          <AiOutlineMail />
        </p>
      </div>
      <p style={{ textAlign: "center" }}>Kamlesh Mehta</p>
    </div>
  );
}

export default Footer;
