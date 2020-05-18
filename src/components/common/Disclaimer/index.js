
import { Disclaimer } from "./Disclaimer";
import { DisclaimerModal } from "./DisclaimerModal";

import {
  disclaimerView,
  disclaimerAccept,
  disclaimerDecline
} from "../../../actions"; // actions


const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = {
  disclaimerView,
  disclaimerAccept,
  disclaimerDecline
};

export const ModalDiscliamer = global.connection(
  DisclaimerModal,
  mapStateToProps,
  mapDispatchToProps
);
export default global.connection(Disclaimer, mapStateToProps, mapDispatchToProps);
