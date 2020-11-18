import React from 'react';
import OrderTableWrapper from './tableWrappers/OrderTable';
import Container from 'react-bootstrap/Container';

const EmployeeView = () => {
    return (
        <Container>
            <OrderTableWrapper />
        </Container>
    );
};

export default EmployeeView;