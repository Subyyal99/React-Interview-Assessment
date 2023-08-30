import React, { useEffect, useState } from "react";
import "./App.css";
import TableComponent from "./Table";
import CardComponent from "./CardComponent";
// import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import DetailPage from "./DetailPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Listings")
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home list={list} />} />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

function Home({ list }) {
  const [isCardView, setCardView] = useState(false);
  const [hide, setHide] = useState(true);

  const handleViewToggle = () => {
    setCardView(!isCardView);
  };
  return (
    <>
      {hide ? (
        <div className="view-toggle">
          <Form.Check
            type="switch"
            id="custom-switch"
            label={isCardView ? "CARD VIEW" : "TABLE VIEW"}
            checked={isCardView}
            onChange={handleViewToggle}
          />
          <hr />
        </div>
      ) : (
        ""
      )}
      {isCardView ? (
        list.length > 0 ? (
          <CardComponent data={list} />
        ) : (
          <h2>Loading</h2>
        )
      ) : list.length > 0 ? (
        <TableComponent data={list} />
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}

export default App;
