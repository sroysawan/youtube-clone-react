import { useLocation } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Search.css";
import { useEffect, useState } from "react";
import CardSearch from "../components/Card/CardSearch";

function SearchPage() {
  const location = useLocation();
  const query = location.state?.query;

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      const data = await fetch(
        `http://localhost:3000/result?search_query=${query}`
      );
      const json = await data.json();
      setSearchResult(json);
      console.log("search", json);
    };
    if (query) {
      fetchSearch();
    }
  }, [query]);

  return (
    <section id="main-layout">
      <Nav></Nav>
      <Sidebar></Sidebar>
      <section id="content">
        <section className="-the-cards-search">
          {searchResult.map((result,index) => (
            <CardSearch key={index} result={result}></CardSearch>
          ))}
        </section>
      </section>
    </section>
  );
}

export default SearchPage;
