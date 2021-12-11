import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import logo from './logo.svg';
import './styles/App.css';

import LeftContainer from './components/leftContainer';
import BottomContainer from './components/bottomContainer';
import Example from "./components/map";

// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// this.state = {
//   title: DEFAULT_TITLE,
// };
// this.openCityData = this.openCityData.bind(this);
// this.openCityList = this.openCityList.bind(this);
// 	}

function App()
{
  return (
    <div className="App">
      <LeftContainer>
      </LeftContainer>
      <Example/>
    </div>
  );
}

export default App;
