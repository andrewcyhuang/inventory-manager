import React from 'react';
import GenericTable from './GenericTable';
import AbstractQuery from '../common/abstractQuery';
import { Form, Row, Button } from 'react-bootstrap';

class AbstractTableWrapper extends React.Component {
    constructor (props) {
        super(props);
        this.state = { data: [] };
    }

    async componentDidMount() {
        this.queryHelper = new AbstractQuery(this.props.endpoint);
        await this.updateData(this.queryHelper.getAll.bind(this.queryHelper));
    }

    render() {
        return (
            <div>
                <Row>
                <h2>{this.props.entityName} Table </h2>
                <Button className='pull-left' style={{ marginLeft: '10px'}} variant='primary' size='lg'>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-clockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>
                </Button>
            </Row>
            <br/>
            <GenericTable data={this.state.data}/>
            </div>
        )
    }

    async updateData(query) {
        const res = await query();
        if (res && res.data) {
            this.setState({ data: res.data });
        }
    }
}

export default AbstractTableWrapper;