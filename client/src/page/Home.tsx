import ListTest from "../components/ListTest";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Playgame from "../layout/Playgame";

export default function Home() {
  return (
    <>
      <Navbar type="home" />
      <div className="height-[100vh] bg-white-600">
        <Playgame></Playgame>
        <div className="list flex justify-center  bg-white">
          <ListTest />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
