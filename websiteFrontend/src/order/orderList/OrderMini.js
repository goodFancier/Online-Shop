import React, {Component} from 'react'
import {notification, Tabs, List, Menu, Table, Pagination, Button} from 'antd';
import {getAllUserOrders, getPayUrl, repeatOrder, updateOrder} from "../../util/APIUtils";
import Text from "antd/es/typography/Text";
import './OrderMain.css'
import '../../user/bucket/Bucket.css'
import LoadingPaymentIndicator from "./LoadingPaymentIndicator";

const TabPane = Tabs.TabPane;
const {SubMenu} = Menu;

class OrderMini extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderListActive: [],
            orderListFinish: [],
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
        this.orderListActive = this.orderListActive.bind(this);
        this.orderListFinish = this.orderListFinish.bind(this);
        this.renderedMyOrder = this.renderedMyOrder.bind(this);
        this.handleTableChangeListActive = this.handleTableChangeListActive.bind(this);
        this.handleTableChangeListFinish = this.handleTableChangeListFinish.bind(this);
    }

    componentDidMount() {
        this.orderListActive();
        this.orderListFinish();
    };

    orderListFinish = (params = {}) => {
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

    orderListActive = (params = {}) => {
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

    setStatusDelivered(event, item) {
        event.preventDefault();
        item.status = 'Доставлен';
        updateOrder(item).then(item => {
                this.orderListActive();
                this.orderListFinish();
                notification.success({
                    message: 'De/Li',
                    description: item.message,
                })
            }
        ).catch(reason => {
            notification.error({
                message: 'De/Li',
                description: item.message,
            })
        })
    }

    renderedMyOrder(boolean, date, pagination) {
        return (
            <div className="MobileUIFullScreenModalBody_root">
                {date != 0 ?

                    boolean ?
                        <div>
                            <List className="MobileUIFullScreenModalBody_visible"
                                  dataSource={date}
                                  renderItem={item => (
                                      <List.Item
                                          key={item.id}
                                          className="MobileSingleOrderModal_order"
                                      >
                                          <Menu
                                              onClick={this.handleClick}
                                              mode="inline">
                                              <SubMenu
                                                  key="sub1"
                                                  title={
                                                      <div>
                                                          <div className="MobileSingleOrderModal_mainInfo">
                                                              <div
                                                                  className="MobileSingleOrderModal_name"><strong> {item.retailerName} </strong></div>
                                                              <div className="MobileSingleOrderModal_priceWrapper">
                                                                  <div
                                                                      className="MobileSingleOrderModal_price">{Number(item.totalSum) + Number(item.deliveryPrice)}₽&nbsp;
                                                                  </div>
                                                              </div>
                                                          </div>

                                                          <div
                                                              className="MobileSingleOrderModal_dateNStatus">{item.createdAt}
                                                              <span
                                                                  className="MobileSingleOrderModal_status"> — {item.status}</span>
                                                          </div>
                                                      </div>
                                                  }
                                              >
                                                  <div id="listGoods" className="MobileUIFullScreenModalBody_visible">
                                                      <List
                                                          className="MobileSingleOrderModal_menuItems"
                                                          dataSource={item.goodList}
                                                          renderItem={good => (
                                                              <List.Item
                                                                  key={good.recID}
                                                                  className="MobileSingleOrderModal_menuItemsBody"
                                                              >
                                                                  <div className="MobileSingleOrderModal_menuItemInfo">
                                                                      <div>{good.name}</div>
                                                                      <div
                                                                          className="MobileSingleOrderModal_menuItemCount">{good.quantity}&nbsp;×&nbsp;</div>
                                                                      <div>{good.price}&nbsp;₽</div>
                                                                  </div>
                                                              </List.Item>
                                                          )}
                                                      />
                                                      <div>
                                                          <ul>
                                                              <li>
                                                                  <div className="MobileSingleOrderModal_menuItemInfo_lineNormal">
                                                                      <div>Стоимость доставки</div>
                                                                      <div
                                                                          className="MobileSingleOrderModal_menuItemCount">{item.deliveryPrice}&nbsp;₽
                                                                      </div>
                                                                  </div>
                                                              </li>
                                                              {item.carNumber !== null && item.carNumber.length > 4 ?
                                                                  <li>
                                                                      <div id="driveInfo" className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModel_menuItemInfo_DriveInfo">
                                                                          Водитель
                                                                      </div>
                                                                      <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoMini">
                                                                          Машина: {item.carColor + " " + item.carMark + " " + (item.carModel !== null ? item.carModel + " " : "") + item.carNumber}
                                                                      </div>
                                                                      <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoMini">
                                                                          ФИО: {item.nameDriver}
                                                                      </div>
                                                                      <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoMini">
                                                                          Тел: {item.phoneDriver}
                                                                      </div>
                                                                  </li>
                                                                  : null
                                                              }
                                                          </ul>
                                                      </div>
                                                  </div>
                                              </SubMenu>
                                          </Menu>
                                          {item.status === 'Ожидает оплаты' ?
                                              <Button disabled={this.isPayBtnDisabled(item)} onClick={(e) => this.makePayment(e, item)} className="order-pay-btn-mini">Оплатить</Button> :
                                              item.status === 'Ожидает подтверждения' ?
                                                  <Button onClick={(e) => this.setStatusDelivered(e, item)} className="order-pay-btn-mini">Подтвердить получение</Button> : null}
                                      </List.Item>

                                  )}
                            />
                            <Pagination
                                defaultCurrent={1}
                                total={pagination.total}
                                onChange={this.handleTableChangeListActive}/>
                        </div>
                        :
                        <div>
                            <List className="MobileUIFullScreenModalBody_visible"
                                  dataSource={date}
                                  renderItem={item => (
                                      <List.Item
                                          key={item.id}
                                          className="MobileSingleOrderModal_order"
                                      >
                                          <Menu
                                              onClick={this.handleClick}
                                              mode="inline">
                                              <SubMenu
                                                  key="sub1"
                                                  title={
                                                      <div>
                                                          <div className="MobileSingleOrderModal_mainInfo">
                                                              <div
                                                                  className="MobileSingleOrderModal_name"><strong> {item.retailerName} </strong></div>
                                                              <div className="MobileSingleOrderModal_priceWrapper">
                                                                  <div
                                                                      className="MobileSingleOrderModal_price">{Number(item.totalSum) + Number(item.deliveryPrice)}₽&nbsp;
                                                                  </div>
                                                              </div>
                                                          </div>

                                                          <div
                                                              className="MobileSingleOrderModal_dateNStatus">{item.createdAt}
                                                              <span
                                                                  className="MobileSingleOrderModal_status"> — {item.status}</span>
                                                          </div>
                                                      </div>
                                                  }
                                              >
                                                  <div id="listGoods" className="MobileUIFullScreenModalBody_visible">
                                                      <List
                                                          className="MobileSingleOrderModal_menuItems"
                                                          dataSource={item.goodList}
                                                          renderItem={good => (
                                                              <List.Item
                                                                  key={good.recID}
                                                                  className="MobileSingleOrderModal_menuItemsBody"
                                                              >
                                                                  <div className="MobileSingleOrderModal_menuItemInfo">
                                                                      <div>{good.name}</div>
                                                                      <div
                                                                          className="MobileSingleOrderModal_menuItemCount">{good.quantity}&nbsp;×&nbsp;</div>
                                                                      <div>{good.price}&nbsp;₽</div>
                                                                  </div>
                                                              </List.Item>
                                                          )}
                                                      />
                                                      <div>
                                                          <ul>
                                                              <li>
                                                                  <div className="MobileSingleOrderModal_menuItemInfo_lineNormal">
                                                                      <div>Стоимость доставки</div>
                                                                      <div
                                                                          className="MobileSingleOrderModal_menuItemCount">{item.deliveryPrice}&nbsp;₽
                                                                      </div>
                                                                  </div>
                                                              </li>
                                                              {item.carNumber !== null && item.carNumber.length > 4 ?
                                                                  <li>
                                                                      <div id="driveInfo" className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModel_menuItemInfo_DriveInfo">
                                                                          Водитель
                                                                      </div>
                                                                      <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoMini">
                                                                          Машина: {item.carColor + " " + item.carMark + " " + (item.carModel !== null ? item.carModel + " " : "") + item.carNumber}
                                                                      </div>
                                                                      <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoMini">
                                                                          ФИО: {item.nameDriver}
                                                                      </div>
                                                                      <div className="MobileSingleOrderModal_menuItemInfo_lineNormal MobileSingleOrderModal_menuItemInfo_driveCarInfoMini">
                                                                          Тел: {item.phoneDriver}
                                                                      </div>
                                                                  </li>
                                                                  : null
                                                              }
                                                          </ul>
                                                      </div>
                                                      <button type="button" onClick={(e) => this.repeatOrder(e, item.goodList)}
                                                              className="MobileUIButton_root MobileSingleOrderModal_interactionButtonRoot MobileUIButton_primary">
                                                                  <span
                                                                      className="MobileUIButton_content MobileSingleOrderModal_interactionButtonContent">Повторить</span>
                                                      </button>
                                                  </div>
                                              </SubMenu>
                                          </Menu>
                                      </List.Item>
                                  )}
                            />
                            <Pagination
                                defaultCurrent={1}
                                total={pagination.total}
                                onChange={this.handleTableChangeListFinish}/>
                        </div>
                    :
                    <Text type="secondary">Здесть будут ваши заказы.</Text>
                }
            </div>
        )
    }

    redirectToPaymentPage(payUrl) {
        window.location.replace(payUrl);
        this.setState({
            isLoading: false
        });
    }

    makePayment(event, item) {
        event.preventDefault();
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

    handleTableChangeListActive = (page) => {
        const pager = {...this.state.paginationListActive};
        pager.current = page;
        pager.total = this.state.total;
        this.setState({
            paginationListActive: pager,
        });
        this.orderListActive({
            results: this.state.sizeListActive,
            size: this.state.sizeListActive,
            page: page,
        });
    };

    handleTableChangeListFinish = (page) => {
        const pager = {...this.state.paginationListFinish};
        pager.current = page;
        pager.total = this.state.total;
        this.setState({
            paginationListFinish: pager,
        });
        this.orderListFinish({
            results: this.state.sizeListFinish,
            size: this.state.sizeListFinish,
            page: page,
        });
    };

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

    isPayBtnDisabled(record) {
        let updateTime = new Date(record.updatedAt);
        return record.paymentNumber != null && updateTime.setHours(updateTime.getHours(), updateTime.getMinutes() + 5, 0, 0) > new Date();
    }

    render() {
        const tabBarStyle = {
            textAlign: 'center'
        };
        const renderListAction = this.renderedMyOrder(true, this.state.orderListActive, this.state.paginationListActive, this.state.loadingListActive);
        const renderListFinish = this.renderedMyOrder(false, this.state.orderListFinish, this.state.paginationListFinish, this.state.loadingListFinish);
        if (this.state.isLoading) {
            return <div>
                <LoadingPaymentIndicator className="onloading-panel-mini"/>
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

export default OrderMini;