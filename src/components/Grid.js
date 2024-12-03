import React from "react";
import { Row, Col } from "antd";

class Grid extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={50}>
          <Col xs={12} sm={6} md={8} lg={12}>
            <div className="gutter-row">COL-1</div>
          </Col>
          <Col xs={12} sm={6} md={8} lg={12}>
            <div className="gutter-row">COL-1</div>
          </Col>
          <Col xs={12} sm={6} md={8} lg={12}>
            <div className="gutter-row">COL-1</div>
          </Col>
          <Col xs={12} sm={6} md={8} lg={12}>
            <div className="gutter-row">COL-1</div>
          </Col>
        </Row>
        {/* <Row gutter={6}>
          <Col className="gutter-row" xs={12} sm={6} md={8} lg={24}>
            COL-5
          </Col>
          <Col className="gutter-row" xs={12} sm={6} md={8} lg={24}>
            COL-6
          </Col>
          <Col className="gutter-row" xs={12} sm={6} md={8} lg={24}>
            COL-7
          </Col>
          <Col className="gutter-row" xs={12} sm={6} md={8} lg={24}>
            COL-8
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default Grid;
