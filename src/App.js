import "./App.css";
import Quiz from "./Quiz";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <Header />
      <div className="App">
        <Quiz />
      </div>
      <Footer />
    </div>
  );
}

export default App;
