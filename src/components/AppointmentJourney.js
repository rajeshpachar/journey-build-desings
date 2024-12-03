import React, { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "reactflow";
import { Card, Space, Typography, Tag, Button, Tooltip } from "antd";
import {
  MailOutlined,
  BranchesOutlined,
  PhoneOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  BellOutlined,
  RetweetOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "reactflow/dist/style.css";

const { Text } = Typography;

const NODE_TYPES = {
  START: "start",
  EMAIL: "email",
  SMS: "sms",
  CONDITION: "condition",
  DELAY: "delay",
  APPOINTMENT: "appointment",
  NOTIFICATION: "notification",
  RETRY: "retry",
  END: "end",
};

// Custom Node Component
const CustomNode = ({ data }) => {
  const getNodeStyle = () => {
    const baseStyle = {
      padding: 0,
      borderRadius: "8px",
      border: "none",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      width: 280,
    };

    const colorMap = {
      [NODE_TYPES.START]: { border: "#52c41a", background: "#f6ffed" },
      [NODE_TYPES.EMAIL]: { border: "#1890ff", background: "#e6f7ff" },
      [NODE_TYPES.SMS]: { border: "#722ed1", background: "#f9f0ff" },
      [NODE_TYPES.CONDITION]: { border: "#faad14", background: "#fff7e6" },
      [NODE_TYPES.DELAY]: { border: "#13c2c2", background: "#e6fffb" },
      [NODE_TYPES.APPOINTMENT]: { border: "#eb2f96", background: "#fff0f6" },
      [NODE_TYPES.NOTIFICATION]: { border: "#1890ff", background: "#e6f7ff" },
      [NODE_TYPES.RETRY]: { border: "#fa541c", background: "#fff2e8" },
      [NODE_TYPES.END]: { border: "#f5222d", background: "#fff1f0" },
    };

    const colors = colorMap[data.type] || {
      border: "#d9d9d9",
      background: "#ffffff",
    };

    return {
      ...baseStyle,
      borderLeft: `4px solid ${colors.border}`,
      background: colors.background,
    };
  };

  const getIcon = () => {
    const iconMap = {
      [NODE_TYPES.START]: <CheckCircleOutlined />,
      [NODE_TYPES.EMAIL]: <MailOutlined />,
      [NODE_TYPES.SMS]: <MessageOutlined />,
      [NODE_TYPES.CONDITION]: <BranchesOutlined />,
      [NODE_TYPES.DELAY]: <ClockCircleOutlined />,
      [NODE_TYPES.APPOINTMENT]: <CalendarOutlined />,
      [NODE_TYPES.NOTIFICATION]: <BellOutlined />,
      [NODE_TYPES.RETRY]: <RetweetOutlined />,
      [NODE_TYPES.END]: <CloseCircleOutlined />,
    };
    return iconMap[data.type] || <UserOutlined />;
  };

  return (
    <Card style={getNodeStyle()} bodyStyle={{ padding: "12px" }}>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Space justify="space-between" style={{ width: "100%" }}>
          <Tag
            icon={getIcon()}
            color={
              data.type === NODE_TYPES.CONDITION ? "warning" : "processing"
            }
          >
            {data.type.toUpperCase()}
          </Tag>
          {data.retryCount && (
            <Tooltip title="Retry attempts">
              <Tag color="orange">{`Retry: ${data.retryCount}x`}</Tag>
            </Tooltip>
          )}
        </Space>
        <Text strong>{data.label}</Text>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          {data.description}
        </Text>
        {data.metrics && (
          <Space wrap>
            {Object.entries(data.metrics).map(([key, value]) => (
              <Tag key={key} color="blue">{`${key}: ${value}`}</Tag>
            ))}
          </Space>
        )}
      </Space>
    </Card>
  );
};

// Generate appointment booking journey with retry paths
const generateAppointmentJourney = () => {
  const nodes = [
    // Initial Request
    {
      id: "1",
      type: "custom",
      position: { x: 250, y: 0 },
      data: {
        type: NODE_TYPES.START,
        label: "Appointment Request",
        description: "Customer initiates booking request",
      },
    },
    // Send Booking Link
    {
      id: "2",
      type: "custom",
      position: { x: 250, y: 100 },
      data: {
        type: NODE_TYPES.EMAIL,
        label: "Send Booking Link",
        description: "Email with calendar slots",
        metrics: { sent: "99%" },
      },
    },
    // Check Link Opened
    {
      id: "3",
      type: "custom",
      position: { x: 250, y: 200 },
      data: {
        type: NODE_TYPES.CONDITION,
        label: "Link Opened?",
        description: "Check within 24h",
      },
    },
    // Reminder SMS
    {
      id: "4",
      type: "custom",
      position: { x: 0, y: 300 },
      data: {
        type: NODE_TYPES.SMS,
        label: "Send Reminder SMS",
        description: "Reminder to book appointment",
        retryCount: 2,
      },
    },
    // Booking Started
    {
      id: "5",
      type: "custom",
      position: { x: 250, y: 300 },
      data: {
        type: NODE_TYPES.APPOINTMENT,
        label: "Booking Process",
        description: "User selecting time slot",
      },
    },
    // Slot Available Check
    {
      id: "6",
      type: "custom",
      position: { x: 250, y: 400 },
      data: {
        type: NODE_TYPES.CONDITION,
        label: "Slot Available?",
        description: "Check slot availability",
      },
    },
    // Alternative Slots
    {
      id: "7",
      type: "custom",
      position: { x: 0, y: 500 },
      data: {
        type: NODE_TYPES.EMAIL,
        label: "Suggest Alternatives",
        description: "Send alternative time slots",
      },
    },
    // Confirmation
    {
      id: "8",
      type: "custom",
      position: { x: 250, y: 500 },
      data: {
        type: NODE_TYPES.EMAIL,
        label: "Send Confirmation",
        description: "Appointment confirmation email",
      },
    },
    // Add to Calendar
    {
      id: "9",
      type: "custom",
      position: { x: 250, y: 600 },
      data: {
        type: NODE_TYPES.NOTIFICATION,
        label: "Calendar Invite",
        description: "Send calendar invitation",
      },
    },
    // Reminder Sequence
    {
      id: "10",
      type: "custom",
      position: { x: 500, y: 600 },
      data: {
        type: NODE_TYPES.DELAY,
        label: "24h Before",
        description: "Wait until 24h before appointment",
      },
    },
    // Reminder Email
    {
      id: "11",
      type: "custom",
      position: { x: 500, y: 700 },
      data: {
        type: NODE_TYPES.EMAIL,
        label: "Reminder Email",
        description: "24h reminder email",
      },
    },
    // Final Check
    {
      id: "12",
      type: "custom",
      position: { x: 250, y: 700 },
      data: {
        type: NODE_TYPES.END,
        label: "Appointment Ready",
        description: "Booking process completed",
      },
    },
  ];

  const edges = [
    // Main Flow
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-5", source: "3", target: "5", label: "Yes" },
    { id: "e3-4", source: "3", target: "4", label: "No" },
    { id: "e4-5", source: "4", target: "5", animated: true },
    { id: "e5-6", source: "5", target: "6" },
    { id: "e6-8", source: "6", target: "8", label: "Yes" },
    { id: "e6-7", source: "6", target: "7", label: "No" },
    { id: "e7-5", source: "7", target: "5", type: "step", animated: true },
    { id: "e8-9", source: "8", target: "9" },
    { id: "e9-10", source: "9", target: "10" },
    { id: "e10-11", source: "10", target: "11" },
    { id: "e11-12", source: "11", target: "12" },
    { id: "e9-12", source: "9", target: "12" },
  ];

  return { nodes, edges };
};

const AppointmentJourneyBuilder = () => {
  const journey = generateAppointmentJourney();
  const [nodes, setNodes, onNodesChange] = useNodesState(journey.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(journey.edges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ custom: CustomNode }}
        fitView
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
        <Panel position="top-left">
          <Card title="Appointment Booking Journey" style={{ width: 300 }}>
            <Text type="secondary">
              Complete booking flow with retry paths and reminders
            </Text>
          </Card>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default AppointmentJourneyBuilder;
