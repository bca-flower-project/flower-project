// import React from "react";
// import Nav from "./Nav";
// import DarkModeNav from "./DarkModeNav";
// import {database} from "./fire";
// import {useState, useEffect} from "react";
//import BlankFlower from "./BlankFlower";
// export default function Global(props) {
//   const [GlobalFlower, setGlobalFlower] = useState(null);
//   const [loading, setLoading] = useState(false);
//   async function flowerGlobe(id) {
//       console.log(props.user.uid);
//       const ref = database
//         .collection("Global")
//         
  
//       setLoading(true);
  
//       await ref.get().then((item) => {
//         const items = item.docs.map((doc) => doc.data());
//         console.log(item.docs);
//         setGlobalFlower(items);
//         setLoading(false);
//       });
//     }
//     useEffect(async () => {
//       pastFlowers();
//     }, []);
//     if (loading) {
//       return <h1>Loading....</h1>;
//     }
//     console.log(setGlobalFlower);
  
//     return (
//       <div>
//         {props.theme === "dark" ? <DarkModeNav /> : <Nav />}
//         <h1>Your growing garden</h1>
//         {setGlobalFlower.map((flower, index) => {
//           return (
//             <div>
//               <BlankFlower
//                 colorOne={flower.PeaksColor}
//                 colorTwo={flower.AspirationsColor}
//                 colorThree={flower.PeopleColor}
//                 colorFour={flower.PrinciplesColor}
//                 colorFive={flower.PowerColor}
//                 colorSix={flower.ChallengesColor}
//               />
//             </div>
//               );
//             })}
//             </div>
//     )}