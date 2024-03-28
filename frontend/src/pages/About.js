// imports
import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { UserService, AuthService } from "../services";
import { Logo } from "../img";

// component About
export default class About extends React.Component {
  /**
   * constructor of About
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      message: "",
    };
  }

  /**
   * executes on mount
   */
  componentDidMount() {
    this.getBalance();
  }

  /**
   * gets user balance from backend
   */
  getBalance() {
    UserService.getUserBalance(this.state.currentUser.username).then(
      (response) => {
        this.setState({
          currentUSD: response.balance.toFixed(2),
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          message: resMessage,
        });
      }
    );
  }

  /**
   * handles logout
   * @param {Event} e
   */
  handleLogout(e) {
    e.preventDefault();
    AuthService.logout();
    window.location.reload();
  }

  /**
   * render-function of About
   */
  render() {
    const { currentUser, currentUSD } = this.state;

    if (currentUser == null) {
      this.props.history.push("/login");
      window.location.reload();
    }

    return (
      <Container fluid>
        <Navbar className="z-100" id="navbar">
          <Navbar.Brand href="./">
            <img src={Logo} alt="PaperCoin" />
          </Navbar.Brand>
          <Nav className="mr-auto w-100">
            <Button href="./dashboard" className="w-15 ml-4">
              Dashboard
            </Button>
            <Button href="./about" className="w-15 ml-4">
              About
            </Button>
          </Nav>
          <Navbar.Text className="w-20 text-light mr-2">
            Your Balance:
          </Navbar.Text>
          <Navbar.Text className="text-light mr-4 ml-n4">
            ${currentUSD}
          </Navbar.Text>
          <Button className="w-15" onClick={this.handleLogout}>
            Logout
          </Button>
        </Navbar>

        <Row
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "calc(100vh - 76px)",
            marginBottom: "0px",
            margin: "0",
            padding: "0",
          }}
        >
          <Col
            md="12"
            className="h-200 m-0 p-0 pb-2 pl-2 pr-2 d-flex justify-content-center align-items-center"
          >
          <div
            className="rounded w-70 h-100 pl-5 pr-5 bg-dark text-light text-center"
            style={{ border: "2px solid grey", fontSize: "30px" }} // Adjusted font size to 24px
          >
              <h1 className="h-25 d-flex justify-content-center align-items-center">
                Welcome to the Crypto Traders Challenge!
              </h1>
              <br></br>
              <b className="text-primary">About us</b>
                <br></br>
                <br></br>
              <div className="h-75" style={{ fontSize: "25px" }}>
                In our blockchain SIG, we are dedicated to showcase the use of blockchain technology to create a demo crypto trading platform in a realistic and risk free trading environment!
                this is one of the few initiatives designed to empower you guys to have interest in learning how to create and learn about decentralised applications like these!
                <br></br>
                <br></br>
                <b className="text-primary" style={{ fontSize: "30px" }}>How to win?</b>
                <br></br>
                <br></br>
                Trade according to the style of the market! Everyone will start with $10000 in coins, and you can buy/sell the stock to any amount you want! Be sure to cash out on time though!
                <br></br>
                <br></br>
                Top 3 Traders with the most points by the end of FMO will Win Starbucks Gift Cards! Trade smart, strategize wisely, and aim for the top!
                <br></br>
                <br></br>
                <b className="text-primary" style={{ fontSize: "30px" }}>But that's just the beginning...</b>
                <br></br>
                <br></br>
                The Crypto Traders Challenge is just one facet of what our SIG has to offer. Joining us opens doors to a plethora of experiences beyond trading:
                <br></br>
                <br></br>
                Events: Engage in insightful discussions, network with industry professionals, and stay updated with the latest trends through our diverse range of events.
                <br></br>
                <br></br>
                Hackathons: Sharpen your coding skills and work collaboratively to tackle real-world problems in our hackathons. Whether you're a seasoned developer or just starting, there's a place for you in our hackathon community.
                <br></br>
                <br></br>
                Workshops: Dive deep into emerging technologies like <b className="text-primary">NFTs</b> and explore the potential of Web3 applications through our hands-on workshops. Gain practical skills that are in high demand in today's digital landscape.  
                <br></br>
                <br></br>
                If you ever need help with instructions, do find us at the Analytics Section in level 3 near the FYP lab!
                <br></br>
                <br></br>
                <b className="text-primary" style={{ fontSize: "30px" }}>Join us today!</b>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
