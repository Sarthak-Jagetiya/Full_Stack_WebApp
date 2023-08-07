import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Dance.css";
import { IoSearch } from "react-icons/io5";

function Dance() {
  const [danceForm, setDanceForm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("relevance");
  const [filterTags, setFilterTags] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSearch(searchTerm);
  };

  const renderIcons = (iconsCount) => {
    const iconsArray = Array.from(Array(iconsCount).keys());

    return iconsArray.map((index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 dance_icon"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dance");
        setDanceForm(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const sortedDanceForms = [...danceForm];
    if (sortOrder === "rating") {
      sortedDanceForms.sort((a, b) => b.Rating - a.Rating);
    } else if (sortOrder === "stateName") {
      sortedDanceForms.sort((a, b) =>
        a.state.State_Name.localeCompare(b.state.State_Name)
      );
    } else {
      sortedDanceForms.sort((a, b) => a.Dance_ID - b.Dance_ID);
    }
    setDanceForm(sortedDanceForms);
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
              Sort by:
            </label>
            <select
              className="sort-select"
              id="sort-by"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating</option>
              <option value="stateName">State Name</option>
            </select>
          </div>
          <div className="sort-container">
            <label className="sort-label" htmlFor="filter-tags">
              Filter by Tags:
            </label>
            <select
              className="sort-select"
              id="filter-tags"
              value={filterTags}
              onChange={(e) => setFilterTags(e.target.value)}
            >
              <option value="all">All</option>
              <option value="classical">Classical</option>
              <option value="folk">Folk</option>
              <option value="circular">Circular</option>
              <option value="expressions">Expressions</option>
              <option value="mythological">Mythological</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container_art">
        {danceForm
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
          .map((danceForm) => (
            <div key={danceForm.Dance_ID} className="post dance_post">
              <div className="header_post">
                <img
                  className="post_img post_img_dance"
                  src={require(`./../img/Dance_Images/${danceForm.Dance_Images}.jpg`)}
                  alt=""
                />
              </div>

              <div className="body_post dance_body">
                <div className="post_content post_content_dance">
                  <div className="content">
                    <div className="content_box ">
                      <h1 className="content_heading content_heading_dance">
                        {danceForm.Dance_Form}
                      </h1>

                      <div className="content_like">
                        {renderIcons(danceForm.Rating)}
                      </div>
                    </div>

                    <p className="content_desc content_desc_dance">
                      {danceForm.Description}
                    </p>
                  </div>

                  <div className="container_infos container_infos_dance">
                    <div className="postedBy postedBy_dance">
                      <span>state</span>
                      <div className="state_name state_name_dance">
                        {danceForm.state.State_Name}
                      </div>
                    </div>

                    <div className="container_tags container_tags_dance">
                      <span>tags</span>
                      <div className="tags tags_dance">
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
  );
}

export default Dance;
