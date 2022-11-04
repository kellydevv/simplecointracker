//성공(사용)
//1. SC안에 또다른 SC 선택하기
//2. 컴포넌트의 스타일은 그대로 태그만 바꾸기(as사용)
//3. SC props 보내기
//4.state selector 설정바꾸기

//실패
//1. keyframes사용해서 animationrotate실행하기

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

function App() {
  const [loading, setLoading] = useState(true);
  //3. json에 담긴 data를 우리의 component로 보여주려면 state에 담으면 된다.
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    //1.fetch한 사이트에서 response로 json을 추출하고 싶다면
    //2 .then하고 response를 받아서 response.json을 return해줌
    //4.  .then을 써서 그json의 값을 setCoins해줌.
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const Father = styled.div`
    height: 300px;
    width: 1000px;
    background-color: purple;
  `;

//애니메이션 기능 넣기 실패
//   const rotation = keyframes`
// 0% {
//   transform:rotate(0deg);
//   border-radius:0px;
// }
// 50% {
// transform:rotate(360deg);
// border-radius:100px;
// }
// 100% {
// transform:rotate(0deg);
// border-radius:0px;
// }
// `;

  const Emoji = styled.span`
font-size:20px;
`;

  const Header = styled.div`
    color: blue;
    background-color: ${(props) => props.bgColor};
    width: ${(props) => props.width};
    ${Emoji} {
      &:hover {
        font-size: 20px;
        opacity: 20%;
      }
    }
  `;

  return (
    <Father>
      <Header as="h1" bgColor="pink">
        The Coins! <Emoji as="a" href="/">💰</Emoji>
      </Header>
      <Header as="h3" bgColor="white" width="70px">
        {loading ? "" : `(${coins.length})`}
      </Header>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </Father>
  );
};

export default App;
