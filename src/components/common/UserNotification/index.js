import { drizzleConnect } from "drizzle-react";
import { withRouter } from "react-router-dom";
import { UserNotification } from "./UserNotification";

const mapStateToProps = (state) => ({ user: state.user });

export default withRouter(drizzleConnect(UserNotification, mapStateToProps));
