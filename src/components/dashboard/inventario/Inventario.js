import React from "react";
import Chart from 'react-apexcharts';
import {
    Card,
    CardBody
} from 'reactstrap';
import { moneyFormatter } from "../../../utils/helpers";

const DonutInventario = (props) => {

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
        labels: props.labels,
        colors: props.colors,
        tooltip: {
            x: {
              show: false
            },
            y: {
                formatter: function(value){
                    return Number((value * 100) / (props.total)).toFixed(2) + "%";
                }
            }
        }
    };

    const seriesvisit = [45, 15, 27, 18];
    //Number((data.totalProduct * 100) / (data.totalService + data.totalProduct)).toFixed(2) + "%"
    
    return (
        <Card>
            <span className="lstick"></span>
            <CardBody>
                <h4 className="card-title mb-4">
                    Valor de inventario
                </h4>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div>
                            <Chart
                                options={optionsvisit}
                                series={props.data}
                                type="donut"
                                height="280"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <table className="table vm font-14 mb-0">
                            <tbody>
                                {props.tablerows.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className={`border-top-0 ${item.strong ? 'font-weight-bold' : ''}`}>
                                                {item.title}
                                            </td>
                                            <td className={`text-right font-medium border-top-0 ${item.strong ? 'font-weight-bold' : ''}`}>
                                                {item.value}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default DonutInventario;
