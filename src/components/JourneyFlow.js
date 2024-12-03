import React, { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { Layout, Card, Button, Space, Typography, Tag } from "antd";
import {
  MailOutlined,
  BranchesOutlined,
  PhoneOutlined,
  MessageOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "reactflow/dist/style.css";

const { Sider, Content } = Layout;
const { Title } = Typography;

// Custom Node Styles
const nodeStyles = {
  padding: 0,
  borderRadius: "8px",
  border: "none",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  width: 280,
};

const NodeTypes = {
  EMAIL: "email",
  CONDITION: "condition",
  MESSAGE: "message",
  CALL: "call",
};

// Custom Node Component
const CustomNode = ({ data }) => {
  const getNodeColor = () => {
    switch (data.type) {
      case NodeTypes.EMAIL:
        return { borderColor: "#1890ff", background: "#e6f7ff" };
      case NodeTypes.CONDITION:
        return { borderColor: "#faad14", background: "#fff7e6" };
      case NodeTypes.MESSAGE:
        return { borderColor: "#722ed1", background: "#f9f0ff" };
      case NodeTypes.CALL:
        return { borderColor: "#52c41a", background: "#f6ffed" };
      default:
        return { borderColor: "#d9d9d9", background: "#ffffff" };
    }
  };

  const getNodeIcon = () => {
    switch (data.type) {
      case NodeTypes.EMAIL:
        return <MailOutlined />;
      case NodeTypes.CONDITION:
        return <BranchesOutlined />;
      case NodeTypes.MESSAGE:
        return <MessageOutlined />;
      case NodeTypes.CALL:
        return <PhoneOutlined />;
      default:
        return null;
    }
  };

  const colors = getNodeColor();

  return (
    <Card
      style={{
        ...nodeStyles,
        borderLeft: `4px solid ${colors.borderColor}`,
        background: colors.background,
      }}
      bodyStyle={{ padding: "12px" }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Space justify="space-between" style={{ width: "100%" }}>
          <Tag
            icon={getNodeIcon()}
            color={data.type === NodeTypes.CONDITION ? "warning" : "processing"}
          >
            {data.type.toUpperCase()}
          </Tag>
          <Button type="text" icon={<PlusOutlined />} size="small" />
        </Space>
        <Title level={5} style={{ margin: "8px 0" }}>
          {data.label}
        </Title>
        <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
          {data.description}
        </Typography.Paragraph>
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

// Initial nodes and edges
const initialNodes = [
  {
    id: "1",
    position: { x: 250, y: 0 },
    data: {
      label: "Welcome Email",
      type: NodeTypes.EMAIL,
      description: "Send initial welcome message",
      metrics: { delivered: "98%", opened: "45%" },
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 250, y: 150 },
    data: {
      label: "Email Opened?",
      type: NodeTypes.CONDITION,
      description: "Check if welcome email was opened",
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 0, y: 300 },
    data: {
      label: "Follow-up SMS",
      type: NodeTypes.MESSAGE,
      description: "Send reminder message",
      metrics: { sent: "92%" },
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 500, y: 300 },
    data: {
      label: "Sales Call",
      type: NodeTypes.CALL,
      description: "Schedule a sales call",
      metrics: { scheduled: "78%" },
    },
    type: "custom",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", label: "No" },
  { id: "e2-4", source: "2", target: "4", label: "Yes" },
];

const nodeTypes = {
  custom: CustomNode,
};

const JourneyFlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={250} theme="light" style={{ padding: "16px" }}>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Title level={4}>Journey Nodes</Title>
          {Object.values(NodeTypes).map((type) => (
            <Card
              key={type}
              size="small"
              draggable
              style={{ cursor: "move", marginBottom: "8px" }}
            >
              <Space>
                {type === NodeTypes.EMAIL && <MailOutlined />}
                {type === NodeTypes.CONDITION && <BranchesOutlined />}
                {type === NodeTypes.MESSAGE && <MessageOutlined />}
                {type === NodeTypes.CALL && <PhoneOutlined />}
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </Space>
            </Card>
          ))}
        </Space>
      </Sider>
      <Content>
        <div style={{ width: "100%", height: "100%" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </Content>
    </Layout>
  );
};

export default JourneyFlowBuilder;
