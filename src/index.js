// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "antd";
import JourneyBuilder from "./components/Journey";
import JourneyFlowBuilder from "./components/JourneyFlow";
import AppointmentJourneyBuilder from "./components/AppointmentJourney";

import "./styles.scss";

const { Header, Sider, Content, Footer } = Layout;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isCollapsed: false,
    };
  }

  render() {
    return <AppointmentJourneyBuilder />;
  }
}

// Create root for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
