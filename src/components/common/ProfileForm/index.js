import { drizzleConnect } from "drizzle-react";
import { ProfileForm } from './ProfileForm';

const mapStateToProps = state => ({ wallet: state.wallet });

export default drizzleConnect(ProfileForm, mapStateToProps);