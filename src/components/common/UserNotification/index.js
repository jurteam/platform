
import { withRouter } from "react-router-dom";

// import { drizzleConnect } from "drizzle-react";
import { UserNotification } from "./UserNotification";

const mapStateToProps = (state) => ({ user: state.user });

export default withRouter(global.connection(UserNotification, mapStateToProps));
