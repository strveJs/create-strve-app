import router from "./router/index";
import "./styles/app.css";

export default () => <div class="inner">{router.view()}</div>;
