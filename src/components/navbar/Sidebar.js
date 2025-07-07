import { faC, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function Sidebar(props) {
  return (
    <>
      {props.show === "show" ? (
        <div  className={`sidebar ${props.show && "show"}`} >
          <div className="sidebar-container">
            <div  className="close">
              <FontAwesomeIcon onClick={props.notshow} className="close-icon" icon={faClose} />
            </div>
            <div>
              <p className="sidebar-title">Categories</p>
              <div>
                <Link className="sidebar-link" href={"/"}>
                  BAGS
                </Link>
              </div>
              <div>
                <Link className="sidebar-link" href={"/"}>
                  SHOES
                </Link>
              </div>
              <div>
                <Link className="sidebar-link" href={"/"}>
                  CLOTHES
                </Link>
              </div>
              <div></div>
              <p className="sidebar-title">Pages</p>
              <div>
                <Link className="sidebar-link" href={"/"}>
                  Shipping policy
                </Link>
              </div>
              <div>
                <Link className="sidebar-link" href={"/"}>
                  Refund policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
