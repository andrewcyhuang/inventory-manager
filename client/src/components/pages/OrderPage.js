import React from 'react';
import OrderTable from '../tableViews/OrderTable';
import OrderHasProductTable from '../tableViews/OrderHasProductTable';
import Container from 'react-bootstrap/Container';

const OrderPage = () => {
    return (
        <Container>
            <OrderTable/>
            <OrderHasProductTable/>
        </Container>
    );
};

export default OrderPage;