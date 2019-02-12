import { connect } from "react-redux";
import { Header } from "./Header";

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps)(Header);
