import React from 'react';
import { Container } from 'react-bootstrap';
import InventoryContainsProductTableWrapper from './tableWrappers/InventoryContainsProductTableWrapper';
import ProductTableWrapper from './tableWrappers/ProductTableWrapper';

function MainView() {
    return (
        <Container>
            <InventoryContainsProductTableWrapper />
            <ProductTableWrapper />
        </Container>
    )
}

export default MainView;