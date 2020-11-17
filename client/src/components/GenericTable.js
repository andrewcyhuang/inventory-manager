import React from 'react';
import { Table, Row } from 'react-bootstrap';
import { renderTableHeaders, renderTableData } from '../common/utils';

export const GenericTable = props => {
    return (
        <React.Fragment>
            <Row>
                <Table striped bordered hover size='sm' style={{fontFamily: 'Helvetica'}}>
                    <thead style={{fontSize: '14px'}}>{renderTableHeaders(props.data)}</thead>
                    <tbody style={{fontSize: '12px'}}>{renderTableData(props.data)}</tbody>
                </Table>
            </Row>
        </React.Fragment>
    );
};
