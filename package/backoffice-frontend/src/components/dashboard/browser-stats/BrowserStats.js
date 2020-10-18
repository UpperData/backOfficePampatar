import React from 'react';
import {
    Card,
    CardBody,
    Table
} from 'reactstrap';

import chrome from '../../../assets/images/browser/chrome-logo.png';
import firefox from '../../../assets/images/browser/firefox-logo.png';
import safari from '../../../assets/images/browser/safari-logo.png';
import ie from '../../../assets/images/browser/internet-logo.png';
import edge from '../../../assets/images/browser/edge-logo.png';

const BrowserStats = () => {
    return (
        /*--------------------------------------------------------------------------------*/
        /* Used In Wizard Page                                                            */
        /*--------------------------------------------------------------------------------*/
        <Card>
            <CardBody>
                <h3 className="font-normal">Browser State</h3>
                <Table responsive className="mt-4 mb-3">
                    <tbody>
                        <tr>
                            <td style={{ width: '40px' }}><img src={chrome} alt="logo" /></td>
                            <td>Google Chrome</td>
                            <td align="right"><span className="badge badge-info">23%</span></td>
                        </tr>
                        <tr>
                            <td><img src={firefox} alt="logo" /></td>
                            <td>Mozila Firefox</td>
                            <td align="right"><span className="badge badge-success">15%</span></td>
                        </tr>
                        <tr>
                            <td><img src={safari} alt="logo" /></td>
                            <td>Apple Safari</td>
                            <td align="right"><span className="badge badge-primary">07%</span></td>
                        </tr>
                        <tr>
                            <td><img src={ie} alt="logo" /></td>
                            <td>Internet Explorer</td>
                            <td align="right"><span className="badge badge-warning">09%</span></td>
                        </tr>
                        
                        <tr>
                            <td><img src={edge} alt="logo" /></td>
                            <td>Microsoft edge</td>
                            <td align="right"><span className="badge badge-success">09%</span></td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

export default BrowserStats;
