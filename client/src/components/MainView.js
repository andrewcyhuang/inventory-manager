import React from 'react';
import { Container } from 'react-bootstrap';
import GenericTable from './GenericTable';
import { getAllProducts, getAllInventories, getAllInventoryHasProducts } from '../common/queries';

function MainView() {
    return (
        <Container>
            <GenericTable entityName='Inventory Contains Product' getData={getAllInventoryHasProducts}/>
            <GenericTable entityName='Inventory' getData={getAllInventories}/>
            <GenericTable entityName='Product' getData={getAllProducts}/>
        </Container>
    )
}

export default MainView;