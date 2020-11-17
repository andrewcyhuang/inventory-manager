import React from 'react';
import { GenericTable } from '../GenericTable';
import AbstractQuery from '../../common/abstractQuery';
import { Form, Row, Button, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import Constants from '../../common/constants';
import { ProductTypes } from '../../common/enums';

class ProductTableWrapper extends React.Component {
    constructor (props) {
        super(props);
        this.state = { data: [], form:{ filter: ProductTypes.ALL, minPrice: 0.00, maxPrice: 123.99 } };
        this.queryHelper = null;
    }

    async componentDidMount() {
        this.queryHelper = new AbstractQuery(Constants.productPrefix);
        await this.getAllProducts();
    }

    render() {
        return (
            <div>
                <Row>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <h2>Product Table</h2>
                    </div>
                </Row>
                <div>
                    <Row>
                        <Col>
                            <Form.Group controlId='id'>
                                <small className="form-text text-muted">Enter a valid min price. (e.g. 0)</small>
                                <Form.Control
                                    name='minPrice'
                                    value={this.state.form.minPrice}
                                    placeholder='Insert a valid min price'
                                    onChange={this.handleInputChange.bind(this)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='sku'>
                                <small className="form-text text-muted">Enter a valid max price. (e.g. 123.99)</small>
                                <Form.Control
                                        name='maxPrice'
                                        text='Insert a valid max price'
                                        value={this.state.form.maxPrice}
                                        placeholder='Insert a product sku'
                                        onChange={this.handleInputChange.bind(this)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div>
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleGetWithinPriceRange.bind(this)}>
                                    <Button variant='primary' type='submit'>
                                        Find products within specified price range.
                                    </Button>
                                    <small className="form-text text-muted">Requires min and max price inputs.</small>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
                <br/>
                <Row>
                    <Col>
                        <Form>
                            <DropdownButton title='Filter'>
                                <Dropdown.Item as='button' onClick={e => this.updateFilter(e, ProductTypes.ALL)}>All Items</Dropdown.Item>
                                <Dropdown.Item as='button' onClick={e => this.updateFilter(e, ProductTypes.DIGITAL)}>Digital Items only</Dropdown.Item>
                                <Dropdown.Item as='button' onClick={e => this.updateFilter(e, ProductTypes.PHYSICAL)}>Physical Items only</Dropdown.Item>
                            </DropdownButton>
                        </Form>
                    </Col>
                </Row>
            <br/>
            <GenericTable data={this.state.data}/>
            </div>
        )
    }

    async getAllProducts() {
        try {
            const res = await this.queryHelper.getAll();
            if (res && res.data) {
                this.updateTable(res.data);
            }
        } catch (e) {
            console.log(`Error getting data. ${e}`);
        }
    }

    async getFilterProducts(prefix) {
        try {
            const res = await this.queryHelper.getAll(prefix);
            if (res && res.data) {
                this.updateTable(res.data);
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

    async handleGetWithinPriceRange(event) {
        event.preventDefault();
        const { minPrice, maxPrice } = this.state.form;
        const bigMin = minPrice * 100;
        const bigMax = maxPrice * 100;
        if (bigMin < bigMax) {
            try {
                const endpoint = Constants.rangePrefix + `/${bigMin}/${bigMax}`;
                console.log(endpoint);
                const res = await this.queryHelper.getAll(endpoint);
                console.log(`${res.data}`);
                if (res && res.data) {
                    this.updateTable(res.data);
                }
            } catch (e) {
                console.log(`Error occurred submitting form. ${e}`);
                this.resetFormFields();
            }
        } else {
            console.log(`Invalid price range. Min: ${minPrice} Max: ${maxPrice}`);
            this.resetFormFields();
        }
    }

    updateTable(data) {
        const sanitized = data.map(p => Object.assign({}, p, {price: (p['price'] / 100).toFixed(2)}));
        this.setState({data: sanitized});
    }

    updateFilter(event, type) {
        event.preventDefault();
        switch (type) {
            case ProductTypes.DIGITAL:
                this.getFilterProducts('/digital');
                break;
            case ProductTypes.PHYSICAL:
                this.getFilterProducts(Constants.physicalPrefix);
                break;
            case ProductTypes.ALL:
            default:
                this.getAllProducts();
                break;
        };
    };

    resetFormFields() {
        this.setState({form: {...this.state.form, id: 0, sku: '', quantity: 0}});
    };
}

export default ProductTableWrapper;