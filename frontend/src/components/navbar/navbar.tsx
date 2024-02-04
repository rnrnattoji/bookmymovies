import "./navbar.scss";


const Navbar = () => {
    return (
      <>
        <div className="parent-navbar">
            <div className="inner-navbar">
                <img src="logo.png" alt="Logo" className="logo" />
                <input type="text" placeholder="Search For Movies" className="search" />
                <select className="dropdown">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>
                <button className="signin-btn">Sign In</button>
            </div>
        </div>
      </>
    );
  };
  
  export default Navbar;