import React from "react";

import MenuSidebar from "../componentes/menuSidebar";

class DashBoard extends React.Component {
  state = {
    ID: "",
    PW: "",
  };
  render() {
    return (
      <div className="App">
        <MenuSidebar />
      </div>
    );
  }
}

export default DashBoard;
/* LogIn Page component */
