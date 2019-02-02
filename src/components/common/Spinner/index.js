import { connect } from "react-redux";
import { Spinner } from "./Spinner";

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps)(Spinner);
