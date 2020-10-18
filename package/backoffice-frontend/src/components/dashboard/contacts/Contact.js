import React from "react";
import { Card, CardBody } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import * as data from "./Data.js";

const CardContact = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-1,3 and Widget Page                                          */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <span className="lstick"></span>
      <CardBody>
        <h4 className="card-title">My Contacts</h4>
        <div
          className="mailbox position-relative scrollable"
          style={{ height: "437px" }}
        >
          <PerfectScrollbar>
            <div className="message-center message-body">
              {/*<!-- Message -->*/}
              {data.messages.map((message, index) => {
                return (
                  <a href="/" className="message-item" key={index}>
                    <span className="user-img">
                      <img
                        src={message.image}
                        alt="user"
                        className="rounded-circle"
                        width=""
                      />
                      <span
                        className={
                          "profile-status pull-right " + message.status
                        }
                      />
                    </span>
                    <div className="mail-contnet">
                      <h5 className="message-title">{message.title}</h5>
                      <span className="mail-desc">{message.desc}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardContact;
