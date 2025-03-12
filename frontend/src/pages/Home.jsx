import hero from "../assets/hero.png";

const Home = () => {
  return (
    <div className="container">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-8">
          <h1 className="display-1">Welcome to Ledger Web</h1>
          <p>
            This is a web application that allows you to easily manage your
            finances by tracking your accounts and their balances.
          </p>
          <p>
            You can add new accounts, update existing ones, and view your
            current balance.
          </p>
        </div>
        <img className="col-4" src={hero} alt="" />
      </div>
    </div>
  );
};

export default Home;
