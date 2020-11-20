import { AggregationTypes } from './enums';

export const renderTableData = (data) => {
    if (!data || data.length === 0) return;

    const fields = Object.keys(data[0]);
    return data.map((item, idx) => {
        return (
            <tr key={idx}>
                {
                    fields.map((field, fieldIdx) => {
                        return (
                            <td key={fieldIdx}>
                                {item[field]}
                            </td>
                        )
                    })
                }
            </tr>
        )
    });
}

export const renderTableHeaders = (data) => {
    if (!data || data.length === 0) return;

    const fields = Object.keys(data[0]);

    return (
        <tr>
            {
                fields.map((field, idx) => {
                    return (
                        <th key={idx}>
                            {field.toUpperCase()}
                        </th>
                    )
                })
            }
        </tr>
    );
}

export const priceProcessing = (data, aggregation = null) => {
    console.log(JSON.stringify(data));
    return data.map(o => {
        let fieldToSanitize = 'aggregation';
        if (!o[fieldToSanitize]) {
            fieldToSanitize = 'price';
        }
        if (!o[fieldToSanitize]) {
            return o;
        }
        return Object.assign({}, o, {[fieldToSanitize]: sanitizePrice(o[fieldToSanitize], aggregation)});
    });
};

export const sanitizePrice = (value, aggregation = null) => {
    if (aggregation === AggregationTypes.COUNT) {
        return value;
    } else {
        return (value / 100).toFixed(2);
    }
}

export const constructArrayCommaSeparated = (string) => {
    if (string) {
        let res = string.split(',');
        res.forEach((string, idx) => {
            res[idx] = string.trim();
        });
        if (res.length > 0) {
            return res;
        } else {
            throw new Error(`Empty array. Input string: ${string}`);
        }
    } else {
        throw new Error(`Invalid input string. ${string}`);
    }
}