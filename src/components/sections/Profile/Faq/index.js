import { Faq } from "./Faq";
import { drizzleConnect } from "drizzle-react"

const mapStateToProps = (state) => ({ faqs: state.app.faqs });

export default drizzleConnect(Faq, mapStateToProps);
