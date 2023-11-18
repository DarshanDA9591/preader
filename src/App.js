import React, { useState } from "react";
import "./App.css";
import Analysis from "./component/Analysis";
import Mannual from "./component/Mannual";
function App() {
  const [currentComponent, setCurrentComponent] = useState("Analysis");

  const navigateToAnalysis = () =>{
    setCurrentComponent("Analysis")
  };

  const navigateToMannual = ()=>{
    setCurrentComponent("Mannual");
  }
  return(
   <div>
   {currentComponent==="Analysis" && <Analysis navigate={navigateToMannual}/>}
   {currentComponent==="Mannual" && <Mannual navigate={navigateToAnalysis}/>}
   </div>
);
}
export default App;
