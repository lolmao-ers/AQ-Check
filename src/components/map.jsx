import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

const INDIA_TOPO_JSON = require('./india.topo.json');

const PROJECTION_CONFIG = {
    scale: 350,
    center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
];

const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        fill: '#ccc',
        transition: 'all 250ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
};

const obj = {
    'Andhra Pradesh': 'AP',
    'Arunachal Pradesh': 'AR',
    'Assam': 'AS',
    'Bihar': 'BR',
    'Chhattisgarh': 'CT',
    'Goa': 'GA',
    'Gujarat': 'GJ',
    'Haryana': 'HR',
    'Himachal Pradesh': 'HP',
    'Jharkhand': 'JH',
    'Karnataka': 'KA',
    'Kerala': 'KL',
    'Madhya Pradesh': 'MP',
    'Maharashtra': 'MH',
    'Manipur': 'MN',
    'Meghalaya': 'ML',
    'Mizoram': 'MZ',
    'Nagaland': 'NL',
    'Odisha': 'OR',
    'Punjab': 'PB',
    'Rajasthan': 'RJ',
    'Sikkim': 'SK',
    'Tamil Nadu': 'TN',
    'Telangana': 'TG',
    'Tripura': 'TR',
    'Uttarakhand': 'UT',
    'Uttar Pradesh': 'UP',
    'West Bengal': 'WB',
    'AndamanandNicobarIslands': 'AN',
    'Chandigarh': 'CH',
    'Dadra and Nagar Haveli': 'DN',
    'Daman and Diu': 'DD',
    'Delhi': 'DL',
    'Jammu and Kashmir': 'JK',
    'Ladakh': 'LA',
    'Lakshadweep': 'LD',
    'Puducherry': 'PY'
};

// will generate random heatmap data on every call
const getHeatMapData = () =>
{
    return [
        { id: 'AP', state: 'Andhra Pradesh' },
        { id: 'AR', state: 'Arunachal Pradesh' },
        { id: 'AS', state: 'Assam' },
        { id: 'BR', state: 'Bihar' },
        { id: 'CT', state: 'Chhattisgarh' },
        { id: 'GA', state: 'Goa' },
        { id: 'GJ', state: 'Gujarat' },
        { id: 'HR', state: 'Haryana' },
        { id: 'HP', state: 'Himachal Pradesh'},
        { id: 'JH', state: 'Jharkhand' },
        { id: 'KA', state: 'Karnataka' },
        { id: 'KL', state: 'Kerala', },
        { id: 'MP', state: 'Madhya Pradesh' },
        { id: 'MH', state: 'Maharashtra'},
        { id: 'MN', state: 'Manipur'},
        { id: 'ML', state: 'Meghalaya'},
        { id: 'MZ', state: 'Mizoram'},
        { id: 'NL', state: 'Nagaland'},
        { id: 'OR', state: 'Odisha'},
        { id: 'PB', state: 'Punjab'},
        { id: 'RJ', state: 'Rajasthan'},
        { id: 'SK', state: 'Sikkim'},
        { id: 'TN', state: 'Tamil Nadu' },
        { id: 'TG', state: 'Telangana' },
        { id: 'TR', state: 'Tripura' },
        { id: 'UT', state: 'Uttarakhand' },
        { id: 'UP', state: 'Uttar Pradesh' },
        { id: 'WB', state: 'West Bengal' },
        { id: 'WB', state: 'West Bengal' },
        { id: 'AN', state: 'Andaman and Nicobar Islands' },
        { id: 'CH', state: 'Chandigarh' },
        { id: 'DN', state: 'Dadra and Nagar Haveli' },
        { id: 'DD', state: 'Daman and Diu' },
        { id: 'DL', state: 'Delhi' },
        { id: 'JK', state: 'Jammu and Kashmir' },
        { id: 'LA', state: 'Ladakh' },
        { id: 'LD', state: 'Lakshadweep' },
        { id: 'PY', state: 'Puducherry' }
    ];
};

export default function Example(props)
{
    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState(getHeatMapData());

    // const colorScale = scaleQuantile()
    //     .domain(props.cityList?.map(d => d.aqi))
    //     .range(COLOR_RANGE);

    const onMouseEnter = (geo, current = { aqi: 'NA' }) =>
    {
        return () =>
        {
            setTooltipContent(`${geo.properties.name}: ${parseInt(current.aqi) * 5}`);
        };
    };

    const onMouseLeave = () =>
    {
        setTooltipContent('');
    };

    var percentColors = [
        { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
        { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
        { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }];

    var getColorForPercentage = function (pct)
    {
        // console.log(pct);
        for (var i = 1; i < percentColors.length - 1; i++)
        {
            if (pct < percentColors[i].pct)
            {
                break;
            }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
        // or output as hex if preferred
    };

    function setColor(score)
    {
        const DONUT_METER_COLORS = [
            "rgb(0, 176, 80)",
            "rgb(146, 208, 80)",
            "rgb(255, 255, 0)",
            "rgb(255, 153, 0)",
            "rgb(255, 0, 0)",
            "rgb(192, 0, 0)",
        ];

        let meterColor;

        if (score <= 50)
        {
            meterColor = DONUT_METER_COLORS[0];
        }
        else if (score <= 100)
        {
            meterColor = DONUT_METER_COLORS[1];
        }
        else if (score <= 200)
        {
            meterColor = DONUT_METER_COLORS[2];
        }
        else if (score <= 300)
        {
            meterColor = DONUT_METER_COLORS[3];
        }
        else if (score <= 400)
        {
            meterColor = DONUT_METER_COLORS[4];
        }
        else
        {
            meterColor = DONUT_METER_COLORS[5];
        }


        return meterColor;
    }

    function stateClicked(stateData)
    {
        if (!stateData) return;
        // console.log(stateData);
        // console.log('clicked')
        props.openCityData(stateData.state, stateData);
    }

    return (
        <div id='map' style={{ width: "60vw" }}>
            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={300}
                height={220}
                data-tip=""
                style={{ maxWidth: "60vw", height: "99vh" }}
            >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                        geographies.map(geo =>
                        {
                            // console.log('this is prop', props.cityList);
                            const current = props.cityList?.find(s => s.mapId === geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={current ? setColor(current.aqi*5) : DEFAULT_COLOR}
                                    style={geographyStyle}
                                    onMouseEnter={onMouseEnter(geo, current)}
                                    onMouseLeave={onMouseLeave}
                                    onClick={() => stateClicked(current)}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}