import { Link } from "react-router-dom";
import { FaCopyright } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiBookOpen } from "react-icons/bi";

import Styles from "./footer.module.css";

const Footer = () => {
  return (
    <>
    <div 
className={Styles.footerCont}
    >
 <div className={Styles.footer}>
        <div className={Styles.footercontact}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IoIosInformationCircleOutline
              style={{ fontSize: "25px", color: "black", marginRight: "6px" }}
            />
            <h3>Support</h3>
          </div>
          <p style={{ color: "grey" }}>
            Eventify.
          </p>
          <p>0049-293023</p>
          <a href="mailto:itumun@itu.edu.pk">
            <p>support@eventify.pk</p>
          </a>
        </div>

        {/* <div className={Styles.footermenu}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdKeyboardArrowRight
              style={{ fontSize: "25px", color: "black", marginRight: "6px" }}
            />
            <h3>Popular Categories</h3>
          </div>
          <Link className={Styles.Link} to={"/listings/property-for-rent/"}>
            Tag
          </Link>
          <Link className={Styles.Link} to={"/listings/mobile-phones/"}>
            Mobile Phones
          </Link>
          <Link className={Styles.Link} to={"/listings/bikes/"}>
            Bikes
          </Link>
          <Link className={Styles.Link} to={"/listings/electronics/computer-and-accessories/"}>
            Computers
          </Link>
        </div> */}
        <div className={Styles.footerposts}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <BiBookOpen
              style={{
                fontSize: "25px",
                color: "black",
                marginRight: "6px",
                cursor: "pointer",
              }}
            />
            <h3>Eventify blogs</h3>
          </div>
          <p>Blogs posts coming soon!</p>
        </div>

        <div className={Styles.footericons}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <a
              rel="noreferrer"
              target={"blank"}
            >
              <FaInstagram
                style={{ fontSize: "25px", color: "white", marginRight: "6px" }}
              />
            </a> */}
            {/* <h3> Instagram</h3> */}
          </div>
          <a
            rel="noreferrer"
            target={"blank"}
          >
          </a>
        </div>
      </div>
      <hr style={{marginTop:"5px"}}/>
      <div className={Styles.footerbelow}>
        <div className={Styles.footercopyright}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <FaCopyright />
            <p>Eventify 2023 - All rights reserved</p>
          </span>
          <a
            style={{ marginLeft: "-1px" }}
            rel="noreferrer"
            target={"_blank"}
            href="https://www.linkedin.com"
          >
            Eventify PVT LTD
          </a>
        </div>
      </div>

    </div>
     
    </>
  );
};

export default Footer;