import React from 'react';
import { GenericTable } from '../GenericTable';
import AbstractQuery from '../../common/abstractQuery';
import { Card, Form, Row, Button, Col } from 'react-bootstrap';
import Constants from '../../common/constants';
import { priceProcessing } from '../../common/utils';

class InventoryContainsProductTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = { data: [], form:{ id: 0, sku: '', quantity: 0} };
        this.queryHelper = null;
    }

    async componentDidMount() {
        this.queryHelper = new AbstractQuery(Constants.inventoryContainsProductsPrefix);
        await this.updateData();
    }

    render() {
        return (
            <div>
                <Row>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <h2>Inventory Contains Product Table </h2>
                </div>
                </Row>
                <Card>
                <div style={{ paddingLeft: '10px', paddingRight: '10px'}}>
                <Row>
                    <Col>
                        <Form.Group controlId='id'>
                            <small className="form-text text-muted">Enter a valid numeric inventory id.</small>
                            <Form.Control
                                name='id'
                                value={this.state.form.id}
                                placeholder='Insert a numeric inventory id'
                                onChange={this.handleInputChange.bind(this)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='sku'>
                            <small className="form-text text-muted">Enter a valid product sku.</small>
                            <Form.Control
                                    name='sku'
                                    text='Insert a valid product sku'
                                    value={this.state.form.sku}
                                    placeholder='Insert a product sku'
                                    onChange={this.handleInputChange.bind(this)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='quantity'>
                            <small className="form-text text-muted">Enter a valid quantity.</small>
                            <Form.Control
                                    name='quantity'
                                    value={this.state.form.quantity}
                                    placeholder='Insert a numeric quantity'
                                    onChange={this.handleInputChange.bind(this)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleInsertItems.bind(this)}>
                            <Button variant='primary' type='submit'>
                                Add more products to inventory
                            </Button>
                            <small className="form-text text-muted">Requires all 3 inputs.</small>
                        </Form>
                    </Col>
                    <Col>
                        <Form onSubmit={this.handleGetProductLocations.bind(this)}>
                            <Button variant='primary' type='submit'>
                            Get Inventories that stock this product
                            </Button>
                            <small className="form-text text-muted">Only requires sku input.</small>
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

    async handleInsertItems(event) {
        event.preventDefault();
        if (!this.state.form.id || !this.state.form.sku || !this.state.form.quantity) {
            this.resetFormFields();
        } else {
            try {
                const body = {
                    inventory_id: this.state.form.id,
                    sku: this.state.form.sku,
                    quantity: this.state.form.quantity,
                };
                await this.queryHelper.post(body);
            } catch (e) {
                console.log(`Error occurred submitting form. ${e}`);
            }
        }
    }

    async handleGetProductLocations(event) {
        event.preventDefault();
        const { sku } = this.state.form;
        if (sku) {
            try {
                const res = await this.queryHelper.getById(sku);
                const sanitized = priceProcessing(res.data);
                if (res && res.data) {
                    this.setState({data: sanitized});
                }
            } catch (e) {
                console.log(`Error occurred submitting form. ${e}`);
                this.resetFormFields();
            }
        } else {
            this.resetFormFields();
        }
    }

    resetFormFields() {
        this.setState({form: {...this.state.form, id: 0, sku: '', quantity: 0}});
    };
}

export default InventoryContainsProductTable;