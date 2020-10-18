import React from "react";
import {
    Card,
    CardBody
} from 'reactstrap';


import bigimg1 from "../../../assets/images/big/img4.jpg";


const BlogPost = () => {
    return (
        /*--------------------------------------------------------------------------------*/
        /* Used In Dashboard-1 [Classic]                                                  */
        /*--------------------------------------------------------------------------------*/
        <Card>
            <img className="card-img-top img-fluid auto-height" src={bigimg1} alt="img" />
            <CardBody>
                <h3 className="font-normal">Business development of rules 2021</h3>
                <span className="badge badge-info badge-pill">Technology</span>
                <p className="mb-0 mt-3 font-16 pb-2">Titudin venenatis ipsum aciat. Vestibu ullamer quam. nenatis ipsum ac feugiat. Ibulum ullamcorper.</p>
                <div className="d-flex mt-4">
                    <a href="/" className="font-16">Read more</a>
                    <div className="ml-auto align-self-center">
                        <a href="/" className="link mr-2"><i className="fas fa-heart"></i></a>
                        <a href="/" className="link mr-2"><i className="fa fa-share-alt"></i></a>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default BlogPost;
