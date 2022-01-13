import React from "react";
import { Link } from "react-router-dom";

/**Navigation bar at the top of the page always. It has links to
 * excercise and admin pages.
 */
class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <ul className="navbar">
          <li>
            <Link to="/">Excercises</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
