import React from "react";
import "../assets/css/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faHeartPulse,
  faSyringe,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Divider, Row } from "rsuite";

function Dashboard() {
  return (
    <div className="dash-main-con">
      <Row className="text-black w-full font-montserrat text-3xl font-semibold">
        <p>Medicals</p>
        <Divider className="border-t-2 border-gray-300" />
      </Row>
      <div className="dash-main-content">
        <div className="dash-type-con">
          <Link to="/home/gcc?testType=true">
            <div className="dash-type gcc">
              <div className="dash-type-top gcc-top"></div>
              <div className="dash-type-img gcc-img">
                <FontAwesomeIcon icon={faHospital} />
              </div>
              <div className="dash-type-bot gcc-bot">GCC Medicals</div>
            </div>
          </Link>
          <Link to="/home/gcc?testType=false">
            <div className="dash-type ngcc">
              <div className="dash-type-top ngcc-top"></div>
              <div className="dash-type-img ngcc-img">
                <FontAwesomeIcon icon={faHeartPulse} />
              </div>
              <div className="dash-type-bot ngcc-bot">Non GCC Medicals</div>
            </div>
          </Link>
          <Link to="/home/opd">
            <div className="dash-type opd">
              <div className="dash-type-top opd-top"></div>
              <div className="dash-type-img opd-img">
                <FontAwesomeIcon icon={faSyringe} />
              </div>
              <div className="dash-type-bot opd-bot">OPD Test</div>
            </div>
          </Link>
          <Link to="/home">
            <div className="dash-type rpt">
              <div className="dash-type-top rpt-top"></div>
              <div className="dash-type-img rpt-img">
                <FontAwesomeIcon icon={faNewspaper} />
              </div>
              <div className="dash-type-bot rpt-bot">Repeat Medicals</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
