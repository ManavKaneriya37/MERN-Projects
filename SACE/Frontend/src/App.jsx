import AllRoutes from "./routes/AllRoutes";
import "./App.css";
import UserContext from "../contexts/UserContext";

function App() {
  return (
    <>
      <UserContext>
        <AllRoutes />
      </UserContext>
    </>
  );
}

export default App;
