import React from 'react';
import OrderTableWrapper from './tableWrappers/OrderTable';
import Container from 'react-bootstrap/Container';

const OrderView = () => {
    return (
        <Container>
            <OrderTableWrapper />
        </Container>
    );
};

export default OrderView;