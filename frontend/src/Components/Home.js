import "./Home.css";
import { useState, useEffect } from "react";
import image from "./images/1.jpg";
import Accordian from "./Accordian";
import Footer from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const [random, setRandomNumber] = useState(0);

  const navigate = useNavigate();
  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
    return images;
  };

  const images = importAll(
    require.context("./images", false, /\.(png|jpe?g|svg)$/)
  );
  const length = Object.keys(images).length;
  let location = useLocation();

  useEffect(() => {
    let randomNumber = Math.random() * length;
    setRandomNumber(Number(Math.floor(randomNumber)));
  }, [location, length]);

  return (
    <div className="main-container">
      <div
        className="banner-container"
        style={{
          backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${
            images[random.toString() + ".jpg"] || image
          })`,
        }}
      >
        <h1 className="main-title">Blogg App</h1>
        <button className="login-button" onClick={() => navigate("/auth")}>
          LOG IN
        </button>
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/auth")}
          className="title-article"
        >
          Hello, I am Kamlesh Mehta <br />
          Welcome to my Blogg Page !⭐⭐
        </h1>
      </div>
      <div className="card-container">
        <div className="child-card img-border">
          <div className="img1-container img-border">
            <h1 className="title-blogs">FOOD VLOGS</h1>
          </div>
        </div>
        <div className="child-card img-border">
          <div className="img2-container img-border">
            <h1 className="title-blogs">TRAVEL VLOGS</h1>
          </div>
        </div>
        <div className="child-card img-border">
          <div className="img3-container img-border">
            <h1 className="title-blogs">WILDLIFE VLOGS</h1>
          </div>
        </div>
      </div>
      <Accordian />
      <Footer />
    </div>
  );
}

export default Home;
