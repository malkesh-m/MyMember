import React from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";

import UserModal from "./stripModal";
import { Edit, Trash } from "react-feather";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { connect } from "react-redux";
import { getStripeList, trashStripe } from "../../../../redux/actions/stripe";

class StripeList extends React.Component {
  //get api
  getPost() {
    let token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/api/list_of_stripe/${localStorage.getItem(
        "user_id"
      )}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((responseData) => {
        console.log(
          "###################################################",
          responseData
        );
      })
      .catch((error) => console.log({ error }));
  }

  //get api
  getProgram() {
    let token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/api/stripe_info/${localStorage.getItem(
        "user_id",
        "stripeId"
      )}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((responseData) => {
        console.log(
          "###################################################",
          responseData
        );
      })
      .catch((error) => console.log({ error }));
  }

  // post api

  createPost() {
    let token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/api/add_manage_stripe/${localStorage.getItem(
        "userId",
        "sId"
      )}`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((responseData) => {
        console.log(
          "###################################################",
          responseData
        );
      })
      .catch((error) => console.log({ error }));
  }

  //put api
  updatePost() {
    let token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/api/update_manage_stripe/${localStorage.getItem(
        "userId",
        "manage_stripeId"
      )}`,
      {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((responseData) => {
        console.log(
          "###################################################",
          responseData
        );
      })
      .catch((error) => console.log({ error }));
  }
  //delete  api
  deletePost() {
    let token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/api/delete_manage_stripe/${localStorage.getItem(
        "userId",
        "manage_stripeId"
      )}`,
      {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((responseData) => {
        console.log(
          "###################################################",
          responseData
        );
      })
      .catch((error) => console.log({ error }));
  }
  componentDidMount() {
    this.props.getStripeList();
    this.getPost();
    this.createPost();
    this.updatePost();
    this.deletePost();
    this.getProgram();
  }
  state = {
    handleUpdateTask: null,
  };

  render() {
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <CardHeader>
              <UserModal />
            </CardHeader>
            <CardBody>
              <Row style={{ backgroundColor: "#F5F5F5" }}>
                <Col>
                  <br></br>
                  <h5 style={{ fontSize: "20px" }}>Stripes</h5>
                  <br></br>
                </Col>
              </Row>
              <Row style={{ backgroundColor: "#F5F5F5" }}>
                {/* {console.log(this.props.stripe)} */}
                {this.props.stripe?.stripeList.length > 0 &&
                  this.props.stripe?.stripeList.reverse().map((v, i) => (
                    <Col lg="3" md="12" key={v._id}>
                      <Card>
                        <CardHeader
                          style={{
                            background: `${v.color}`,
                            padding: "5px 10px",
                          }}
                        >
                          <h6
                            style={{
                              color: "#fff",
                              margin: "0",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                          >
                            {v.stripeName}
                          </h6>
                          <div>
                            <Edit size="18" color="#fff" />
                            <Trash
                              size="18"
                              color="#fff"
                              onClick={(e) => {
                                e.stopPropagation();
                                this.props.trashStripe(v._id);
                                console.log("ljlkhj");
                              }}
                            />
                          </div>
                        </CardHeader>
                        <CardBody style={{ padding: "10px" }}>
                          <Row>
                            <Col>
                              <p>Total Stripe:</p>
                            </Col>
                            <Col>{`${v.total_stripe}`}</Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>Lable:</p>
                            </Col>
                            <Col>{v.lable}</Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>Progression:</p>
                            </Col>
                            <Col>
                              <p>{v.progression}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>Candidate:</p>
                            </Col>
                            <Col>
                              <p>{v.candidate}</p>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stripe: state.stripe,
  };
};
export default connect(mapStateToProps, { getStripeList, trashStripe })(
  StripeList
);
