import React from 'react';
import { GenericTable } from '../common/GenericTable';
import AbstractQuery from '../../common/abstractQuery';
import { Card, Form, Row, Button, Col } from 'react-bootstrap';
import Constants from '../../common/constants';
import { OrderType } from '../../common/enums';
import { constructArrayCommaSeparated } from '../../common/utils';

class OrderTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = { data: [], form:{ 
            id: 0, inventory_id: 0, type: OrderType.DEFAULT, employee_id: 0, customer_name: '',
            customer_email: '', customer_address: '', customer_payment_type: '', reason: '', products: ''
            }
        };
        this.queryHelper = null;
    }

    async componentDidMount() {
        this.queryHelper = new AbstractQuery(Constants.orderPrefix);
        await this.updateData();
    }

    render() {
        return (
            <div>
                <Row>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <h2>Order Table</h2>
                </div>
                </Row>
                <Row>
                    <Col>
                    <Card>
                        <div style={{ width: '80%', margin: '0 auto', paddingTop: '5px', paddingBottom: '10px'}}>
                            <Card.Title>Select order type view</Card.Title>
                            <Button variant='primary' type='submit' onClick={e => this.handleSetOrderTypeView(e, OrderType.PURCHASE)} style={{marginRight: '10px'}}>Purchase Order View</Button>
                            <Button variant='primary' type='submit' onClick={e => this.handleSetOrderTypeView(e, OrderType.RETURN)} style={{marginRight: '10px'}}>Return Order View</Button>
                            <Button variant='primary' type='submit' onClick={e => this.handleSetOrderTypeView(e, OrderType.RESTOCK)} style={{}}>Restock Order View</Button>
                        </div>
                    </Card>
                    </Col>
                </Row>
                <br/>
                <Card>
                    <div style={{ width: '80%', margin: '0 auto', paddingTop: '5px', paddingBottom: '10px'}}>
                        <Card.Title>Submit an order</Card.Title>
                        <Row>
                            <Col>
                                <Form.Group controlId='inventory_id'>
                                    <small className="form-text text-muted">Enter a valid inventory id.</small>
                                    <Form.Control
                                            name='inventory_id'
                                            text='Insert a valid inventory id'
                                            value={this.state.form.inventory_id}
                                            placeholder='Insert an inventory id'
                                            onChange={this.handleInputChange.bind(this)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='employee_id'>
                                    <small className="form-text text-muted">Enter a valid employee id.</small>
                                    <Form.Control
                                            name='employee_id'
                                            value={this.state.form.employee_id}
                                            placeholder='Insert a numeric employee id'
                                            onChange={this.handleInputChange.bind(this)}/>
                                    </Form.Group>
                            </Col>
                        </Row>
                        { 
                            (this.state.form.type === OrderType.PURCHASE || this.state.form.type === OrderType.RETURN) ?
                                (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId='customer_name'>
                                                    <small className="form-text text-muted">Enter the customers name.</small>
                                                    <Form.Control
                                                            name='customer_name'
                                                            value={this.state.form.customer_name}
                                                            placeholder='Enter customer name'
                                                            onChange={this.handleInputChange.bind(this)}/>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId='customer_email'>
                                                    <small className="form-text text-muted">Enter the customers email.</small>
                                                    <Form.Control
                                                            name='customer_email'
                                                            value={this.state.form.customer_email}
                                                            placeholder='Enter customer email'
                                                            onChange={this.handleInputChange.bind(this)}/>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="formGridState">
                                                    <small className="form-text text-muted">Select payment type.</small>
                                                    <Form.Control name='customer_payment_type' as="select" defaultValue='' onChange={this.handleInputChange.bind(this)}>
                                                        <option>visa</option>
                                                        <option>mastercard</option>
                                                        <option>debit</option>
                                                        <option>cash</option>
                                                        <option>paypal</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId='customer_address'>
                                                    <small className="form-text text-muted">Enter the customers address.</small>
                                                    <Form.Control
                                                            name='customer_address'
                                                            value={this.state.form.customer_address}
                                                            placeholder='Enter customer address'
                                                            onChange={this.handleInputChange.bind(this)}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        {
                                                (this.state.form.type === OrderType.RETURN) ? (
                                                    <Row>
                                                        <Col>
                                                            <Form.Group controlId='reason'>
                                                                <small className="form-text text-muted">Enter customers return reason.</small>
                                                                <Form.Control
                                                                        name='reason'
                                                                        value={this.state.form.reason}
                                                                        placeholder='Enter reason for customer return'
                                                                        onChange={this.handleInputChange.bind(this)}/>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                ) : null
                                            }
                                    </React.Fragment>
                                )
                            : null
                        }
                        <Row>
                            <Col>
                                <Form.Group controlId='products'>
                                    <small className="form-text text-muted">Enter a list of product skus separated by a comma.</small>
                                    <Form.Control
                                            name='products'
                                            value={this.state.form.products}
                                            placeholder='Enter a comma separated list of product skus (e.g.: 1a2b3c3d5e, 7a2b8c3d9e, ...)'
                                            onChange={this.handleInputChange.bind(this)}/>
                                    </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmitOrder.bind(this)}>
                                    <Button variant='primary' type='submit'>
                                        Submit new order
                                    </Button>
                                    <small className="form-text text-muted">Requires all visible inputs.</small>
                                </Form>
                            </Col>
                            <Col>
                                <Form onSubmit={this.updateData.bind(this)}>
                                    <Button variant='primary' type='submit'>
                                        Refresh Table
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Card>
                <br/>
                <Card>
                    <div style={{ width: '80%', margin: '0 auto', paddingTop: '5px', paddingBottom: '10px'}}>
                        <Card.Title>Delete an order</Card.Title>
                        <Col>
                            <Form.Group controlId='id'>
                                <small className="form-text text-muted">Enter a valid numeric order id.</small>
                                <Form.Control
                                    name='id'
                                    value={this.state.form.id}
                                    placeholder='Insert a numeric order id'
                                    onChange={this.handleInputChange.bind(this)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form onSubmit={this.handleDeleteOrder.bind(this)}>
                                <Button variant='primary' type='submit'>
                                    Delete order
                                </Button>
                            </Form>
                        </Col>
                    </div>
                </Card>
                <br/>
                <Row>
                    <Col>
                        <Button variant='primary' type='submit' onClick={e => this.handleGetOrderCounts(e, this.state.form.type)}>Click to get count of the currently selected order type.</Button>
                    </Col>
                </Row>
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

    async handleInputChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({form: {...this.state.form, [fieldName]: fieldValue}});
    }

    async handleSubmitOrder(event) {
        event.preventDefault();
        let { products, ...order } = this.state.form;
        try {
            products = constructArrayCommaSeparated(products);
            const body = {
                order,
                products
            };
            await this.queryHelper.post(body);
        } catch (e) {
            console.log(`Error occurred submitting form. ${e}`);
            this.resetFormFields();
        }
    }

    async handleDeleteOrder(event) {
        event.preventDefault();
        let { id } = this.state.form;
        try {
            await this.queryHelper.delete(id);
        } catch (e) {
            console.log(`Error occurred submitting form. ${e}`);
            this.resetFormFields();
        }
    }

    async handleGetOrderCounts(event, type) {
        event.preventDefault();
        const orderType = this.state.form.type === OrderType.DEFAULT ? OrderType.PURCHASE : type;
        try {
            const res = await this.queryHelper.getAll(Constants.countPrefix + `/${orderType}`);
            if (res && res.data) {
                this.setState({data: res.data});
            }
        } catch (e) {
                console.log(`Error occurred submitting form. ${e}`);
        }
    }

    async handleSetOrderTypeView(event, type) {
        event.preventDefault();
        this.setState({form: {...this.state.form, type}});
    }

    resetFormFields() {
        this.setState({form: {...this.state.form, 
            id: 0, inventory_id: 0, type: OrderType.DEFAULT, employee_id: 0, customer_name: '',
            customer_email: '', customer_address: '', customer_payment_type: '', reason: '', products: ''
        }});
    };
}

export default OrderTable;