import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { UserService, AuthService } from "../services";
import { Logo } from "../img";

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      currentUSD: 0,
      message: "",
    };
  }

  componentDidMount() {
    this.getBalance();
  }

  getBalance() {
    const { currentUser } = this.state;
    if(currentUser) {
      UserService.getUserBalance(currentUser.username).then(
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
  }

  handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
    window.location.reload();
  };

  render() {
    const { currentUser, currentUSD } = this.state;

    if (!currentUser) {
      this.props.history.push("/login");
      window.location.reload();
      return null;
    }

    return (
      <Container fluid>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="./">
            <img src={Logo} alt="PaperCoin" />
          </Navbar.Brand>
          <Navbar.Text className="text-light mr-2">
            Your Balance: ${currentUSD}
          </Navbar.Text>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Button href="./dashboard" className="btn btn-outline-light ml-4">
                Dashboard
              </Button>
              <Button href="./about" className="btn btn-outline-light ml-4">
                About
              </Button>
            </Nav>
            <Nav className="ml-auto">
              <Button className="btn btn-outline-light ml-4" onClick={this.handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8}>
            <div className="rounded bg-dark text-light text-center p-3" style={{ fontSize: '25px' }}>
              <h1>Welcome to the Crypto Traders Challenge!</h1>
              <br />
              <b className="text-primary">About us</b>
              <br />
              <br />
              <div>
                In our blockchain SIG, we are dedicated to showcasing the use
                of blockchain technology to create a demo crypto trading
                platform in a realistic and risk-free trading environment! This
                is one of the few initiatives designed to empower you guys to
                have interest in learning how to create and learn about
                decentralized applications like these!
                <br />
                <br />
                <b className="text-primary">How to win?</b>
                <br />
                <br />
                Trade according to the style of the market! Everyone will start
                with $10000 in coins, and you can buy/sell the stock to any
                amount you want! Be sure to cash out on time though!
                <br />
                <br />
                Top 3 Traders with the most points by the end of FMO will Win
                Starbucks Gift Cards! Trade smart, strategize wisely, and aim
                for the top!
                <br />
                <br />
                <b className="text-primary">But that's just the beginning...</b>
                <br />
                <br />
                The Crypto Traders Challenge is just one facet of what our SIG
                has to offer. Joining us opens doors to a plethora of
                experiences beyond trading:
                <br />
                <br />
                Events: Engage in insightful discussions, network with industry
                professionals, and stay updated with the latest trends through
                our diverse range of events.
                <br />
                <br />
                Hackathons: Sharpen your coding skills and work collaboratively
                to tackle real-world problems in our hackathons. Whether
                you're a seasoned developer or just starting, there's a place
                for you in our hackathon community.
                <br />
                <br />
                Workshops: Dive deep into emerging technologies like{" "}
                <b className="text-primary">NFTs</b> and explore the potential
                of Web3 applications through our hands-on workshops. Gain
                practical skills that are in high demand in today's digital
                landscape.
                <br />
                <br />
                If you ever need help with instructions, do find us at the
                Analytics Section in level 3 near the FYP lab!
                <br />
                <br />
                <b className="text-primary">Join us today!</b>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
