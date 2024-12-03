import React from "react";
import { DatePicker } from "antd";

class Page2 extends React.Component {
  render() {
    const { MonthPicker } = DatePicker;
    return (
      <div>
        <MonthPicker />
      </div>
    );
  }
}

export default Page2;
