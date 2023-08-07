import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Art.css";
import { IoSearch } from "react-icons/io5";

// Art Form
function Art() {
  const [artForms, setArtForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("relevance");
  const [filterTags, setFilterTags] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSearch(searchTerm);
  };

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
        const response = await axios.get("http://localhost:3000/api/art");
        setArtForms(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const sortedArtForms = [...artForms];
    if (sortOrder === "likes") {
      sortedArtForms.sort((a, b) => b.Rating - a.Rating);
    } else if (sortOrder === "stateName") {
      sortedArtForms.sort((a, b) =>
        a.state.State_Name.localeCompare(b.state.State_Name)
      );
    } else {
      sortedArtForms.sort((a, b) => a.Art_Form_ID - b.Art_Form_ID);
    }
    setArtForms(sortedArtForms);
  }, [sortOrder]);

  return (
    <div className="star">
      <div className="search">
        <form className="search-container" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for any State"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <IoSearch size=" 1.5rem" />
        </form>

        <div className="manuplate">
          <div className="sort-container">
            <label className="sort-label" htmlFor="sort-by">
              Sort:
            </label>
            <select
              className="sort-select"
              id="sort-by"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="likes">Likes</option>
              <option value="stateName">State Name</option>
            </select>
          </div>
          <div className="sort-container">
            <label className="sort-label" htmlFor="filter-tags">
              Filter:
            </label>
            <select
              className="sort-select"
              id="filter-tags"
              value={filterTags}
              onChange={(e) => setFilterTags(e.target.value)}
            >
              <option value="all">All</option>
              <option value="mythology">Mythology</option>
              <option value="patterns">Patterns</option>
              <option value="traditional">Traditional</option>
              <option value="folk">Folk</option>
              <option value="hindu">Hindu</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container_art">
        {artForms
          .filter((item) => {
            return (
              filterTags === "all" ||
              item.Tags.toLowerCase().split(", ").includes(filterTags)
            );
          })
          .filter((item) => {
            return searchTerm.toLowerCase() === ""
              ? item
              : item.state.State_Name.toLowerCase().includes(searchTerm);
          })
          .map((artForm) => (
            <div key={artForm.Art_Form_ID} className="post">
              <div className="header_post">
                <img
                  className="post_img"
                  rel="preload"
                  src={require(`./../img/Art_Form_Images/art_image_${artForm.Art_Form_ID}.jpg`)}
                  alt=""
                />
              </div>

              <div className="body_post">
                <div className="post_content">
                  <div className="content">
                    <div className="content_box">
                      <h1 className="content_heading">{artForm.Art_Form}</h1>

                      <div
                        className={`content_like ${
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
                          className={`w-6 h-6 show-icon art_icon ${
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

                    <p className="content_desc">{artForm.Description}</p>
                  </div>

                  <div className="container_infos">
                    <div className="postedBy">
                      <span>state</span>
                      <div className="state_name">
                        {artForm.state.State_Name}
                      </div>
                    </div>

                    <div className="container_tags">
                      <span>tags</span>
                      <div className="tags">
                        <ul>
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
  );
}

export default Art;
