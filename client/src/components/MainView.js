import React from 'react';
import { Container } from 'react-bootstrap';
import InventoryContainsProductTableWrapper from './tableWrappers/InventoryContainsProductTable';
import ProductTableWrapper from './tableWrappers/ProductTable';

const MainView = () => {
    return (
        <Container>
            <InventoryContainsProductTableWrapper />
            <ProductTableWrapper />
        </Container>
    );
};

export default MainView;