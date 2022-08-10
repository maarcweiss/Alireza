import "sf-font";
import { Text, Row, Spacer, Container, Col } from "@nextui-org/react";

export default function Footer() {
  const footer2 = [
    {
      id: 1,
      img: "bsc.png",
    },
    {
      id: 2,
      img: "polygonwhite.png",
    },
    {
      id: 3,
      img: "ethereumlogo.png",
    },
    {
      id: 4,
      img: "avax.jpg",
    },
    {
      id: 5,
      img: "cronos.png",
    },
    {
      id: 6,
      img: "ftm.png",
    },
    {
      id: 7,
      img: "harmony.png",
    },
    {
      id: 8,
      img: "rose.png",
    },
    {
      id: 9,
      img: "velas.png",
    },
    {
      id: 10,
      img: "moon.png",
    },
  ];

  return (
    <div>
      <Spacer></Spacer>
      <Container style={{ borderTop: "9px solid #B22222" }}>
        <Container md gap={7}>
          <Spacer></Spacer>
          <Row gap={3}>
            <Col>
              <a href="/">
                <Text
                  h2
                  style={{
                    color: "#fff",
                    fontSmooth: "always",
                    textShadow: "-0px 0px 0px #ffffff",
                    fontFamily: "SF Pro Display",
                    fontWeight: "600",
                    textAlign: "right",
                  }}
                >
                  NFTSolution.Network
                </Text>
              </a>
            </Col>
          </Row>
          <Row gap={7}>
            <Col>
              <Text
                style={{
                  marginTop: "3px",
                  position: "fixed",
                  bottom: "0",
                  marginLeft: "170px",
                  padding: "0px 0px",
                }}
                h4
              >
                Our Partners!
              </Text>
            </Col>
            <Col
              style={{ marginLeft: "300px", position: "fixed", bottom: "0" }}
            >
              <Text
                style={{
                  marginTop: "3px",
                  position: "fixed",
                  bottom: "0",
                  marginLeft: "170px",
                  padding: "0px 0px",
                }}
                h4
              >
                Integrations
              </Text>
              <ul>
                {footer2.map((item, idx) => {
                  return (
                    <img
                      src={item.img}
                      style={{
                        marginRight: "5px",
                        bottom: "0",
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                      }}
                    ></img>
                  );
                })}
              </ul>
            </Col>
            <Col style={{ marginLeft: "5px", position: "fixed", bottom: "0" }}>
              <Text h4>Follow Us!</Text>
              <a href="">
                <img
                  src="discordlogo.png"
                  style={{
                    width: "30px",
                    position: "fixed",
                    bottom: "0",
                    width: "3%",
                    marginLeft: "80px",
                    marginRight: "80px",
                    padding: "30px 0px",
                  }}
                />
              </a>
              <a href="https://www.instagram.com/nftaggregator/">
                <img
                  src="InstagramIcon.png"
                  style={{
                    width: "30px",
                    position: "fixed",
                    bottom: "0",
                    width: "3%",
                    padding: "30px 0px",
                  }}
                />
              </a>
              <a href="https://www.linkedin.com/company/nftsolution-network/">
                <img
                  src="linkedin.png"
                  style={{
                    width: "30px",
                    position: "fixed",
                    bottom: "0",
                    width: "3%",
                    marginLeft: "40px",
                    padding: "30px 0px",
                  }}
                />
              </a>
              <a href="https://nftsolution.medium.com/">
                <img
                  src="medium.png"
                  style={{
                    width: "30px",
                    position: "fixed",
                    bottom: "0",
                    width: "3%",
                    marginLeft: "1200px",
                    padding: "30px 0px",
                  }}
                />
              </a>
            </Col>
          </Row>
          <Row gap={3}>
            <Text
              style={{
                marginBottom: "80px",
                position: "fixed",
                bottom: "0",
                marginLeft: "170px",
                padding: "0px 0px",
              }}
              h4
            >
              ©2022 NFTSolution.Network, All Rights Reserved.
            </Text>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
