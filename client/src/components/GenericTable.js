import React from 'react';
import Table from 'react-bootstrap/Table';
import { renderTableHeaders, renderTableData } from '../common/utils';
import { Row, Button } from 'react-bootstrap';

class GenericTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = { data: [] }
    }

    async componentDidMount() {
        const res = await this.props.getData();
        if (res && res.data ) {
            this.setState({ data: res.data });
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <h2>{this.props.entityName} Table </h2>
                    <Button className='pull-left' style={{ marginLeft: '10px' }} size='sm'>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-clockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </Button>
                </Row>
                <br/>
                <Row>
                    <Table striped bordered hover size='sm' style={{fontFamily: 'Helvetica'}}>
                        <thead style={{fontSize: '14px'}}>{renderTableHeaders(this.state.data)}</thead>
                        <tbody style={{fontSize: '12px'}}>{renderTableData(this.state.data)}</tbody>
                    </Table>
                </Row>
            </div>
        )
    }
}

export default GenericTable;