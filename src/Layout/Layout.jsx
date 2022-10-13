import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';

import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;

const LayoutComponent = ({children}) => (
    <Layout className="layout">
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={[]}
            />
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2022 Created by Ant UED</Footer>
    </Layout>
);

export default LayoutComponent;