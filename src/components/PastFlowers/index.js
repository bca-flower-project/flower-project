import React, { useContext, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import fire from "../../config/fire";
import BlankFlower from "../BlankFlower";
import QuestionsAnswers from "./QuestionsAnswers";
import "./PastFlowers.scss";
import { AppThemeContext } from "../../contexts/AppThemeContext";

const { database } = fire;

export default function PastFlowers(props) {
  const { theme } = useContext(AppThemeContext);
  const [previousFlowers, setPreviousFlowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [selectedGroup, setSelectedGroup] = useState("my-flowers");
  const [displaySortFilter, setDisplaySortFilter] = useState(false);
  const [sortFlowers, setSortFlowers] = useState("desc");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function pastFlowers() {
      const ref = database
        .collection("user")
        .doc(currentUser.uid)
        .collection("flower")
        .orderBy("createdAt");

      setLoading(true);

      await ref.get().then((item) => {
        const items = item.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPreviousFlowers(items.reverse());
        setLoading(false);
      });
    }

    if (currentUser) {
      pastFlowers();
    }
  }, [currentUser]);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  const toggleSortFilter = async (e) => {
    e.preventDefault();
    if(displaySortFilter) {
      setDisplaySortFilter(false);
    } else {
      setDisplaySortFilter(true);
    }
  };

  const toggleFlowers = async (group) => {
    if(group == "my-flowers") {
      setSelectedGroup("my-flowers");
    } else if(group == "sent-flowers") {
      setSelectedGroup("sent-flowers");
    } else if(group == "received-flowers") {
      setSelectedGroup("received-flowers");
    } else {
      setSelectedGroup("all-flowers");
    }
  }

  const toggleSort = async (sort) => {
    if((sortFlowers === "asc") && (sort === "desc")) {
      setSortFlowers("desc");
      setPreviousFlowers(previousFlowers.reverse());
    } else if((sortFlowers === "desc") && (sort === "asc")){
      setSortFlowers("asc");
      setPreviousFlowers(previousFlowers.reverse());
    }
  }

  return (
    <Container fluid className={`View ${theme}`}
      style={{
        maxWidth: "1400px"
      }}
    >
      <div className="show-parent-container">
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
          className="show-parent-child-container"
        >
          <span className="show-label">Show:</span>
          <div className="show-container">
            <div className="show-btn"
              style={{
                border: selectedGroup == "my-flowers" ? "solid 1px yellow" : "solid 1px"
              }}
              onClick={(e) => {
                e.preventDefault();
                toggleFlowers("my-flowers");
              }}
            >My Flowers</div>
            <div className="show-btn"
              style={{
                border: selectedGroup == "sent-flowers" ? "solid 1px yellow" : "solid 1px"
              }}
              onClick={(e) => {
                e.preventDefault();
                toggleFlowers("sent-flowers");
              }}
            >Sent Flowers</div>
            <div className="show-btn"
              style={{
                border: selectedGroup == "received-flowers" ? "solid 1px yellow" : "solid 1px"
              }}
              onClick={(e) => {
                e.preventDefault();
                toggleFlowers("received-flowers");
              }}
            >Received Flowers</div>
            <div className="show-btn"
              style={{
                border: selectedGroup == "all-flowers" ? "solid 1px yellow" : "solid 1px"
              }}
              onClick={(e) => {
                e.preventDefault();
                toggleFlowers("all-flowers");
              }}
            >All</div>
          </div>
        </div>
        <div className="sort-container" onClick={toggleSortFilter}>
          <div className="sort-btn">Sort by Date</div>
          <div className="sort-btn">&#9660;</div>
          {displaySortFilter ? <div className="sort-filters">
            <div 
              className="sort-filters-child"
              onClick={(e) => {
                e.preventDefault();
                toggleSort("desc");
              }}
              style={{
                border: sortFlowers == "desc" ? "solid 1px yellow" : "solid 1px"
              }}
            >Newest to Oldest</div>
            <div 
              className="sort-filters-child"
              onClick={(e) => {
                e.preventDefault();
                toggleSort("asc");
              }}
              style={{
                border: sortFlowers == "asc" ? "solid 1px yellow" : "solid 1px"
              }}
            >Oldest to Newest</div>
          </div> : <></>}
        </div>
      </div>
      {previousFlowers.map((flower, index) => {
        const {
          id,
          PeaksColor,
          AspirationsColor,
          PeopleColor,
          PrinciplesColor,
          PowersColor,
          ChallengesColor,
          PeaksQuestion,
          Peaks,
          AspirationsQuestion,
          Aspirations,
          PeopleQuestion,
          People,
          PrinciplesQuestion,
          Principles,
          PowersQuestion,
          Powers,
          ChallengesQuestion,
          Challenges,
        } = flower;

        const isValid = !Object.values({
          PeaksColor,
          AspirationsColor,
          PeopleColor,
          PrinciplesColor,
          PowersColor,
          ChallengesColor,
          PeaksQuestion,
          Peaks,
          AspirationsQuestion,
          Aspirations,
          PeopleQuestion,
          People,
          PrinciplesQuestion,
          Principles,
          PowersQuestion,
          Powers,
          ChallengesQuestion,
          Challenges,
        }).includes(undefined);

        const date = new Date(1970, 0, 1);
        date.setSeconds(flower.createdAt.seconds);

        return (
          <div key={`flower-${index}`} className="flower-row">
            <div className="flower">
              <BlankFlower
                colorOne={PeaksColor}
                colorTwo={ChallengesColor}
                colorThree={PeopleColor}
                colorFour={PrinciplesColor}
                colorFive={PowersColor}
                colorSix={AspirationsColor}
              />
            </div>
            <div className="flower-response">
              {!isValid && <Link to={`/create/${id}/edit`}>Edit</Link>}
              <QuestionsAnswers
                date={date}
                peaksQuestion={PeaksQuestion}
                peaksAnswer={Peaks}
                aspirationsQuestion={AspirationsQuestion}
                aspirationsAnswer={Aspirations}
                peopleQuestion={PeopleQuestion}
                peopleAnswer={People}
                principleQuestion={PrinciplesQuestion}
                principleAnswer={Principles}
                powersQuestion={PowersQuestion}
                powerAnswer={Powers}
                challengesQuestion={ChallengesQuestion}
                challengesAnswer={Challenges}
              />
            </div>
          </div>
        );
      })}
    </Container>
  );
}