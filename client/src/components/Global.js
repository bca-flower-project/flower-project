// import React from "react";
// import Nav from "./Nav";
// import DarkModeNav from "./DarkModeNav";
// import {database} from "./fire";
// import {useState, useEffect} from "react";

// export default function Global(props) {
//   const [GlobalFlower, setGlobalFlower] = useState(null);
//   const [loading, setLoading] = useState(false);
//   async function flowerGlobe(id) {
//       console.log(props.user.uid);
//       const ref = database
//         .collection("user")
//         .doc(props.user.uid)
//         .collection("flower");
  
//       setLoading(true);
  
//       await ref.get().then((item) => {
//         const items = item.docs.map((doc) => doc.data());
//         console.log(item.docs);
//         setPreviousFlower(items);
//         setLoading(false);
//       });
//     }
//     useEffect(async () => {
//       pastFlowers();
//     }, []);
//     if (loading) {
//       return <h1>Loading....</h1>;
//     }
//     console.log(previousFlower);
  
//     return (
//       <div>
//         {props.theme === "dark" ? <DarkModeNav /> : <Nav />}
//         <h1>Your growing garden</h1>
//         {previousFlower.map((flower, index) => {
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