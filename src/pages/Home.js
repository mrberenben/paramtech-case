import { useSelector } from "react-redux";

const HomePage = () => {
  const auth = useSelector(state => state.auth);

  console.log(auth);

  return <div className="home">homepage</div>;
};

export default HomePage;
