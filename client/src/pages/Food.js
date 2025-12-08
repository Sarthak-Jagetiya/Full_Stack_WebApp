import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Food.css";
import "./css/SkeletonCard.css";
import { IonIcon } from "@ionic/react";
import {
  fastFoodOutline,
  timeOutline,
  locationOutline,
  iceCreamOutline,
  leafOutline,
  searchOutline,
  flameOutline,
  arrowBackOutline,
  arrowForwardOutline,
} from "ionicons/icons";

function Food() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("relevance");
  const [filterCourse, setFilterCourse] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [foodsPerPage] = useState(10);
  const [paginationRange, setPaginationRange] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const backend = "https://languagesbackend.onrender.com";

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function setSymbol(text) {
    if (text === "Vegetarian") {
      return (
        <img
          src={require("./../img/Home_Images/veg.png")}
          alt="vegetarian symbol"
          className="food_icon_type"
        ></img>
      );
    } else if (text === "Non-Vegetarian") {
      return (
        <img
          src={require("./../img/Home_Images/nonveg.png")}
          alt="non-vegetarian symbol"
          className="food_icon_type"
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
          className="food_icon"
        />
      );
    } else if (text === "spicy") {
      return (
        <IonIcon
          aria-label="icon for spicy"
          icon={flameOutline}
          className="food_icon"
        />
      );
    } else if (text === "bitter") {
      return (
        <IonIcon
          aria-label="icon for bitter"
          icon={leafOutline}
          className="food_icon"
        />
      );
    } else {
      return <div className="neutral_icon food_icon">Ⓝ</div>;
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backend}/api/food`);
        setFoods(response.data.data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const sortedFoods = [...foods];
    if (sortOrder === "preparationTime") {
      sortedFoods.sort((a, b) => a.Prepration_time - b.Prepration_time);
    } else if (sortOrder === "stateName") {
      sortedFoods.sort((a, b) =>
        a.state.State_Name.localeCompare(b.state.State_Name)
      );
    } else {
      sortedFoods.sort((a, b) => a.Food_ID - b.Food_ID);
    }
    setFoods(sortedFoods);
  }, [sortOrder]);

  useEffect(() => {
    const filtered = foods.filter((item) => {
      const courseFilter =
        filterCourse === "all" ||
        item.Course.toLowerCase().split(", ").includes(filterCourse) ||
        item.Type === filterCourse;

      const searchTermFilter =
        searchTerm.toLowerCase() === "" ||
        item.state.State_Name.toLowerCase().includes(searchTerm);

      return courseFilter && searchTermFilter;
    });

    setFilteredFoods(filtered);
  }, [filterCourse, searchTerm, foods]);

  useEffect(() => {
    const range = [];
    const totalFilteredPages = Math.ceil(filteredFoods.length / foodsPerPage);
    const totalPages = Math.min(totalFilteredPages, 5);

    let startPage = currentPage - Math.floor(totalPages / 2);
    let endPage = currentPage + Math.floor(totalPages / 2);

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalFilteredPages) {
      startPage -= endPage - totalFilteredPages;
      endPage = totalFilteredPages;
    }

    if (startPage < 1) {
      startPage = 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    setPaginationRange(range);
  }, [currentPage, filteredFoods, foodsPerPage]);

  // Get current foods
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="food_card skeleton-card">
      <div className="img_cover">
        <div className="food_img skeleton-img">
          <div className="skeleton-block skeleton-img-block"></div>
        </div>
      </div>
      <div className="food_content">
        <div className="content_main">
          <div className="content_heading_food">
            <div className="skeleton-block skeleton-title"></div>
            <div className="skeleton-block skeleton-circle"></div>
          </div>
          <div>
            <div className="skeleton-block skeleton-desc"></div>
          </div>
        </div>
        <div className="content_attributes">
          <div className="ingredient flex">
            <div className="skeleton-block skeleton-ing-line"></div>
          </div>
          <div className="food_attributes">
            <div className="time flex">
              <div className="skeleton-block skeleton-icon"></div>
              <div className="skeleton-block skeleton-attr-text"></div>
            </div>
            <div className="course flex margin">
              <div className="skeleton-block skeleton-icon"></div>
              <div className="skeleton-block skeleton-attr-text"></div>
            </div>
            <div className="state flex">
              <div className="skeleton-block skeleton-icon"></div>
              <div className="skeleton-block skeleton-attr-text"></div>
            </div>
            <div className="flavor flex margin">
              <div className="skeleton-block skeleton-icon"></div>
              <div className="skeleton-block skeleton-attr-text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
          <IonIcon
            aria-label="icon for search"
            icon={searchOutline}
            className="food_icon"
          />
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
              <option value="preparationTime">Preparation Time</option>
              <option value="stateName">State Name</option>
            </select>
          </div>
          <div className="sort-container">
            <label className="sort-label" htmlFor="filter-course">
              Filter:
            </label>
            <select
              className="sort-select"
              id="filter-course"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="all">All</option>
              <option value="main course">Main Course</option>
              <option value="snack">Snack</option>
              <option value="dessert">Dessert</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
          </div>
        </div>
      </div>
      <div className="food_container">
        {loading ? (
          <>
            {[...Array(10)].map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        ) : currentFoods.length === 0 ? (
          <div className="nodata">
            <img
              src={require("./../img/no_data_found.jpg")}
              alt="No Data Found"
              className="nodata-img"
            />
          </div>
        ) : (
          currentFoods.map((food) => (
            <div key={food.Food_ID} className="food_card">
              <div className="img_cover">
                <div className="food_img">
                  <img
                    src={require(`./../img/Food_Images2/${food.Images}.jpg`)}
                    loading="lazy"
                    alt="Pic of Indian traditional food"
                    className="card_img"
                  />
                </div>
              </div>
              <div className="food_content">
                <div className="content_main">
                  <div className="content_heading_food">
                    <h1 className="food_heading">{food.Food_Name}</h1>
                    <div className="content_logo">{setSymbol(food.Type)}</div>
                  </div>
                  <div>
                    <p className="content_desc_food">({food.Description})</p>
                  </div>
                </div>
                <div className="content_attributes">
                  <div className="ingredient flex">
                    <p className="ingredient_heading">Ingredients&rarr;</p>
                    <p className="ingredients">{food.Ingredients}</p>
                  </div>
                  <div className="food_attributes">
                    <div className="time flex ">
                      <IonIcon
                        aria-label="icon for time"
                        icon={timeOutline}
                        className="food_icon"
                      />
                      <p className="timer capitalize">
                        {food.Prepration_time} mins.
                      </p>
                    </div>
                    <div className="course flex margin">
                      <IonIcon
                        aria-label="icon for course"
                        icon={fastFoodOutline}
                        className="food_icon"
                      />
                      <p className="course_content capitalize">{food.Course}</p>
                    </div>
                    <div className="state flex ">
                      <IonIcon
                        aria-label="icon for location"
                        icon={locationOutline}
                        className="food_icon"
                      />
                      <p className="statename capitalize">
                        {food.state.State_Name}
                      </p>
                    </div>
                    <div className="flavor flex margin">
                      {setIcon(food.Flavor)}
                      <p className="flavor_content capitalize">{food.Flavor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination-container">
        <button
          aria-label="Go to previous page"
          className="pagination-arrow"
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
        >
          <IonIcon
            aria-label="icon for backward arrow"
            icon={arrowBackOutline}
            className="food_icon"
          />
        </button>
        <ul className="pagination-list">
          {paginationRange.map((page) => (
            <li
              key={page}
              className={`pagination-item ${
                currentPage === page ? "active" : ""
              }`}
            >
              <button
                onClick={() => paginate(page)}
                className={`pagination-link ${
                  page === currentPage ? "active" : ""
                }`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
        <button
          aria-label="Go to next page"
          className="pagination-arrow"
          disabled={
            currentPage === Math.ceil(filteredFoods.length / foodsPerPage)
          }
          onClick={goToNextPage}
        >
          <IonIcon
            aria-label="icon for forward arrow"
            icon={arrowForwardOutline}
            className="food_icon"
          />
        </button>
      </div>
    </div>
  );
}

export default Food;
