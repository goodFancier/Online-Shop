import React, {Component} from 'react'
import {Table, notification, Tabs, Button, Row, Col} from 'antd';
import {getAllUserOrders, getPayUrl, repeatOrder, updateOrder} from "../../util/APIUtils";
import Text from "antd/es/typography/Text";
import './OrderMain.css'
import '../../user/bucket/Bucket.css'
import LoadingPaymentIndicator from "./LoadingPaymentIndicator";

const TabPane = Tabs.TabPane;

class OrderDesc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeOrderList: [],
            closedOrderList: [],
            totalElementsListActive: 0,
            sizeListActive: 0,
            loadingListActive: true,
            totalPagesListActive: 0,
            paginationListActive: 0,
            totalElementsListFinish: 0,
            sizeListFinish: 0,
            loadingListFinish: true,
            totalPagesListFinish: 0,
            paginationListFinish: 0,
        };
        this.initActiveOrderList = this.initActiveOrderList.bind(this);
        this.initClosedOrderList = this.initClosedOrderList.bind(this);
        this.renderedMyOrder = this.renderedMyOrder.bind(this);
        this.handleTableChangeListActive = this.handleTableChangeListActive.bind(this);
        this.handleTableChangeListFinish = this.handleTableChangeListFinish.bind(this);
        this.setStatusDelivered = this.setStatusDelivered.bind(this);
    }

    componentDidMount() {
        this.initActiveOrderList();
        this.initClosedOrderList();
    };

    initClosedOrderList = (params = {}) => {
        console.log('pageOrder', params);
        const paginationListFinish = {...this.state.paginationListFinish};
        this.setState({loadingListActive: true});
        let promise;
        promise = getAllUserOrders(params.page - 1, params.size, params.sortField, params.sortOrder, false);
        promise.then(data => {
            paginationListFinish.total = data.totalElements;
            this.setState({
                loadingListFinish: false,
                orderListFinish: data.content,
                totalElementsListFinish: data.totalElements,
                sizeListFinish: data.size,
                totalPagesListFinish: data.totalPages,
                paginationListFinish,
            });
        }).catch(error => {
            if (error.status === 401) {
                this.setState({loading: false});
                this.props.handleLogout('/login', 'Ошибка!', 'Пожалуйса, авторизуйтесь');
            } else if (error.status === 404) {
                notification.error({
                    message: 'De/Li',
                    description: error.message || 'Ошибка! Страница не найдена, попробуйте снова.'
                });
                this.setState({
                    loadingListFinish: false
                });
            } else {
                this.setState({loadingListFinish: false});
                notification.error({
                    message: 'De/Li',
                    description: error.message || 'Ошибка не известна!'
                });
            }
        });
    };

    initActiveOrderList = (params = {}) => {
        console.log('pageOrder', params);
        const paginationListActive = {...this.state.paginationListActive};
        this.setState({loadingListActive: true});
        let promise;
        promise = getAllUserOrders(params.page - 1, params.size, params.sortField, params.sortOrder, true);
        promise.then(data => {
            paginationListActive.total = data.totalElements;
            this.setState({
                loadingListActive: false,
                orderListActive: data.content,
                totalElementsListActive: data.totalElements,
                sizeListActive: data.size,
                totalPagesListActive: data.totalPages,
                paginationListActive,
            });
        }).catch(error => {
            if (error.status === 401) {
                this.setState({loadingListActive: false});
                this.props.handleLogout('/login', 'Ошибка!', 'Пожалуйса, авторизуйтесь');
            } else if (error.status === 404) {
                notification.error({
                    message: 'De/Li',
                    description: error.message || 'Ошибка! Страница не найдена, попробуйте снова.'
                });
                this.setState({
                    loadingListActive: false
                });
            } else {
                this.setState({loadingListActive: false});
                notification.error({
                    message: 'De/Li',
                    description: error.message || 'Ошибка не известна!'
                });
            }
        });

    };

    redirectToCataloguePage(event, retailerId) {
        event.preventDefault();
        this.props.history.push(`/catalogue/${retailerId}`);
    }

    renderedMyOrder(boolean, data, pagination, loading) {
        const columns = [
            {
                dataIndex: 'createdAt',
                width: '20%',
                className: "order-table-header"
            },
            {
                dataIndex: 'id',
                width: '10%',
                className: "order-table-header",
                render: (text, record) =>
                    <span> №{record.id}</span>
                ,
            },
            {
                dataIndex: 'retailerName',
                render: (text, record) =>
                    <a onClick={(e) => this.redirectToCataloguePage(e, record.retailer)}
                       className="order-table-header"> {record.retailerName}</a>
                ,
                width: '20%',
            },
            {
                dataIndex: 'totalSum',
                width: '10%',
                render: (text, record) =>
                    <span>{Number(record.totalSum) + Number(record.deliveryPrice)}₽</span>
                ,
                className: "order-table-header"
            },
            {
                dataIndex: 'status',
                width: '15%',
            },
            {
                width: '20%',
                render: (text, record) => <div>{
                    record.status === 'Ожидает оплаты' ?
                        <Button disabled={this.isPayBtnDisabled(record)} onClick={() => this.makePayment(record)} className="order-pay-btn">Оплатить</Button> :
                        record.status === 'Ожидает подтверждения' ?
                            <Button onClick={() => this.setStatusDelivered(record)} className="order-pay-btn">Подтвердить получение</Button> : null
                    // renderPayBtn(this, record)
                }</div>
            }
        ];
        const columnGood = [
            {
                dataIndex: 'name',
                width: '34%',
            },
            {
                dataIndex: 'quantity',
                width: '7%',
            },
            {
                title: '',
                dataIndex: 'price',
                render: (text, record) =>
                    <span>{record.price}₽</span>
                ,
                width: '12%',
            },
            {
                width: '25%'
            }
        ];
        return (
            <div className="ModalBody_root">
                {data != 0 ?
                    boolean ?
                        <Table className="order-table-body"
                               showHeader={false}
                               columns={columns}
                               rowKey={record => record.id}
                               dataSource={data}
                               expandedRowRender={record =>
                                   <div className="order-table-expanded-body">
                                       <Table
                                           showHeader={false}
                                           columns={columnGood}
                                           rowKey={record1 => record1.goodId}
                                           dataSource={record.goodList}
                                           pagination={false}
                                       />
                                       <Row className="order-table-delivery-price" type="flex" justify="space-between">
                                           <Col lg={12}>Стоимость доставки:</Col>
                                           <Col lg={11}>{record.deliveryPrice}₽</Col>
                                       </Row>
                                       {record.carNumber !== null && record.carNumber.length > 4 ?
                                           <Row className="order-table-delivery-price">
                                               <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoFull">
                                                   Машина: {record.carColor + " " + record.carMark + " " + (record.carModel !== null ? record.carModel + " " : "") + record.carNumber}
                                               </div>
                                               <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoFull">
                                                   ФИО: {record.nameDriver}
                                               </div>
                                               <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoFull">
                                                   Тел: {record.phoneDriver}
                                               </div>
                                           </Row>
                                           : null
                                       }
                                   </div>
                               }
                               pagination={this.state.totalPagesListActive > 1 ? pagination : false}
                               loading={loading}
                               onChange={this.handleTableChangeListActive}
                        />
                        :
                        <Table
                            showHeader={false} className="order-table-body"
                            columns={columns}
                            rowKey={record => record.id}
                            dataSource={data}
                            expandedRowRender={record =>
                                <div>
                                    <Table className="expanded-table"
                                           showHeader={false}
                                           columns={columnGood}
                                           rowKey={record1 => record1.goodId}
                                           dataSource={record.goodList}
                                           pagination={false}
                                    />
                                    {record.carNumber !== null && record.carNumber.length > 4 ?
                                        <Row className="order-table-delivery-price">
                                            <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoFull">
                                                Машина: {record.carColor + " " + record.carMark + " " + (record.carModel !== null ? record.carModel + " " : "") + record.carNumber}
                                            </div>
                                            <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoFull">
                                                ФИО: {record.nameDriver}
                                            </div>
                                            <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoFull">
                                                Тел: {record.phoneDriver}
                                            </div>
                                        </Row>
                                        : null
                                    }
                                    <div className="repeat-order-button-label">
                                        <button type="button" onClick={(e) => this.repeatOrder(e, record.goodList)}
                                                className="repeat-order-btn MobileUIButton_root MobileSingleOrderModal_interactionButtonRoot MobileUIButton_primary">
                                                          <span
                                                              className="MobileUIButton_content MobileSingleOrderModal_interactionButtonContent">Повторить</span>
                                        </button>
                                    </div>
                                </div>
                            }
                            pagination={this.state.totalPagesListFinish > 1 ? pagination : false}
                            loading={loading}
                            onChange={this.handleTableChangeListFinish}
                        />
                    :
                    <Text type="secondary">Здесь будут ваши заказы.</Text>
                }
            </div>
        )
    }

    repeatOrder(event, goodList) {
        event.preventDefault();
        repeatOrder(goodList).then(() => {
            this.redirectToPurchaseConstructorPage();
        }).catch(() => {
            notification.warn({
                message: 'De/Li',
                description: 'Некоторых товаров из вашего заказа уже нет в магазине!'
            });
            this.redirectToPurchaseConstructorPage();
        });
    }

    redirectToPurchaseConstructorPage() {
        this.props.history.push(`/purchaseConstructor`)
    }

    redirectToPaymentPage(payUrl) {
        window.location.replace(payUrl);
        this.setState({
            isLoading: false
        });
    }

    makePayment(item) {
        this.setState({
            isLoading: true
        });
        getPayUrl(item).then(record => {
            this.redirectToPaymentPage(record.object.payUrl);
            this.setState({
                isLoading: false
            });
        }).catch((record) => {
            notification.error({
                message: 'De/Li',
                description: record.message
            });
            this.setState({
                isLoading: false
            });
        });

    }

    handleTableChangeListActive = (pagination, filters, sorter) => {
        const pager = {...this.state.paginationListActive};
        pager.current = pagination.current;
        pager.total = pagination.total;
        this.setState({
            pagination: pager,
        });
        this.initActiveOrderList({
            results: pagination.pageSize,
            size: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    handleTableChangeListFinish = (pagination, filters, sorter) => {
        const pager = {...this.state.paginationListActive};
        pager.current = pagination.current;
        pager.total = pagination.total;
        this.setState({
            pagination: pager,
        });
        this.initClosedOrderList({
            results: pagination.pageSize,
            size: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    isPayBtnDisabled(record) {
        let updateTime = new Date(record.updatedAt);
        return record.paymentNumber != null && updateTime.setHours(updateTime.getHours(), updateTime.getMinutes() + 5, 0, 0) > new Date();
    }

    setStatusDelivered(item) {
        item.status = 'Доставлен';
        updateOrder(item).then(item => {
            notification.success({
                message: 'De/Li',
                description: item.message,
            });
            this.initActiveOrderList();
            this.initClosedOrderList();
            // window.location.reload();
        }).catch(reason => {
            notification.error({
                message: 'De/Li',
                description: reason.message,
            })
        })
    }

    render() {

        const tabBarStyle = {
            textAlign: 'center'
        };
        const renderListAction = this.renderedMyOrder(true, this.state.orderListActive, this.state.paginationListActive, this.state.loadingListActive);
        const renderListFinish = this.renderedMyOrder(false, this.state.orderListFinish, this.state.paginationListFinish, this.state.loadingListFinish);
        if (this.state.isLoading) {
            return <div>
                <LoadingPaymentIndicator className="onloading-panel"/>
                <Tabs defaultActiveKey="1"
                      animated={false}
                      tabBarStyle={tabBarStyle}
                      size="large"
                      className="onloading-tabs">
                    <TabPane tab={`Активные`} key="1">
                        {renderListAction}
                    </TabPane>
                    <TabPane tab={`История`} key="2">
                        {renderListFinish}
                    </TabPane>
                </Tabs>
            </div>
        } else
            return (
                <div>
                    <Tabs defaultActiveKey="1"
                          animated={false}
                          tabBarStyle={tabBarStyle}
                          size="large"
                          className="">
                        <TabPane tab={`Активные`} key="1">
                            {renderListAction}
                        </TabPane>
                        <TabPane tab={`История`} key="2">
                            {renderListFinish}
                        </TabPane>
                    </Tabs>
                </div>
            );
    }
}

function renderPayBtn(obj, record) {
    let payButton;
    if (record.status === 'Ожидает оплаты') {
        payButton = <Button disabled={obj.isPayBtnDisabled(record)} className="order-pay-btn" onClick={(e) => obj.makePayment(e, record)}>Оплатить</Button>;
    } else if (record.status === 'Ожидает подтверждения') {
        payButton = <Button onClick={(e) => obj.setStatusDelivered(e, record)} className="order-pay-btn">Подтвердить получение</Button>;
    } else {
        payButton = null;
    }
    return (
        payButton
    );
}

export default OrderDesc;