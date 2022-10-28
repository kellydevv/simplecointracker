import {useEffect, useState} from "react";

function App() {
  const[loading,setLoading]=useState(true);
  //3. json에 담긴 data를 우리의 component로 보여주려면 state에 담으면 된다.
  const[coins,setCoins]= useState([]);

  useEffect(() =>{
    //1.fetch한 사이트에서 response로 json을 추출하고 싶다면
    //2 .then하고 response를 받아서 response.json을 return해줌
    //4.  .then을 써서 그json의 값을 setCoins해줌.
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response=> response.json())
    .then((json)=>{
      setCoins(json);
      setLoading(false);
    });
      }, []);
  
  return(
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>loading...</strong>: <select>
        {coins.map((coin) => (
        <option>
          {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
          </option>
          ))}
      </select>}
    </div>
  );
};

export default App;
