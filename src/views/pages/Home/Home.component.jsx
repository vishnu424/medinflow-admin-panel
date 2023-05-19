import React from 'react'
import Layout from 'antd/es/layout'
import Breadcrumb from 'antd/es/breadcrumb'
import Typography from 'antd/es/typography'
const { Title } = Typography
const { Content } = Layout
const Home = () => {
  return (
    <div>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 200 }}>
          <Title level={3} style={{ textAlign: 'center' }}>
            Coming Soon
          </Title>
        </div>
      </Content>
    </div>
  )
}
export default Home
