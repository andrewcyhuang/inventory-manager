import React from 'react';
import { GenericTable } from '../common/GenericTable';
import AbstractQuery from '../../common/abstractQuery';
import Constants from '../../common/constants';
import { Row, Form, Button, Col, Card } from 'react-bootstrap';
import { priceProcessing } from '../../common/utils';

class OrderHasProductTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = { data: [] };
        this.queryHelper = null;
    }

    async componentDidMount() {
        this.queryHelper = new AbstractQuery(Constants.orderHasProductPrefix);
        await this.updateData();
    }

    render() {
        return (
            <div>
                <Row>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <h2>Order Has Product Table</h2>
                    </div>
                </Row>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Row>
                        <Form onSubmit={this.updateData.bind(this)}>
                            <Button variant='primary' type='submit'>
                                Refresh Table
                            </Button>
                        </Form>
                    </Row>
                </div>
                <br/>
                <Card>
                    <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                        <Card.Title>Just for fun</Card.Title>
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleProductInEveryOrder.bind(this)}>
                                    <Button variant='primary' type='submit'>
                                        Get products that are in every order
                                    </Button>
                                </Form>
                            </Col>
                            <Col>
                                <Form onSubmit={this.handleMostProductsOrder.bind(this)}>
                                    <Button variant='primary' type='submit'>
                                        Get orders with the most products
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Card>
                <br/>
                <GenericTable data={this.state.data}/>
            </div>
        )
    }

    async updateData() {
        try {
            const res = await this.queryHelper.getAll();
            if (res && res.data) {
                this.setState({ data: res.data });
            }
        } catch (e) {
            console.log(`Error getting data. ${e}`);
        }
    }

    async handleProductInEveryOrder(event) {
        event.preventDefault();
        try {
            const res = await this.queryHelper.getAll(Constants.productPrefix + `/all`);
            const sanitized = priceProcessing(res.data);
            if (res && res.data) {
                this.setState({ data: sanitized });
            }
        } catch (e) {
            console.log(`Error occurred submitting form. ${e}`);
        }
    }

    async handleMostProductsOrder(event) {
        event.preventDefault();
        try {
            const res = await this.queryHelper.getAll(`/most`);
            if (res && res.data) {
                this.setState({ data: res.data });
            }
        } catch (e) {
            console.log(`Error occurred submitting form. ${e}`);
        }
    }
}

export default OrderHasProductTable;