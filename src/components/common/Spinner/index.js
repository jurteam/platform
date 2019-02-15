import { drizzleConnect } from "drizzle-react";
import { Spinner } from "./Spinner";

const mapStateToProps = state => ({
  app: state.app
});

export default drizzleConnect(Spinner, mapStateToProps);
