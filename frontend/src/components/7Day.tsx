import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useState, useEffect } from "react";

export default function SevenDay (props: any) {

    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        getWeatherForecast();
    }, []);

    const getWeatherForecast = () => {
        const options = {
            method: 'GET',
            url: `${process.env.REACT_APP_WEATHER_APP_API_URL}/api/external/forecast`,
            params: {latLong: `${localStorage.getItem("lat")},${localStorage.getItem("long")}`,
                     timeRange: 'next6days'},
        }
      
        axios.request(options).then((response) => {
            setWeatherData(response.data)
      
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div className="sevenDay">
            {weatherData && props.weatherData.days ? props.weatherData.days.map((weather: { datetimeEpoch: React.Key | null | undefined; datetime: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; description: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; precipprob: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; tempmax: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; tempmin: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; }) => {
                return <Row key={weather.datetimeEpoch} xs={1} md={1} className="d-flex p-2" >
                {Array.from({ length: 1 }).map((_, idx) => (
                    <Col>
                    <Card style={{ width: "15rem"}} className="cards">
                        <Card.Body>
                            <Card.Header style={{ fontSize: "23px" }}>{weather.datetime}</Card.Header>
                            <Card.Text>
                                <div>{weather.description}</div>
                                <hr></hr>
                                <div>Chance of precipitation</div>
                                <div> {weather.precipprob}% </div>
                                <hr></hr>
                                <div>High of {weather.tempmax}°F</div>
                                <div>Low of {weather.tempmin}°F</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            }):null
            }
        </div>
    )
}