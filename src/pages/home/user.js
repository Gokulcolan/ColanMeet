import { Button, TextField } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import DomainIcon from "@mui/icons-material/Domain";
import CameraIcon from "@mui/icons-material/Camera";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import LanguageIcon from "@mui/icons-material/Language";
import GridViewIcon from "@mui/icons-material/GridView";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useRouter } from "next/router";
import { InstantMeetLink } from "../../components/modals/instantMeetLink";
import { meetingRoomApi, verifyMeetLink } from "src/redux/action/userAction";
import {
  debouncedErrorToast,
  debouncedSuccessToast,
} from "../../components/helper";
import { verifyMeetLinkAction } from "src/redux/slice/userSlice";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SignOutAlert from "src/components/modals/signedOutAlert";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const User = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getMeetingRoom = useSelector((state) => state.user?.getMeetingRoomInfo);
  const MeetIdresponse = useSelector((state) => state.user?.verifyMeetLinkInfo);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const open = Boolean(anchorEl);
  const [openmeet, setOpenmeet] = useState(false);
  const [meetlink, setMeetlink] = useState("");
  const [uname, setUname] = useState(getMeetingRoom?.[0]?.meetinglink);
  const [LoginMail, setLoginMail] = useState("");
  const [show, setShow] = useState(false);
  const [JoinLink, setJoinLink] = useState("");
  const [Token, setToken] = useState("");
  const [SignOut, setSignOut] = useState(false);
  const [signOutAlert, setSignOutAlert] = useState(false);


  useEffect(() => {
    const loginMail = sessionStorage.getItem("username");
    setLoginMail(loginMail);
  }, []);

  useEffect(() => {
    if (getMeetingRoom?.meetinglink) {
      setMeetlink(getMeetingRoom.meetinglink);
    } else {
      setMeetlink("");
    }
  }, [getMeetingRoom]);

  // useEffect(() => {
  //   if (MeetIdresponse?.response?.meetingLink) {
  //     router.push(MeetIdresponse?.response?.meetingLink);
  //   }
  // }, [MeetIdresponse]);

  useEffect(() => {
    var accessToken = sessionStorage.getItem("accessToken");
    setToken(accessToken);
  }, [SignOut]);

  const currentDate = new Date();
  const date = new Date(currentDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const convertedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  // console.log(convertedDateTime, "convertedDateTime1");

  // useEffect(() => {
  //   if (MeetIdresponse?.response?.meetinglink) {
  //     const meetingStartTime = MeetIdresponse?.response?.meetingstarttime;
  //     const meetingLink = MeetIdresponse?.response?.meetinglink;
  //     if (convertedDateTime <= meetingStartTime) {
  //       debouncedErrorToast("Meeting is not started");
  //     } else {
  //       debouncedSuccessToast("Meeting is Started");
  //       router.push(meetingLink);
  //     }
  //   }
  // }, [MeetIdresponse]);
  useEffect(() => {
    if (MeetIdresponse?.response && MeetIdresponse.response.length > 0) {
      const meetingStartTime = MeetIdresponse.response[0].meetingstarttime;
      const meetingLink = MeetIdresponse.response[0].meetinglink;

      if (convertedDateTime <= meetingStartTime) {
        debouncedErrorToast("Meeting is not started");
      } else {
        debouncedSuccessToast("Meeting is Started");
        // router.push(meetingLink);
      }
    }
  }, [MeetIdresponse]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const instantmeet = () => {
    const req = {
      username: LoginMail,
    };
    // if (session) {
    //   setOpenmeet(true);
    //   dispatch(meetingRoomApi(req));
    // } else

    if (
      Token !== null
      // Loginresponse?.status == "success"
      //  ||  Oauthresponse?.status == "success"
    ) {
      setOpenmeet(true);
      dispatch(meetingRoomApi(req));
    } else {
      router.push("/auth/login");
    }
  };

  const schedulemeet = () => {
    dispatch(
      verifyMeetLinkAction({
        response: [],
      })
    );
    if (Token !== null) {
      router.push("/schedulePages/scheduleMeet");
    } else {
      router.push("/auth/login");
    }
  };

  const signOutHandler = () => {
    // signOut();
    setSignOutAlert(true)
    // setSignOut(true);
    // sessionStorage.clear();
  };

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setShow(true);
      setJoinLink(e.target.value);
    } else {
      setShow(false);
    }
  };

  const joinMeet = async (id) => {
    let roomId = `https://meet.colan.in/meetingRoom/?roomid=${id}`;
    // let roomId = { JoinLink };

    let link = { id };
    if (link.id.includes(`https://meet.colan.in/meetingRoom/?roomid=`)) {
      await dispatch(verifyMeetLink(link.id));
    } else {
      await dispatch(verifyMeetLink(roomId));
    }
  };

  const SignIn = () => {
    router.push("/auth/login");
  };

  // const handleRedirect = () => {
  //   router.push("https://colaninfotech.com/");
  // };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth > 768) {
        setMenuOpen(false); // Close the menu when screen size is larger than 768px
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <div>
      {/* <header id="header" className="header">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a className="logo d-flex align-items-center">
            <img src="/assets/img/colan-logo.png" alt="" />
          </a>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#team">
                  Team
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
              {Token !== null ? (
                <Button className="sign-btn" onClick={() => signOutHandler()}>
                  Sign Out
                </Button>
              ) : (
                <Button className="sign-btn" onClick={() => SignIn()}>
                  Sign In
                </Button>
              )}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header> */}
      <header id="header" className="header">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

          <div className="logo">
            <a className="logo d-flex align-items-center">
              <img src="/assets/img/colan-logo.png" alt="" />
            </a>
          </div>
          <nav className={`menu ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li>  <a className="nav-link scrollto active" href="#hero">
                Home
              </a></li>
              <li><a className="nav-link scrollto" href="#about">
                About
              </a></li>
              <li><a className="nav-link scrollto" href="#services">
                Services
              </a></li>
              <li><a className="nav-link scrollto" href="#team">
                Team
              </a></li>
              <li><a className="nav-link scrollto" href="#contact">
                Contact
              </a></li>
              <li>
                {Token !== null ? (
                  <Button className="sign-btn" onClick={() => signOutHandler()}>
                    Sign Out
                  </Button>
                ) : (
                  <Button className="sign-btn" onClick={() => SignIn()}>
                    Sign In
                  </Button>
                )}
              </li>
            </ul>
          </nav>
          <button className={`toggle-button ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            {menuOpen ? <CloseIcon sx={{ color: "black", fontWeight: "bold" }} /> : <MenuIcon sx={{ color: "black", fontWeight: "bold" }} />}
          </button>
        </div>
      </header>
      <section id="hero" className="hero d-flex align-items-center sch-met-ht">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">Welcome to Colan Meet</h1>
              <h4
                data-aos="fade-up"
                style={{
                  margin: "1rem 0rem ",
                  fontSize: "20px",
                  lineHeight: "30px",
                }}
              >
                Creating a video meeting,enables you to join virtual meetings
                via audio, video, chat, and screen sharing and more..
              </h4>
              <div data-aos="fade-up" data-aos-delay="600">
                <div
                  style={{ display: "flex", gap: "10px", margin: "10px 0px" }}
                >
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle joinbutton"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={handleClick}
                      style={{ background: "#012970", fontWeight: "700" }}
                    >
                      <VideocamIcon sx={{ marginRight: "5px" }} />
                      Start Meeting
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={instantmeet}
                          style={{ color: "rgba(0, 0, 0, 0.87)" }}
                        >
                          {" "}
                          <VideocamIcon sx={{ margin: "5px" }} /> Instant
                          Meeting
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={schedulemeet}
                          style={{ color: "rgba(0, 0, 0, 0.87)" }}
                        >
                          <FileCopyIcon sx={{ margin: "5px" }} />
                          Schedule Meeting
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* <div >
                    <Button
                      id="demo-customized-button"
                      aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      variant="contained"
                      size="medium"
                      disableElevation
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{ fontWeight: "bold", background: "#012970" }}
                      className="joinbutton"
                    >
                      <VideocamIcon />
                      Start Meeting
                    </Button>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        "aria-labelledby": "demo-customized-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={instantmeet} disableRipple>
                        <VideocamIcon />
                        Instant Meeting
                      </MenuItem>
                      <MenuItem onClick={schedulemeet} disableRipple>
                        <FileCopyIcon />
                        Schedule Meeting
                      </MenuItem>
                    </StyledMenu>
                  </div> */}
                  <div>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="Enter Room Id or Link"
                      size="small"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </div>
                  {show && (
                    <div>
                      <Button
                        onClick={(e) => {
                          joinMeet(JoinLink);
                        }}
                        className="jbtn"
                        sx={{ backgroundColor: "#012970", color: "white" }}
                      >
                        Join Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 hero-img"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img
                src="/assets/img/hero-img.png"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="row gx-0">
              <div
                className="col-lg-6 d-flex align-items-center"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <img src="/assets/img/about.jpg" className="img-fluid" alt="" />
              </div>
              <div
                className="col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="content">
                  <h3>Who We Are</h3>
                  <h2>Create your video call meetings with everyone.</h2>
                  <p>
                    Colan Meet is one service for secure, high-quality video
                    meetings and calls available for everyone, on any device.
                  </p>
                  {/* <div className="text-center text-lg-start">
                    <a
                      href="#"
                      className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Read More</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="values" className="values">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Our Values</h2>
              <p>THE COLATINES WHO MAKE IT HAPPEN</p>
            </header>

            <div className="row">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div className="box">
                  <img
                    src="/assets/img/values-1.png"
                    className="img-fluid"
                    alt=""
                  />
                  <h3>Innovation & Technology</h3>
                  <p>
                    Exploring new ways to bring innovation to our solutions. We
                    never failed to upskill our expertise in niche technologies.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-4 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="box">
                  <img
                    src="/assets/img/values-2.png"
                    className="img-fluid"
                    alt=""
                  />
                  <h3>Reliable Support & Integrity</h3>
                  <p>
                    We are known for our fast & reliable project management. We
                    stand by our obligation to ensure that our solutions are
                    ethical and moral.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-4 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="box">
                  <img
                    src="/assets/img/values-3.png"
                    className="img-fluid"
                    alt=""
                  />
                  <h3>Quality Assurance & Scalability</h3>
                  <p>
                    All our products and services are tested for 100% quality
                    before delivery. Our highly scalable team meets the needs of
                    our growing customer base.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="counts" className="counts">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <div className="col-lg-3 col-md-6">
                <div className="count-box">
                  <i className="bi bi-emoji-smile"></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="232"
                      data-purecounter-duration="1"
                      className="purecounter"
                    ></span>
                    <MedicalInformationIcon
                      sx={{
                        color: "#012970",
                        fontSize: "3rem",
                      }}
                    />
                    <p>Health Care</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="count-box">
                  <i
                    className="bi bi-journal-richtext"
                    style={{ color: "#ee6c20" }}
                  ></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="521"
                      data-purecounter-duration="1"
                      className="purecounter"
                    ></span>
                    <DomainIcon
                      sx={{
                        color: "#012970",
                        fontSize: "3rem",
                      }}
                    />
                    <p>Real Estates</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="count-box">
                  <i className="bi bi-headset" style={{ color: "#15be56" }}></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="1463"
                      data-purecounter-duration="1"
                      className="purecounter"
                    ></span>
                    <CameraIcon
                      sx={{
                        color: "#012970",
                        fontSize: "3rem",
                      }}
                    />
                    <p>Ecommerce</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="count-box">
                  <i className="bi bi-people" style={{ color: "#bb0852" }}></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="15"
                      data-purecounter-duration="1"
                      className="purecounter"
                    ></span>
                    <AttachMoneyIcon
                      sx={{
                        color: "#012970",
                        fontSize: "3rem",
                        paddingLeft: "10px",
                      }}
                    />
                    <p>Finance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Services</h2>
              <p>SOFTWARE DEVELOPMENT SERVICES</p>
            </header>

            <div className="row gy-4">
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="service-box blue">
                  <i className="ri-discuss-line icon">
                    <PhoneIphoneIcon />
                  </i>

                  <h3>Mobile App Development</h3>
                  <p>
                    Managed Mobile App Development devoted to discovering &
                    building your desired objectives
                  </p>
                  {/* <a href="#" className="read-more">
                    <span>Read More</span> <i className="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="service-box orange">
                  <i className="ri-discuss-line icon">
                    <WebAssetIcon />
                  </i>

                  <h3>Web App Development</h3>
                  <p>
                    Get awe-inspiring business-ready web applications & features
                    into production on-time.
                  </p>
                  {/* <a href="#" className="read-more">
                    <span>Read More</span> <i className="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="service-box green">
                  <i className="ri-discuss-line icon">
                    <LanguageIcon />
                  </i>

                  <h3>Digital Marketing</h3>
                  <p>
                    Cutting-edge blockchain solutions to amply your business
                    with quality and excellence
                  </p>
                  {/* <a href="#" className="read-more">
                    <span>Read More</span> <i className="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="service-box red">
                  <i className="ri-discuss-line icon">
                    <PsychologyIcon />
                  </i>

                  <h3>Data Science</h3>
                  <p>
                    Non et temporibus minus omnis sed dolor esse consequatur.
                    Cupiditate sed error ea fuga sit provident adipisci neque.
                  </p>
                  {/* <a href="#" className="read-more">
                    <span>Read More</span> <i className="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="service-box purple">
                  <i className="ri-discuss-line icon">
                    <GridViewIcon />
                  </i>
                  <h3>BlockChain</h3>
                  <p>
                    Dedicated to providing ROI-focused online marketing solution
                    to increase your sales.
                  </p>
                  {/* <a href="#" className="read-more">
                    <span>Read More</span> <i className="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="service-box pink">
                  <i className="ri-discuss-line icon">
                    <AccountTreeIcon />
                  </i>

                  <h3>Start a Project</h3>
                  <p>
                    Helping organizations achieve business excellence through
                    potentially robust & technologies.
                  </p>
                  {/* <a href="#" className="read-more">
                    <span>Read More</span> <i className="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Team</h2>
              <p>Our hard working team</p>
            </header>

            <div className="row gy-4">
              <div
                className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="member">
                  <div className="member-img">
                    <img
                      src="/assets/img/team/team-2.jpg"
                      className="img-fluid"
                      alt=""
                    />

                  </div>
                  <div className="member-info">
                    <h4>Najmal Hassan</h4>
                    <span>MD</span>
                    <p>
                      Najmul Hasan is the MD at Colan Infotech Private Limited.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="member">
                  <div className="member-img">
                    <img
                      src="/assets/img/team/team-4.jpg"
                      className="img-fluid"
                      alt=""
                    />

                  </div>
                  <div className="member-info">
                    <h4>Fairoz Baqth</h4>
                    <span>CEO</span>
                    <p>
                      Fairoz Baqth is the CEO at Colan Infotech Private Limited.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="member">
                  <div className="member-img">
                    <img
                      src="/assets/img/team/team-6.jpg"
                      className="img-fluid"
                      alt=""
                    />

                  </div>
                  <div className="member-info">
                    <h4>Sarfaraz khan</h4>
                    <span>COO</span>
                    <p>
                      Sarfraz Ahmed is the COO at Colan Infotech Private
                      Limited.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="clients" className="clients">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2> Clients</h2>
              <p>Our Clients</p>
            </header>

            <div className="clients-slider swiper">
              <div
                className="swiper-wrapper align-items-center"
                style={{ display: "flex" }}
              >
                <div className="swiper-slide">
                  <img
                    src="/assets/img/clients/client-1.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    src="/assets/img/clients/client-2.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    src="/assets/img/clients/client-3.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    src="/assets/img/clients/client-4.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    src="/assets/img/clients/client-5.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    // src="/assets/img/clients/client-6.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    src="/assets/img/clients/client-7.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="swiper-slide">
                  <img
                    // src="/assets/img/clients/client-8.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Contact</h2>
              <p>Contact Us</p>
            </header>
            <div className="row gy-4">
              <div className="col-lg-12">
                <div className="row gy-4">
                  <div className="col-md-3">
                    <div className="info-box">
                      <i className="bi bi-geo-alt"></i>
                      <h3>Address</h3>
                      <p>
                        Unit-2, D 84, B Block, 4th Floor, Greams Rd, Thousand
                        Lights West, Thousand Lights, Chennai, Tamil Nadu 600006
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="info-box">
                      <i className="bi bi-telephone"></i>
                      <h3>Call Us</h3>
                      <p>
                        {" "}
                        044 4284 4666 <br />
                        +91 78276 67667
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="info-box">
                      <i className="bi bi-envelope"></i>
                      <h3>Email Us</h3>
                      <p>info@colaninfotech.com</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="info-box">
                      <i className="bi bi-clock"></i>
                      <h3>Open Hours</h3>
                      <p>Monday - Friday 24hrs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-lg-6">
                <form
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form"
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="col-md-6 ">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Subject"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows="6"
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message"></div>
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                      <button
                        onClick={handleRedirect}
                        className="btn btn-secondary joinbutton"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div> */}
            </div>
          </div>
        </section>
      </main>

      <InstantMeetLink
        openmeet={openmeet}
        setOpenmeet={setOpenmeet}
        roomname={meetlink}
      />
      <SignOutAlert
        signOutAlert={signOutAlert}
        setSignOutAlert={setSignOutAlert}
        logout={() => { setSignOut(true) }}
      />
    </div>
  );
};

export default User;
