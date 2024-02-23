import { useEffect, useState } from "react";
import Suggestions from "./suggestions";

const SearchAutoComplete = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchParam, setSearchParam] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearchUsers = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchParam(query);

        if (query.length > 1) {
            const filteredData = users && users.length ?
                users.filter(item => item.toLowerCase().indexOf(query) > -1)
                : []
            setFilteredUsers(filteredData);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://dummyjson.com/users');
            const data = await response.json();

            if (data && data.users && data.users.length) {
                setUsers(data.users.map(userItem => userItem.firstName));
                setLoading(false);
                setErrorMessage(null);
            };
        } catch (e) {
            setLoading(false);
            setErrorMessage(e.message);
        };
    };

    console.log(users);
    useEffect(() => {
        fetchUsers();
    }, []);

    

    console.log(users, filteredUsers);

    if (errorMessage) {
        return <div>There was an error: {errorMessage}</div>
    };

    return (
        <div className="search-auto-complete-container">
            { loading ? (
              <h3>Loading users. Please wait...</h3>
            ) : (
                    <input
                        value={searchParam}
                        name="search-users"
                        placeholder="Search Users here..."
                        onChange={handleSearchUsers}
                    />

            )}

            {
                showDropdown && <Suggestions data={filteredUsers} />
            }
        </div>
    );
};

export default SearchAutoComplete;