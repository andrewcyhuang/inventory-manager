import React from 'react';
import { Container } from 'react-bootstrap';
import Constants from '../common/constants';
import AbstractTableWrapper from './AbstractTableWrapper';

function MainView() {
    return (
        <Container>
            <AbstractTableWrapper entityName='Inventory Contains Product' endpoint={Constants.inventoryContainsProductsPrefix} />
            <AbstractTableWrapper entityName='Inventory' endpoint={Constants.inventoryPrefix}/>
            <AbstractTableWrapper entityName='Product' endpoint={Constants.productPrefix}/>
        </Container>
    )
}

export default MainView;