import "./MainPage.css";
import LeftColumn from "../LeftColumn/LeftColumn";
import Feed from "../Feed/Feed";

function MainPage() {
  return (
    <section className="mainpagesection">
      <LeftColumn />
      <Feed />
    </section>
  );
}

export default MainPage;
