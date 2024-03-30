import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import { UserService } from "../../services";
import BarChart from "../../components/charts/BarChart"
import Chart from "react-apexcharts";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {
  Logo,
  BTC_logo,
  ETH_logo,
  USDT_logo,
  XRP_logo,
  BCH_logo,
  BSV_logo,
  LTC_logo,
  BNB_logo,
  EOS_logo,
  XTZ_logo,
} from "../../img";
import "../../styles/dashboard.css"

function Ranking() {
  const [topThree, settopThree] = useState([])
  const [topThreeBalance, settopThreeBalance] = useState([])
  const [values, setValues] = useState([])
  const [header, setHeader] = useState("")

  useEffect(() => {
    console.log("Updated topThreeBalance:", topThreeBalance); // See the updated state
    setValues([
      {
        name: "Ranking",
        data: topThreeBalance,
      },
    ]);
  }, [topThreeBalance]);
  const categories = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: header,
      show: false,
      labels: {
        show: true,
        formatter: function (value) {
          // Assuming your value format is "Top X Username"
          // and you want to break it into two lines:
          return value.replace(" ", "\n");
        },
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#4318FF",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(67, 24, 255, 1)",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: true, // Enable data labels
      position: "top",
      offsetY: 130, // Adjust vertical positioning to move data labels above bars
      style: {
        fontSize: '15px',
        colors: ['white'], // Set font color of data labels
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
      },
    },
  };

  useEffect(() => {
    const tempList = []
    const tempListBalance = []
    const headerList = []
    UserService.getAllUsersBalances().then(
      (response) => {
        console.log(response)

        //1st, get user
        //sort
        response.sort((a, b) => b.balance - a.balance);
        let top3Users = response.slice(0, 3);
        tempList.push(...top3Users);
        settopThree(tempList)

        //2nd, get balance
        for (let i = 0; i < tempList.length; i++) {
          tempListBalance.push(tempList[i].balance)
        }
        settopThreeBalance(tempListBalance)
        for (let i = 0; i < tempList.length; i++) {
          headerList.push("Top " + (i + 1) + ": " + tempList[i].username)
        }
        setHeader(headerList)
      }
    ).catch((error) => {
      console.error('Error fetching user balances:', error);
    });
  }, []);

  return (
    <div>
      <Card
        style={{ width: "90%", margin: "auto", backgroundColor: "#061125" }}
      >
        <Chart
          options={categories}
          series={values}
          type='bar'
          width='100%'
          height='130%'
        />
      </Card>
      <br></br>
      <div className="RankingInfo"style={{display:"flex",width:"90%",margin:"auto"}}>
      {topThree.map((top, i) => (
        <Card
          style={{ width: "94%", margin: "auto", backgroundColor: "#061125",margin:"1%" }}
        >
          <Card style={{ width: "90%", margin: "auto", backgroundColor: "#061125", paddingTop: "1.5%" }}>
            <Typography style={{ color: "white", fontSize: "2rem" }}>Information On Top {i + 1} </Typography>
            <CardContent>
              <Typography style={{ color: "white", fontSize: "1.5rem" }}>Coins Owned </Typography>
              <br></br>
              <Box style={{ display: "flex", flexDirection: "row" }}>
                <div >
                  <div>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={BTC_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>Bitcoin: {top.bitcoin} </Typography>
                  </div>
                  <br></br>

                  <div>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={ETH_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>Ethereum: {top.ethereum} </Typography>
                  </div>
                  <br></br>

                  <div>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={USDT_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>Tether: {top.tether} </Typography>
                  </div>
                  <br></br>

                  <div>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={XRP_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>XRP: {top.xrp} </Typography>
                  </div>
                  <br></br>

                  <div>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={BCH_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>Bitcoin Cash: {top.bitcoinCash} </Typography>
                  </div>
                  <br></br>

                  <div>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={BSV_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>Bitcoin SV: {top.bitcoinSV} </Typography>
                  </div>
                  <br></br>

                  <div>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={LTC_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>Litecoin: {top.litecoin} </Typography>
                  </div>
                  <br></br>

                  <div style={{width:"110%"}}>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={BNB_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>Binance Coin: {top.binancecoin} </Typography>
                  </div>
                  <br></br>
                  <div>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={EOS_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>EOS: {top.eos} </Typography>
                  </div>
                  <br></br>

                  <div>
                    <div className="d-inline" style={{ paddingRight: "2%" }}>
                      <img
                        src={XTZ_logo}
                        alt="XRP logo"
                        style={{width:"40px",height:"40px"}}
                      ></img>
                    </div>
                    <Typography className="d-inline" style={{ color: "white" }}>Tezos: {top.tezos} </Typography>
                  </div>
                  </div>
              </Box>
            </CardContent>
          </Card>
          
        </Card>
        
      ))}
      </div>
    </div>
  )
}

export default Ranking