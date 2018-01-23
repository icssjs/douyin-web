import React from "react";
import reactDom from "react-dom";
import { Layout, Menu, Breadcrumb, Icon, Input, Card, List, Avatar } from 'antd';
import moment from 'moment';
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
import request from "./services/request"
import "../less/common.less"
class App extends React.PureComponent {
    state = {
        list: [],
        loading: false
    }


    handleFormSubmit = (value) => {
        var url = `/aweme/v1/challenge/search/?iid=22960726625&ac=WIFI&os_api=18&app_name=aweme&channel=App%20Store&idfa=16950600-5DA0-427F-BF6F-F4D338D1ADD5&device_platform=iphone&build_number=16807&vid=7DB904FB-C11A-4807-B089-4F2B8722F2B2&openudid=b101e171955c15ff24d0c779a3dd3c38cd4c777e&device_type=iPhone6,2&app_version=1.6.8&device_id=46543614001&version_code=1.6.8&os_version=10.3.3&screen_width=640&aid=1128&cursor=0&count=20&search_source=challenge&keyword=${value}&cp=83f1a75327715276e1&as=a15598e5221f5ab7b7&ts=1515685874`
        const data = request(url)
        console.log(data.then((result) => console.log(result)))

    }
    fetchMore = () => {

    }
    render() {
        const { list, loading } = this.state
        const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
            <div className={styles.listContent}>
                <p className={styles.description}>{content}</p>
                <div className={styles.extra}>
                    <Avatar src={avatar} size="small" /><a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
                    <em>{moment(updatedAt).format('YYYY-MM-DD hh:mm')}</em>
                </div>
            </div>
        );
        const loadMore = list.length > 0 ? (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
                    {loading ? <span><Icon type="loading" /> 加载中...</span> : '加载更多'}
                </Button>
            </div>
        ) : null;


        return (
            <Layout>
                <Header className="header">
                    <div style={{ textAlign: 'center' }}>
                        <Search
                            placeholder="请输入"
                            enterButton="搜索"
                            size="large"
                            onSearch={this.handleFormSubmit}
                            style={{ width: 522 }}
                        />
                    </div>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Card
                        style={{ marginTop: 24 }}
                        bordered={false}
                        bodyStyle={{ padding: '8px 32px 32px 32px' }}
                    >
                        <List
                            size="large"
                            loading={list.length === 0 ? loading : false}
                            rowKey="id"
                            itemLayout="vertical"
                            loadMore={loadMore}
                            dataSource={list}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                    actions={[
                                        <IconText type="star-o" text={item.star} />,
                                        <IconText type="like-o" text={item.like} />,
                                        <IconText type="message" text={item.message} />,
                                    ]}
                                    extra={<div className='listItemExtra' />}
                                >
                                    <List.Item.Meta
                                        title={(
                                            <a className='listItemMetaTitle' href={item.href}>{item.title}</a>
                                        )}
                                        description={
                                            <span>
                                                <Tag>Ant Design</Tag>
                                                <Tag>设计语言</Tag>
                                                <Tag>蚂蚁金服</Tag>
                                            </span>
                                        }
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Content>
            </Layout>
        )
    }
}


reactDom.render(
    <App />
    ,
    document.getElementById('app')
)