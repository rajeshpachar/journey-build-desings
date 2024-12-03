import React from "react";
import { Row, Col, Button } from "antd";

class Page1 extends React.Component {
  render() {
    const rowStyle = {
      height: "100%",
      background: "green"
    };

    const colStyle = {
      background: "yellow"
    };

    const divStyle = {
      padding: "10px",
      background: "gray"
    };

    // Creating a div inside Cols may be necessary to see the gutters
    // Total Col span must be less than 24, for the flex settings to work

    return (
      <Row
        style={rowStyle}
        type="flex"
        justify="space-around"
        align="middle"
        gutter={16}
      >
        <Col style={colStyle} span={10}>
          <div style={divStyle}>
            <h2>Column 1</h2>
            <Button type="primary" block>
              Primary Block Button
            </Button>
            <Button.Group>
              <Button type="danger" size="small" icon="search">
                Button Group 1
              </Button>
              <Button type="dashed" size="small" icon="cloud" disabled>
                Button Group 2
              </Button>
            </Button.Group>
            <br />
            <Button loading>Loading</Button>
            <Button shape="round" loading>
              Hello
            </Button>
            <Button type="primary" shape="circle" loading />
          </div>
        </Col>
        <Col style={colStyle} span={10}>
          <div style={divStyle}>
            <h2>Column 2</h2>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Page1;
