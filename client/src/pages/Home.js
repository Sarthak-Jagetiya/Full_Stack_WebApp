import React, { useEffect, useState } from "react";
import axios from "axios"; // import axios from "axios";
// import { useEffect, useState } from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  fastFoodOutline,
  timeOutline,
  locationOutline,
  iceCreamOutline,
  mailOutline,
  leafOutline,
  logoInstagram,
  logoTwitter,
  logoWhatsapp,
  flameOutline,
  logoLinkedin,
} from "ionicons/icons";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";

function Home() {
  const [artForms, setArtForms] = useState([]);
  const [foods, setFoods] = useState([]);
  const [danceForm, setDanceForm] = useState([]);

  const renderIcons = (iconsCount) => {
    const iconsArray = Array.from(Array(iconsCount).keys());

    return iconsArray.map((index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 dance_icon_home"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  function setSymbol(text) {
    if (text === "Vegetarian") {
      return (
        <img
          src={require("./../img/Home_Images/veg.png")}
          alt="vegetarian symbol"
          className="food_icon_type_home"
        ></img>
      );
    } else if (text === "Non-Vegetarian") {
      return (
        <img
          src={require("./../img/Home_Images/nonveg.png")}
          alt="non-vegetarian symbol"
          className="food_icon_type_home"
        ></img>
      );
    }
  }

  function setIcon(text) {
    if (text === "sweet" || text === "mild-sweet") {
      return (
        <IonIcon
          aria-label="icon for sweet"
          icon={iceCreamOutline}
          className="food_icon_home"
        />
      );
    } else if (text === "spicy") {
      return (
        <IonIcon
          aria-label="icon for spicy"
          icon={flameOutline}
          className="food_icon_home"
        />
      );
    } else if (text === "bitter") {
      return (
        <IonIcon
          aria-label="icon for bitter"
          icon={leafOutline}
          className="food_icon_home"
        />
      );
    } else {
      return <div className="neutral_icon food_icon">Ⓝ</div>;
    }
  }

  const handleIconClick = async (artForm) => {
    const updatedArtForms = artForms.map((form) => {
      if (form.Art_Form_ID === artForm.Art_Form_ID) {
        return { ...form, Rating: form.Rating + 1, clicked: true };
      }
      return form;
    });
    setArtForms(updatedArtForms);

    try {
      await axios.patch(
        `http://localhost:3000/api/art/${artForm.Art_Form_ID}`,
        {
          Rating: artForm.Rating + 1,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleIconClick2 = async (artForm) => {
    const updatedArtForms = artForms.map((form) => {
      if (form.Art_Form_ID === artForm.Art_Form_ID) {
        return { ...form, Rating: form.Rating - 1, clicked: false };
      }
      return form;
    });
    setArtForms(updatedArtForms);

    try {
      await axios.patch(
        `http://localhost:3000/api/art/${artForm.Art_Form_ID}`,
        {
          Rating: artForm.Rating - 1,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/art", {
          headers: { "Cache-Control": "public, max-age=86400" }, // Set cache headers for API request
        });
        setArtForms(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAllData1 = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dance", {
          headers: { "Cache-Control": "public, max-age=86400" }, // Set cache headers for API request
        });
        setDanceForm(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAllData2 = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", {
          headers: { "Cache-Control": "public, max-age=86400" }, // Set cache headers for API request
        });
        setFoods(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllData();
    fetchAllData1();
    fetchAllData2();
  }, []);
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/users").then((res) => {
  //     setList(res.data);
  //     // console.log(res.data);
  //   });
  // }, []);
  // console.log(list[0]);
  return (
    <div style={{ margin: 0 }}>
      <div className="home">
        <div className="home-main">
          <div className="main-left">
            <div className="main">
              <h1 className="main-heading">CULTURE & TRADITION OF</h1>
              <h1 className="main-heading-india">INDIA</h1>
              <div className="main-attributes">
                <div className="attribute">
                  <p className="attribute-text">Food</p>
                  <p className="attribute-number">31+ Dishes</p>
                </div>
                <div className="attribute">
                  <p className="attribute-text">Art</p>
                  <p className="attribute-number">50+ Art Forms</p>
                </div>
                <div className="attribute">
                  <p className="attribute-text">Dance Form</p>
                  <p className="attribute-number">9+ Dance Forms</p>
                </div>
                <div className="attribute">
                  <p className="attribute-text">Dilects</p>
                  <p className="attribute-number">398+ Dilects</p>
                </div>
              </div>
            </div>
          </div>
          <div className="main-right">
            <img
              className="main-img"
              rel="preload"
              src={require("./../img/Home_Images/home1.png")}
              alt="main-img"
            ></img>
          </div>
        </div>
        <div className="home-show">
          <div className="show show-language">
            <div className="show-box">
              <div className="show-heading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 show-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                  />
                </svg>
                Languages
              </div>
              <Link to="/language" className="show-btn">
                +Show More
              </Link>
            </div>
            <div className="show-details">
              <div className="detail-box">മലയാളം Malayalam</div>
              <div className="detail-box none">मराठी Marathi</div>
              <div className="detail-box">हिन्दी Hindi</div>
              <div className="detail-box">سنڌي SINDHI</div>
              <div className="detail-box">தமிழ் Tamil</div>
              <div className="detail-box">বাংলা Bengali</div>
              <div className="detail-box">संस्कृतम् Sanskrit</div>
              <div className="detail-box">اُردُو Urdu</div>
              <Link to="/language" className="show-btn">
                <div className="detail-box last-box">Many More....</div>
              </Link>
            </div>
          </div>
          <div className="show show-ArtForms">
            <div className="show-box">
              <div className="show-heading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 show-icon icon2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                Art Forms
              </div>
              <Link to="/art" className="show-btn">
                +Show More
              </Link>
            </div>
            <div className=" container_art2">
              {artForms.slice(0, 3).map((artForm) => (
                <div key={artForm.Art_Form_ID} className="post_home">
                  <div className="header_post">
                    <img
                      className="post_img_home"
                      src={require(`./../img/Art_Form_Images/art_image_${artForm.Art_Form_ID}.jpg`)}
                      alt=""
                    />
                  </div>

                  <div className="body_post">
                    <div className="post_content">
                      <div className="content">
                        <div className="content_box">
                          <h1 className=" content_heading_home">
                            {artForm.Art_Form}
                          </h1>

                          <div
                            className={`content_like content_like_home ${
                              artForm.clicked ? "clicked" : ""
                            }`}
                            onClick={() =>
                              artForm.clicked
                                ? handleIconClick2(artForm)
                                : handleIconClick(artForm)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className={`w-6 h-6 show-icon art_icon art_icon_home ${
                                artForm.clicked ? "clicked" : ""
                              }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                              />
                            </svg>
                            {artForm.Rating}
                          </div>
                        </div>

                        <p className=" content_desc_home">
                          {artForm.Description}
                        </p>
                      </div>

                      <div className="container_infos_home">
                        <div className="postedBy_home">
                          <span className="tag_heading">state</span>
                          <div className="state_name state_name_home">
                            {artForm.state.State_Name}
                          </div>
                        </div>

                        <div className="container_tags_home">
                          <span>tags</span>
                          <div className="tags_home">
                            <ul className="tag">
                              <li>{artForm.Tags.split(",")[0]}</li>
                              <li>{artForm.Tags.split(",")[1]}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="show show-DanceForm">
            <div className="show-box">
              <div className="show-heading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 show-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                  />
                </svg>
                Dance Forms
              </div>
              <Link to="/dance" className="show-btn">
                +Show More
              </Link>
            </div>
            <div className="show-details1">
              <div className="container_art2">
                {danceForm.slice(0, 3).map((danceForm) => (
                  <div
                    key={danceForm.Dance_ID}
                    className="post_home  dance_post_home"
                  >
                    <div className="header_post">
                      <img
                        className="post_img"
                        src={require(`./../img/Dance_Images/${danceForm.Dance_Images}.jpg`)}
                        alt=""
                      />
                    </div>

                    <div className="body_post_home dance_body_home">
                      <div className="post_content_home">
                        <div className="content">
                          <div className="content_box ">
                            <h1 className="content_heading_home2 ">
                              {danceForm.Dance_Form}
                            </h1>

                            <div className="content_like">
                              {renderIcons(danceForm.Rating)}
                            </div>
                          </div>

                          <p className="content_desc_home2">
                            {danceForm.Description}
                          </p>
                          {/* <h3 className="dance_instruments">Instruments</h3>
                    <p className="content_desc">{danceForm.Instruments}</p> */}
                        </div>

                        <div className="container_infos_home">
                          <div className="postedBy">
                            <span>state</span>
                            <div className="state_name_home2">
                              {danceForm.state.State_Name}
                            </div>
                          </div>

                          <div className="container_tags">
                            <span>tags</span>
                            <div className="tags_home">
                              <ul>
                                <li>{danceForm.Tags.split(",")[0]}</li>
                                <li>{danceForm.Tags.split(",")[1]}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="show show-FoodItems">
            <div className="show-box">
              <div className="show-heading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 show-icon icon4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                Food Items
              </div>
              <Link to="/food" className="show-btn">
                +Show More
              </Link>
            </div>
            <div className="show-details1">
              <div className=" food_container_home">
                {foods.slice(2, 4).map((food) => (
                  <div key={food.Food_ID} className="food_card_home">
                    <div className="img_cover">
                      <div className="food_img">
                        <img
                          src={require(`./../img/Home_Images/${food.Images}.jpg`)}
                          alt="Pic of Indian traditional food"
                          className="card_img_home"
                        ></img>
                      </div>
                    </div>
                    <div className=" food_content_home">
                      <div className="content_main_home">
                        <div className="content_heading_food_home">
                          <h1 className="food_heading_home">
                            {food.Food_Name}
                          </h1>
                          <div className="content_logo">
                            {setSymbol(food.Type)}
                          </div>
                        </div>
                        <div>
                          <p className="content_desc_food_home">
                            ({food.Description})
                          </p>
                        </div>
                      </div>
                      <div className="content_left">
                        <div className="ingredient_home flex">
                          <p className="ingredient_heading_home">
                            Ingredients&rarr;
                          </p>
                          <p className="ingredients_home">{food.Ingredients}</p>
                        </div>
                        <div className="food_attributes_home">
                          <div className="time flex">
                            <IonIcon
                              aria-label="icon for time"
                              icon={timeOutline}
                              className="food_icon_home"
                            />
                            <p className="timer">
                              {food.Prepration_time} mins.
                            </p>
                          </div>
                          <div className="course flex pad">
                            <IonIcon
                              aria-label="icon for course"
                              icon={fastFoodOutline}
                              className="food_icon_home"
                            />
                            <p className="course_content capitalize">
                              {" "}
                              {food.Course}
                            </p>
                          </div>
                          <div className="state flex">
                            <IonIcon
                              aria-label="icon for location"
                              icon={locationOutline}
                              className="food_icon_home"
                            />
                            <p className="statename">{food.state.State_Name}</p>
                          </div>
                          <div className="flavor flex pad">
                            {setIcon(food.Flavor)}
                            <p className="flavor_content capitalize">
                              {food.Flavor}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container-footer grid grid--footer">
          <div className="logo-col">
            <a
              className="footer-logo"
              href="https://sarthak-jagetiya-portfolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="logo"
                alt="logo"
                src={require("./../img/Home_Images/image_favicon.webp")}
              />
            </a>

            <ul className="social-links">
              <li>
                <a
                  className="footer-link"
                  aria-label="instagram url of sarthak jagetiya"
                  href="https://www.instagram.com/sarthakjagetiya_10/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IonIcon
                    aria-label="icon for instagram"
                    icon={logoInstagram}
                    className="footer_icon"
                  />
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  aria-label="linkedIn url of sarthak jagetiya"
                  href="https://www.linkedin.com/in/sarthak-jagetiya-247b85232/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IonIcon
                    aria-label="icon for linkedIn"
                    icon={logoLinkedin}
                    className="footer_icon"
                  />
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  aria-label="twitter url of sarthak jagetiya"
                  href="https://twitter.com/JagetiyaSarthak"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IonIcon
                    aria-label="icon for twitter"
                    icon={logoTwitter}
                    className="footer_icon"
                  />
                </a>
              </li>
            </ul>

            <p className="copyright">
              Copyright &copy; 2027 by Jagetiya&co, Inc. All rights reserved.
            </p>
          </div>
          <div className="address-col">
            <p className="footer-heading">Contact Me</p>
            <address className="contacts">
              <p className="contact-info">
                Contact me and let's have a cup of coffee together
              </p>
              <p className="contact">
                <a className="footer-link" href="tel: 8118804019">
                  <IonIcon
                    aria-label="icon for whatsapp"
                    icon={logoWhatsapp}
                    className="footer_icon"
                  />{" "}
                  <span className="footer_mobile">8118804019</span>
                </a>
                <a
                  className="footer-link"
                  href="mailto:sarthakjagetiya1001@gmail.com "
                >
                  <IonIcon
                    aria-label="icon for mail"
                    icon={mailOutline}
                    className="footer_icon"
                  />
                  <span className="footer_mobile footer_mobile2">
                    sarthakjagetiya1001@gmail.com
                  </span>
                </a>
              </p>
            </address>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
