import React from "react";
import {Container} from "semantic-ui-react";

class CustomLayout extends React.Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}



export default CustomLayout;
