import React from "react";
import Chart from 'react-apexcharts';
import {
    Card,
    CardBody
} from 'reactstrap';



const Visits = () => {

    const optionsvisit = {
        chart: {
            id: "donut-chart",
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            padding: {
                left: 0,
                right: 0
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70px'
                }
            }
        },
        stroke: {
            width: 0
        },
        legend: {
            show: false,
        },
        colors: ['rgb(30, 136, 229)', 'rgb(38, 198, 218)', 'rgb(236, 239, 241)', 'rgb(116, 90, 242)'],
        tooltip: {
            fillSeriesColor: false,
        }
    };
    const seriesvisit = [45, 15, 27, 18];

    return (
        <Card>
            <span className="lstick"></span>
            <CardBody>
                <h4 className="card-title mb-4">Visit Separation</h4>
                <div className="pb-4">
                    <Chart
                        options={optionsvisit}
                        series={seriesvisit}
                        type="donut"
                        height="190"
                    />
                </div>
                <table className="table vm font-14 mb-0 mt-4">
                    <tbody>
                        <tr>
                            <td className="border-top-0">Mobile</td>
                            <td className="text-right font-medium border-top-0">38.5%</td>
                        </tr>
                        <tr>
                            <td>Tablet</td>
                            <td className="text-right font-medium">30.8%</td>
                        </tr>
                        <tr>
                            <td>Desktop</td>
                            <td className="text-right font-medium">7.7%</td>
                        </tr>
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}

export default Visits;
