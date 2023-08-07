import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/language.css";
import { IoSearch } from "react-icons/io5";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function Languages() {
  const [languages, setLanguages] = useState([]);
  const [topLanguages, setTopLanguages] = useState([]);
  const [leastLanguages, setLeastLanguages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterItem, setFilterItem] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [languagesPerPage] = useState(10);
  const [paginationRange, setPaginationRange] = useState([]);
  const [filteredLanguages, setFilteredLanguages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function setNameColor(type) {
    if (type === "Most_Spoken") {
      return "#5ec576";
    } else if (type === "Vulnerable") {
      return "#f9cc1a";
    } else {
      return "#ff585f";
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/languages");
        setLanguages(response.data.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/languages/toplanguage?top=10"
        );
        setTopLanguages(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/languages/leastlanguage?least=10"
        );
        setLeastLanguages(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const filtered =
      filterItem === "all"
        ? languages
        : filterItem === "top10"
        ? topLanguages
        : leastLanguages;

    const filteredAndSearched = filtered.filter((item) => {
      return searchTerm === ""
        ? true
        : item.state.State_Name.toLowerCase().includes(searchTerm);
    });

    setFilteredLanguages(filteredAndSearched);
    setCurrentPage(1);
  }, [languages, topLanguages, leastLanguages, filterItem, searchTerm]);

  useEffect(() => {
    const range = [];
    const totalFilteredPages = Math.ceil(
      filteredLanguages.length / languagesPerPage
    );
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
  }, [currentPage, filteredLanguages, languagesPerPage]);

  // Get current foods
  const indexOfLastFood = currentPage * languagesPerPage;
  const indexOfFirstFood = indexOfLastFood - languagesPerPage;
  const currentLanguages = filteredLanguages.slice(
    indexOfFirstFood,
    indexOfLastFood
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(filteredLanguages.length / languagesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container">
      <div className="search">
        <form className="search-container" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for any State"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <IoSearch size="1.5rem" />
        </form>

        <div className="sort-container">
          <label className="sort-label" htmlFor="sort-by">
            Filter:
          </label>
          <select
            className="sort-select"
            id="sort-by"
            onChange={(e) => setFilterItem(e.target.value.toLowerCase())}
          >
            <option value="all">All</option>
            <option value="top10">Top 10</option>
            <option value="least10">Least 10</option>
          </select>
        </div>
      </div>
      <div className="language-list">
        {currentLanguages.length === 0 ? (
          <div className="nodata">
            <h2>No Data Found!</h2>
            <p>(try changing filters or state name)</p>
          </div>
        ) : (
          currentLanguages.map((language) => (
            <div key={language.Language_ID} className="lang-box">
              <div
                className="box-name"
                style={{ backgroundColor: setNameColor(language.Type) }}
              >
                <div className="name">
                  <h2 className="name-main">
                    {language.Language_Name.toUpperCase()}
                  </h2>
                  ({language.Percentage}%)
                </div>
                <p className="name-type">
                  ({language.Type.split("_").join(" ")})
                </p>
              </div>
              <div className="box-attributes">
                <div className="attribute1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 attribute-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <p>Spoken in {language.state.State_Name}</p>
                </div>
                <div className="attribute1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 attribute-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                  Spoken By {language.Speakers} people
                </div>
              </div>
              <div className="box-desc">{language.Description}</div>
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
          <AiOutlineArrowLeft />
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
            currentPage ===
            Math.ceil(filteredLanguages.length / languagesPerPage)
          }
          onClick={goToNextPage}
        >
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Languages;
