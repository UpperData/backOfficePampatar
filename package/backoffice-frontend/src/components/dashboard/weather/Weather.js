import React from "react";
import {
    Card,
    CardBody
} from 'reactstrap';

const Weather = () => {
    return (
        <Card>
            <span className="lstick"></span>
            <CardBody>
                <h4 className="card-title">Temp Guide</h4>
                <div className="d-flex align-items-center flex-row mt-4">
                    <div className="display-5 text-info"><i className="wi wi-day-showers"></i> <span>73<sup>°</sup></span></div>
                    <div className="ml-2">
                        <h3 className="mb-0">Saturday</h3><small>Ahmedabad, India</small>
                    </div>
                </div>
                <table className="table table-borderless mt-3">
                    <tbody>
                        <tr>
                            <td className="text-muted">Wind</td>
                            <td className="font-medium">ESE 17 mph</td>
                        </tr>
                        <tr>
                            <td className="text-muted">Humidity</td>
                            <td className="font-medium">83%</td>
                        </tr>
                        <tr>
                            <td className="text-muted">Pressure</td>
                            <td className="font-medium">28.56 in</td>
                        </tr>
                        <tr>
                            <td className="text-muted">Cloud Cover</td>
                            <td className="font-medium">78%</td>
                        </tr>
                    </tbody>
                </table>
                <ul className="row list-style-none text-center mt-3">
                    <li className="col-3">
                        <h4 className="text-info"><i className="wi wi-day-sunny"></i></h4>
                        <span className="d-block text-muted">09:30</span>
                        <h3 className="mt-1">70<sup>°</sup></h3>
                    </li>
                    <li className="col-3">
                        <h4 className="text-info"><i className="wi wi-day-cloudy"></i></h4>
                        <span className="d-block text-muted">11:30</span>
                        <h3 className="mt-1">72<sup>°</sup></h3>
                    </li>
                    <li className="col-3">
                        <h4 className="text-info"><i className="wi wi-day-hail"></i></h4>
                        <span className="d-block text-muted">13:30</span>
                        <h3 className="mt-1">75<sup>°</sup></h3>
                    </li>
                    <li className="col-3">
                        <h4 className="text-info"><i className="wi wi-day-sprinkle"></i></h4>
                        <span className="d-block text-muted">15:30</span>
                        <h3 className="mt-1">76<sup>°</sup></h3>
                    </li>
                </ul>
            </CardBody>
        </Card>
    );
}

export default Weather;
