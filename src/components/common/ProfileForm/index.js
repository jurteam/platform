
import { ProfileForm } from "./ProfileForm";

import { updateUserField, updateUser } from "../../../actions/User"; // actions

const mapDispatchToProps = { updateUserField, updateUser };
const mapStateToProps = (state) => ({ user: state.user });

export default global.connection(ProfileForm, mapStateToProps, mapDispatchToProps);
