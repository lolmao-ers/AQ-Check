import React from 'react';

import DatamapsIndia from 'react-datamaps-india';

export default function Example()
{
    return (
        <DatamapsIndia
            regionData={{
                Maharashtra: {
                    value: 10,
                },
            }}
            hoverComponent={({ value }) =>
            {
                return (
                    <>
                        <p>{value.name}</p>
                        <p>{value.value}</p>
                    </>
                );
            } }
            mapLayout={{
                title: 'Title',
                legendTitle: 'Legend Title',
                startColor: '#FFDAB9',
                endColor: '#FF6347',
                hoverTitle: 'Count',
                noDataColor: '#f5f5f5',
                borderColor: '#8D8D8D',
                hoverBorderColor: '#8D8D8D',
                hoverColor: 'green',
            }} />
    );
}