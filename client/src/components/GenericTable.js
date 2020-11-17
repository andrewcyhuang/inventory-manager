import { Table, Row } from 'react-bootstrap';
import { renderTableHeaders, renderTableData } from '../common/utils';

function GenericTable(props) {
    return (
        <div>
            <Row>
                <Table striped bordered hover size='sm' style={{fontFamily: 'Helvetica'}}>
                    <thead style={{fontSize: '14px'}}>{renderTableHeaders(props.data)}</thead>
                    <tbody style={{fontSize: '12px'}}>{renderTableData(props.data)}</tbody>
                </Table>
            </Row>
        </div>
    );
}

export default GenericTable;