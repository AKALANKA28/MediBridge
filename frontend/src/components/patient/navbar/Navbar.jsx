import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../../context/drakModeContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authContext"; // Adjust the import as needed

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { auth } = useContext(AuthContext); // Get auth context
  const [userInfo, setUserInfo] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.userId && auth.token) { // Ensure userId and token are available
        try {
          const response = await axios.get(`/api/user/get/${auth.userId}`, {
            headers: {
              Authorization: `Bearer ${auth.token}` // Attach the token manually
            }
          });
          setUserInfo(response.data); // Set user info in state
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data");
        } finally {
          setLoading(false); // Set loading to false after the API call
        }
      } else {
        setError("User not authenticated");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth.userId, auth.token]); // Fetch user data when userId or token changes

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
        
          <div className="item">
            {loading ? (
              <img
                src="https://via.placeholder.com/150" // Placeholder image while loading
                alt="Loading..."
                className="avatar"
              />
            ) : error ? (
              <span>{error}</span> // Show error message
            ) : (
              <img
                src={userInfo.imgUrl || "https://via.placeholder.com/150"} // Use avatar URL from userInfo
                alt="User Avatar"
                className="avatar"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
