import React, { useState } from 'react';
import { 
  Card, 
  Tree, 
  Button, 
  Tag, 
  Space, 
  Drawer, 
  Typography, 
  Alert, 
  Descriptions,
  Statistic,
  Row,
  Col,
  Layout,
  Menu,
  Divider
} from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
  CheckOutlined,
  CloseOutlined,
  RightOutlined,
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
  DragOutlined,
  DeleteOutlined,
  SettingOutlined,
  BranchesOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Sider, Content } = Layout;

// Node styles
const nodeCardStyle = {
  width: 320,
  marginBottom: 8,
  borderRadius: 6,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const nodeCardSuccessStyle = {
  ...nodeCardStyle,
  borderLeft: '4px solid #52c41a'
};

const nodeCardWarningStyle = {
  ...nodeCardStyle,
  borderLeft: '4px solid #faad14'
};

const nodeCardInfoStyle = {
  ...nodeCardStyle,
  borderLeft: '4px solid #1890ff'
};

const WorkflowNodeCard = ({ node, onViewDetails }) => {
  const getCardStyle = () => {
    switch (node.type) {
      case 'email':
        return nodeCardInfoStyle;
      case 'condition':
        return nodeCardWarningStyle;
      case 'success':
        return nodeCardSuccessStyle;
      default:
        return nodeCardStyle;
    }
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case 'email':
        return <MailOutlined style={{ fontSize: '18px', color: '#1890ff' }} />;
      case 'call':
        return <PhoneOutlined style={{ fontSize: '18px', color: '#52c41a' }} />;
      case 'message':
        return <MessageOutlined style={{ fontSize: '18px', color: '#722ed1' }} />;
      case 'condition':
        return <BranchesOutlined style={{ fontSize: '18px', color: '#faad14' }} />;
      default:
        return null;
    }
  };

  return (
    <Card
      style={getCardStyle()}
      bodyStyle={{ padding: '12px 16px' }}
      actions={[
        <EyeOutlined key="view" onClick={onViewDetails} />,
        <PlusOutlined key="add" />,
        <DeleteOutlined key="delete" />
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }} size={2}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            {getNodeIcon()}
            <Tag color={node.type === 'condition' ? 'warning' : 'processing'}>
              {node.type.toUpperCase()}
            </Tag>
          </Space>
          <DragOutlined style={{ color: '#999' }} />
        </Space>
        <Title level={5} style={{ margin: '8px 0' }}>{node.title}</Title>
        <Paragraph type="secondary" style={{ margin: 0 }}>
          {node.description}
        </Paragraph>
        {node.metrics && (
          <Row gutter={16} style={{ marginTop: 8 }}>
            <Col span={8}>
              <Statistic title="Success" value={node.metrics.success} suffix="%" />
            </Col>
            <Col span={8}>
              <Statistic title="Pending" value={node.metrics.pending} suffix="%" />
            </Col>
            <Col span={8}>
              <Statistic title="Failed" value={node.metrics.failed} suffix="%" />
            </Col>
          </Row>
        )}
      </Space>
    </Card>
  );
};

const NodeDetails = ({ node, visible, onClose }) => {
  if (!node) return null;

  return (
    <Drawer
      title={
        <Space>
          {node.type === 'email' && <MailOutlined />}
          {node.title}
        </Space>
      }
      width={480}
      placement="right"
      onClose={onClose}
      open={visible}
      extra={
        <Space>
          <Button icon={<SettingOutlined />}>Settings</Button>
          <Button type="primary">Save</Button>
        </Space>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Alert
          message="Node Status"
          description="This node is currently active and processing."
          type="info"
          showIcon
        />
        
        <Descriptions title="Configuration" bordered column={1}>
          <Descriptions.Item label="Type">{node.type.toUpperCase()}</Descriptions.Item>
          <Descriptions.Item label="Created">2024-03-01</Descriptions.Item>
          <Descriptions.Item label="Last Modified">2024-03-02</Descriptions.Item>
        </Descriptions>

        <Card title="Performance Metrics">
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="Delivered" value={98.2} suffix="%" />
            </Col>
            <Col span={8}>
              <Statistic title="Opened" value={45.5} suffix="%" />
            </Col>
            <Col span={8}>
              <Statistic title="Clicked" value={12.3} suffix="%" />
            </Col>
          </Row>
        </Card>

        <Card title="Content Details">
          {node.type === 'email' && (
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Template">welcome_email_v1</Descriptions.Item>
              <Descriptions.Item label="Subject">Welcome to Our Platform!</Descriptions.Item>
              <Descriptions.Item label="Sender">notifications@company.com</Descriptions.Item>
            </Descriptions>
          )}
        </Card>
      </Space>
    </Drawer>
  );
};

const JourneyBuilder = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const sampleNodes = [
    {
      type: 'email',
      title: 'Welcome Email',
      description: 'Initial welcome message sent to new users',
      metrics: { success: 95, pending: 3, failed: 2 }
    },
    {
      type: 'condition',
      title: 'Email Opened?',
      description: 'Check if welcome email was opened within 24h'
    },
    {
      type: 'message',
      title: 'SMS Reminder',
      description: 'Send SMS reminder if email not opened',
      metrics: { success: 88, pending: 7, failed: 5 }
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={280} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ padding: '16px' }}>
          <Title level={4}>Journey Nodes</Title>
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.ItemGroup key="g1" title="TRIGGERS">
            <Menu.Item key="1" icon={<MailOutlined />}>Email</Menu.Item>
            <Menu.Item key="2" icon={<MessageOutlined />}>SMS</Menu.Item>
            <Menu.Item key="3" icon={<PhoneOutlined />}>Call</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="LOGIC">
            <Menu.Item key="4" icon={<BranchesOutlined />}>Condition</Menu.Item>
            <Menu.Item key="5" icon={<CheckOutlined />}>Goal</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      
      <Content style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={2}>CRM Journey Builder</Title>
            <Alert
              message="Building: Welcome Journey"
              description="Drag and drop nodes to create your journey flow. Connect nodes to create branches."
              type="info"
              showIcon
            />
          </Space>

          <div style={{ 
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            minHeight: '600px'
          }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {sampleNodes.map((node, index) => (
                <WorkflowNodeCard
                  key={index}
                  node={node}
                  onViewDetails={() => {
                    setSelectedNode(node);
                    setDetailsVisible(true);
                  }}
                />
              ))}
            </Space>
          </div>
        </Space>
      </Content>

      <NodeDetails
        node={selectedNode}
        visible={detailsVisible}
        onClose={() => {
          setDetailsVisible(false);
          setSelectedNode(null);
        }}
      />
    </Layout>
  );
};

export default JourneyBuilder;