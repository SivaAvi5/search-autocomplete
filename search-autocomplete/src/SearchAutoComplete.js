import React, { useEffect, useState } from "react";
import Suggestions from "./Suggestions";
import "./style.css";
const SearchAutoComplete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchListofUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        console.log(data);
        setUsers(data.users.map((userItem) => userItem.firstName));
        setLoading(false);
        setError(null);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetchListofUsers();
  }, []);
  console.log(users);

  const handleChage = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowUsers(true);
    } else {
      setShowUsers(false);
    }
  };

  const handleClick = (e) => {
    setShowUsers(false);
    setSearchParam(e.target.innerText);
  };

  console.log(filteredUsers);

  return (
    <div className="wrapper">
      <div className="search-autocomplete-container">
        <input
          name="searc-user"
          placeholder="search user here.."
          value={searchParam}
          onChange={(e) => handleChage(e)}
        />
        <div>
        {showUsers && (
          <Suggestions handleClick={handleClick} data={filteredUsers} />
        )}
        </div>
      </div>
    </div>
  );
};

export default SearchAutoComplete;
