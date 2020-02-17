import { Faq } from "./Faq";


const mapStateToProps = (state) => ({ faqs: state.app.faqs });

export default global.connection(Faq, mapStateToProps);
