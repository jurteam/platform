import { drizzleConnect } from "drizzle-react";
import { ProfileForm } from "./ProfileForm";

import { updateUserField, updateUser } from "../../../actions/User"; // actions

const mapDispatchToProps = { updateUserField, updateUser };
const mapStateToProps = state => ({ user: state.user });

export default drizzleConnect(ProfileForm, mapStateToProps, mapDispatchToProps);
