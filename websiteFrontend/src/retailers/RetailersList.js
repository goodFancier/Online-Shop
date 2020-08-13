import React, {Component} from 'react';
import {getAllCity, getAllRetailers} from "../util/APIUtils";
import {notification, Pagination, List, Card, Select} from "antd";
import "./RetailersList.css"

const Option = Select.Option;
const {Meta} = Card;

class RetailersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalElements: 0,
            size: 0,
            loading: true,
            totalPages: 0,
            pagination: 0,
            city: '',
            cityList:[]
        };
        this.redirectToCataloguePage = this.redirectToCataloguePage.bind(this);
        this.handlePaginatorChange = this.handlePaginatorChange.bind(this);
        this.fetch = this.fetch.bind(this);
        this.fetchCity = this.fetchCity.bind(this);
        this.handlerCityChange = this.handlerCityChange.bind(this);

    }

    componentDidMount() {
        this.fetchCity();
        if (this.props.currentUser)
            this.fetch({city: this.props.currentUser.city});
        else
            this.fetch();
    }

    redirectToCataloguePage(event, retailerId) {
        event.preventDefault();
        this.props.history.push(`/catalogue/${retailerId}`);
    }

    fetch = (params = {}) => {
        console.log('pageRetailers', params);
        const pagination = {...this.state.pagination};
        this.setState({loading: true});
        let promise;
        promise = getAllRetailers(params.page - 1, params.size, params.sortField, params.sortOrder, params.city);
        promise.then(data => {
            pagination.total = data.totalElements;
            this.setState({
                city: params.city ?
                    params.city : this.state.city ?
                        this.state.city : this.state.cityList[0],
                loading: false,
                data: data.content,
                totalElements: data.totalElements,
                size: data.size,
                totalPages: data.totalPages,
                pagination,
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
                    loading: false
                });
            } else {
                this.setState({loading: false});
                notification.error({
                    message: 'De/Li˙',
                    description: error.message || 'Ошибка не известна!'
                });
            }
        });
    };

    fetchCity() {
        getAllCity().then(response =>
        {
            this.setState({
                cityList : response,
            })
        })
    }

    handlePaginatorChange = (page) => {
        const pager = {...this.state.pagination};
        pager.current = page;
        pager.total = this.state.totalPages;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: this.state.size,
            size: this.state.size,
            city: this.state.city,
            page: page,
        });
    };

    handlerCityChange(event) {
        this.fetch({
            city: event
        })
    }

    render() {
        return (
            <div>
                <Select className="retailer-city-select"
                    disabled={false}
                    size="large"
                    placeholder="Введите ваш город."
                    value={this.state.city}
                    onChange={this.handlerCityChange}>
                    {this.state.cityList.map((city) =>
                        <Option key={city}>{city}</Option>
                    )}
                </Select>
                <List className="catalogue-good-list retailer-list"
                      loading={this.state.loading}
                      grid={{
                          gutter: 1, xs: 1,
                          sm: 1,
                          md: 2,
                          lg: 2,
                          xl: 3,
                          xxl: 4,
                      }}
                      dataSource={this.state.data}
                      renderItem={item => (
                          <List.Item
                              key={item.id}
                          >
                              <Card hoverable
                                    cover={
                                        <div className="b-retailer__logo b-retailer__logo_loaded_true" align="center">
                                            <img alt="Logo" align="center"
                                                 src={item.imageUrl}
                                                 className="b-image__root"/>
                                        </div>
                                    }
                                    onClick={(e) => this.redirectToCataloguePage(e, item.id)}
                                    style={{width: 300, height: 320}}
                              >
                                  <Meta title={item.name}
                                        description=""/>
                              </Card>
                          </List.Item>
                      )}
                />
                {
                    this.state.totalPages > 1 ? <Pagination
                        defaultCurrent={1}
                        total={this.state.totalElements}
                        onChange={this.handlePaginatorChange}/> : null
                }

            </div>

        );
    }
}

export default RetailersList;