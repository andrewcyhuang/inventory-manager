import React from 'react';
import { Container } from 'react-bootstrap';
import InventoryContainsProductTable from '../tableViews/InventoryContainsProductTable';
import ProductTable from '../tableViews/ProductTable';

const MainPage = () => {
    return (
        <Container>
            <InventoryContainsProductTable/>
            <ProductTable/>
        </Container>
    );
};

export default MainPage;