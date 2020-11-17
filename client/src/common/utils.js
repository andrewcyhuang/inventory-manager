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