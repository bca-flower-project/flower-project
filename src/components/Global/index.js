import React, { useState, useEffect, useContext } from "react";
import fire from "../../config/fire";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./Global.scss";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import { useHistory } from "react-router-dom";
import BlankFlower from "../BlankFlower";
import birthdayFlower from "../icons/birthdayFlower.svg";
import { AuthContext } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import { Link } from "react-router-dom";

const { database } = fire;

export default function Global(props) {
  const { theme } = useContext(AppThemeContext);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [viewFriends, setViewFriends] = useState({
    headers: [],
    contents: []
  });
  const [oldViewFriends, setOldViewFriends] = useState({
    headers: [],
    contents: []
  });
  const [viewNotifications, setViewNotifications] = useState({
    headers: [],
    contents: []
  });
  const [canInvite, setCanInvite] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [GlobalFlower, setGlobalFlower] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(null);
  const [friendsEmail, setFriendsEmail] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [firstRender, setFirstRender] = useState(false);
  const [friendSearch, setFriendSearch] = useState("");
  const [displayViewFriends, setDisplayViewFriends] = useState(true);
  const [displayAddFriends, setDisplayAddFriends] = useState(false);
  const [displayNotifications, setDisplayNotifications] = useState(false);


  function notificationsList() {
    const ref = database.collection("user").doc(currentUser.uid).collection("notifications").where('read', '==', false);

    ref.get().then((item) => {
      const items = item.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setViewNotifications({
        headers: ["Name", "Date", "Type"],
        contents: items
      });
    });
  }

  async function friendsList() {
    const ref = await database.collection("user").doc(currentUser.uid).collection("friends").get();
    
    const items = ref.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setViewFriends({
      headers: ["Name", "Birthday", "Send Flower"],
      contents: items
    });

    setOldViewFriends({
      headers: ["Name", "Birthday", "Send Flower"],
      contents: items
    });
  }

  async function flowerGlobe() {
    const ref = await database.collection("Global").orderBy("createdAt").get();
    
    const items = ref.docs.map((doc) => doc.data());
    setGlobalFlower(items);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    friendsList();
    notificationsList();
    flowerGlobe();
  }, []);

  useEffect(() => {
    if(firstRender) {
      const timeOutId = setTimeout(async () => {
        const friends = oldViewFriends.contents;

        var result = friends.filter(function (el) {
          if(el.name.toLowerCase().includes(friendSearch.toLowerCase())) {
            return el;
          }
        });
        
       if(friendSearch === "") {
        setViewFriends(oldViewFriends);
       } else {
        setViewFriends({
          headers: (result.length > 0) ? ["Name", "Birthday", "Send Flower"] : [],
          contents: result
        });
       }
      }, 1000);

      return () => clearTimeout(timeOutId);
    } else {
      setFirstRender(true);
    }
  }, [friendSearch]);

  const handleFriendSearch = async (e) => {
    e.preventDefault();
    setFriendSearch(e.target.value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
      if(friendsEmail.match(mailformat) && (userData.email != friendsEmail)) {
        // const ref = database.collection("user");
        // await ref.get().then((item) => {
        //   const items = item.docs.map((doc) => doc.data().email);
        //   database.collection("ciee").doc(process.env.REACT_APP_FIREBASE_CIEE_DOC_ID).update({emails: firebase.firestore.FieldValue.arrayUnion(...items)})
        // });
        const ref = database.collection("ciee").doc(process.env.REACT_APP_FIREBASE_CIEE_DOC_ID);
        await ref.get().then((item) => {
          setBadEmail(false);
          if(item.data().emails.includes(friendsEmail)) {
            setCanInvite(false);
            setCanAdd(true);
          } else {
            setCanAdd(false);
            setCanInvite(true);
          }
        });
      } else {
        setCanAdd(false);
        setCanInvite(false);
        if(friendsEmail.length > 0) setBadEmail(true);
      }
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [friendsEmail]);

  const handleEmailInput = async (e) => {
    e.preventDefault();
    setFriendsEmail(e.target.value);
  };

  const checkFriendRequestExists = async (senderUid, recipientEmail) => {
    const ref = await database.collection("friendRequest")
                .where('sender', '==', senderUid)
                .where('recipient', '==', recipientEmail).get();

    const _ref = await database.collection("friendRequest")
                .where('senderEmail', '==', recipientEmail)
                .where('recipient', '==', userData.email).get();

    if(ref.empty && _ref.empty) {
      return false;
    }

    return true;
  }

  const addFriend = async () => {
    if(canInvite) {
      await database.collection("invitation").add({
        sender: currentUser.uid,
        senderEmail: userData.email,
        senderName: userData.name,
        recipient: friendsEmail
      });

      setBadEmail(false);
      setShowSuccess(`Invite was successfully sent to ${friendsEmail}`);
      setTimeout(() => {
        setFriendsEmail("");
      }, 3000);
    } else if(canAdd) {
      if(!await(checkFriendRequestExists(currentUser.uid, friendsEmail))) {
        await database.collection("friendRequest").add({
          sender: currentUser.uid,
          senderEmail: userData.email,
          senderName: userData.name,
          senderDOB: userData.dateOfBirth,
          recipient: friendsEmail,
          status: 'Pending',
          createdAt: firebase.firestore.Timestamp.now()
        });
        
        setBadEmail(false);
        setShowSuccess(`Friend Request was successfully sent to ${friendsEmail}`);

        setTimeout(() => {
          setFriendsEmail("");
        }, 3000);
      } else {
        setBadEmail(false);
        setShowSuccess(`Friend Request already exists!`);

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
    }
  };

  const getUser = async (user) => {
    const ref = database.collection("user").doc(user.uid);
    await ref.get().then((item) => {
      setUserData(item.data());
    });
  };

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser]);

  const formatDOB = (dob) => {
    const formattedDOB = dob.split("-");
    return `${parseInt(formattedDOB[1])}/${parseInt(formattedDOB[2])}/${parseInt(formattedDOB[0])}`
  }

  const formatTimestamp = (_date) => {
    const date = new Date(1970, 0, 1);
    date.setSeconds(_date.seconds);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
  }

  const getTableContent = (obj) => {
    const iterateItem = (item) => {
       return item.map(function (nextItem, j) {
         return (
            <tr key={j}>
              <td>{nextItem.name}</td>
              <td>{formatDOB(nextItem.dateOfBirth)}</td>
              <td>
                <Link
                  to={
                    {pathname:"/send",
                    state: { name: nextItem.name, uid: nextItem.uid }}
                  }
                >
                  <img className="home-logos" src={birthdayFlower} alt="Send Flower" />
                </Link>
              </td>
            </tr>
         );
       })
    }

    if(obj && (obj.headers.length > 0) && (obj.contents.length > 0)) {
      return (
          <table key="view-friends">
          <thead>
            {obj.headers.map((head, headID) => (
              <th key={headID}>{head}</th>
            ))}
          </thead>
            <tbody>
              {iterateItem(obj.contents)}
            </tbody>
          </table>
      );
    } else {
      return <div className="add-friend-container">
        No Friends Found
      </div>
    }
  };

  const handleFriendRequest = async (kind, sender, docId) => {
    const ref = await database.collection("friendRequest").where('sender', '==', sender).where('recipient', '==', userData.email).get();
    ref.docs.map(function (doc) {
      if(kind == "accept") {
        doc.ref.update({status: "Accepted"}).then(() => {
          const ref2 = database.collection("user").doc(currentUser.uid).collection("notifications").doc(docId);
  
          ref2.get().then((_item) => {
            _item.ref.update({read: true}).then(async () => {
              friendsList();
              notificationsList();
            })
          })
        })
      } else {
        doc.ref.update({status: "Denied"}).then(() => {
          const ref2 = database.collection("user").doc(currentUser.uid).collection("notifications").doc(docId);
  
          ref2.get().then((_item) => {
            _item.ref.update({read: true}).then(() => {
              notificationsList();
            })
          })
        })
      }
    });
  };

  const history = useHistory();

  const handleNewFlowerClick = async (docId) => {
    const ref2 = await database.collection("user").doc(currentUser.uid).collection("notifications").doc(docId).get();
    
    ref2.ref.update({read: true});
    history.push(`/past-flowers#${ref2.data().flowerId}`);
  }

  const clearNotifications = async () => {
    const ref = database.collection("user").doc(currentUser.uid).collection("notifications");
    
    await ref.get().then((item) => {
      item.docs.map(function (doc) {
        doc.ref.update({read: true})
      });

      notificationsList();
    });
  }

  const getNotificationsContent = (obj) => {
    const iterateItem = (item) => {
       return item.map(function (nextItem, j) {
         return (
            <tr key={j}>
              <td>{nextItem.name}</td>
              <td>{formatTimestamp(nextItem.date)}</td>
              {nextItem.type === "New Flower" &&
                <td className="nf-row" onClick={() => handleNewFlowerClick(nextItem.id)}>
                  <span>{nextItem.type}</span>
                  <img className="home-logos" src={birthdayFlower} alt="Send Flower" />
                </td>
              }
              {nextItem.type === "Friend Request" && <td className="fr-row">
                <span>{nextItem.type}</span>
                <div className="friend-request-container">
                  <div onClick={() => handleFriendRequest("accept", nextItem.sender, nextItem.id)}>&#x2714;</div>
                  <div onClick={() => handleFriendRequest("deny", nextItem.sender, nextItem.id)}>&#x2716;</div>
                </div>
              </td>}
              {((nextItem.type === "Friend Request Accepted") || (nextItem.type === "Friend Request Denied")) && <td className="fr-row">
                <span>{nextItem.type}</span>
              </td>}
            </tr>
         );
       })
    }

    if(obj && (obj.headers.length > 0) && (obj.contents.length > 0)) {
      return (
          <table key="view-friends">
          <thead
            style={{
              backgroundColor: "rgba(44, 44, 44, 0.82)"
            }}
          >
            {obj.headers.map(function (head, headID) {
              if(head == "Type") {
                return (
                  <th key={headID} className="type-header">
                    {head}
                    <div className="clear-notifications-container" onClick={clearNotifications}>
                      <span>Clear Notifications</span>
                      <div></div>
                    </div>
                  </th>
                )
              } else {
                return <th key={headID}>{head}</th>
              }
            })}
          </thead>
            <tbody>
              {iterateItem(obj.contents)}
            </tbody>
          </table>
      );
    } else {
      return <div className="add-friend-container">
        No Notifications
      </div>
    }
  };

  const toggleTabView = (tab) => {
    if(tab === "view") {
      if(displayNotifications) friendsList();
      setDisplayViewFriends(true);
      setDisplayAddFriends(false);
      setDisplayNotifications(false);
      setFriendsEmail("");
      setBadEmail(false);
      setFriendSearch("");
    } else if(tab === "add") {
      setDisplayViewFriends(false);
      setDisplayAddFriends(true);
      setDisplayNotifications(false);

      setFriendsEmail("");
      setBadEmail(false);
      setFriendSearch("");
    } else {
      setDisplayViewFriends(false);
      setDisplayAddFriends(false);
      setDisplayNotifications(true);

      setFriendsEmail("");
      setBadEmail(false);
      setFriendSearch("");
    }
  }

  const handleClose = () => {
    setDisplayViewFriends(false);
    setDisplayAddFriends(false);
    setDisplayNotifications(false);

    setFriendsEmail("");
    setBadEmail(false);
    setFriendSearch("");
  }

  if(!loading) {
    return (
      <Container fluid className={`Connect ${theme}`}>
        <div className="tabs-container">
          <div 
            className={"tab-child view-friends-tab"}
            onClick={() => toggleTabView("view")}
            style={{
              backgroundColor: displayViewFriends ? (theme === "dark" ? "white" : "black") : "transparent",
              color: displayViewFriends ? (theme === "dark" ? "black" : "white") : (theme === "dark" ? "white" : "black")
            }}
          >View Friends</div>
          <div 
            className={"tab-child add-friends-tab"}
            onClick={() => toggleTabView("add")}
            style={{
              backgroundColor: displayAddFriends ? (theme === "dark" ? "white" : "black") : "transparent",
              color: displayAddFriends ? (theme === "dark" ? "black" : "white") : (theme === "dark" ? "white" : "black")
            }}
          >Add Friends</div>
          <div 
            className={"tab-child notifications-tab"}
            onClick={() => toggleTabView("notifications")}
            style={{
              backgroundColor: displayNotifications ? (theme === "dark" ? "white" : "black") : "transparent",
              color: displayNotifications ? (theme === "dark" ? "black" : "white") : (theme === "dark" ? "white" : "black")
            }}
          >
            Notifications
            {(viewNotifications.contents.length >= 1) && <div className="notification-dot"><span>{viewNotifications.contents.length}</span></div>}
          </div>
        </div>
        {displayViewFriends && <div className="view-friends-search-container">
            <span>Search:</span>
            <input type="text" value={friendSearch} class="inp" onChange={handleFriendSearch} required/>
        </div>}
        {displayViewFriends && getTableContent(viewFriends)}
        {displayAddFriends && <div className="add-friend-container">
          <div className="email-input-container">
            <span>Search:</span>
            <input 
              type="email"
              onKeyUp={event => event.key === 'Enter' && addFriend(friendsEmail)}
              value={friendsEmail}
              onChange={handleEmailInput} 
              class="inp"
              placeholder="Type your friends email here"
              required
            />
          </div>
          <div className="invite-container">
            <div 
              className="add-btn-container"
              onClick={() => {
                if(canAdd) {
                  addFriend(friendsEmail)
                }
              }}
              style={{
                cursor: canAdd ? "pointer" : "not-allowed",
                color: canAdd ? (theme === "dark" ? "white" : "black") : "grey"
              }}
              >
              <span>
                Add
              </span>
              <span>&#x229E;</span>
            </div>
            <div 
              className="invite-btn-container"
              onClick={() => {
                if(canInvite) {
                  addFriend(friendsEmail)
                }
              }}
              style={{
                cursor: canInvite ? "pointer" : "not-allowed",
                color: canInvite ? (theme === "dark" ? "white" : "black") : "grey"
              }}
              >
              <span>Invite</span>
              <span>&#x229E;</span>
            </div>
          </div>
          {badEmail && <p className="set-bad-email-error">Please enter a valid email address.</p> }
          {showSuccess && <p className="set-show-success">{showSuccess}</p> }
        </div>}
        {
          displayNotifications && getNotificationsContent(viewNotifications)
        }
        {(displayAddFriends || displayViewFriends || displayNotifications) && <div style={{
          display: "flex",
          justifyContent: "center"
        }}>
        <div
          className="box"
          onClick={handleClose}
          >
            Close ^
          </div>
        </div>}
        <br/>
        <br/>
        <Row style={{
          marginBottom: "30px"
        }}>
          {GlobalFlower.map((flower, index) => {
            if(index < 30) {
              return (
                <div className="flower-col col-4 col-lg-2">
                  <BlankFlower
                    colorOne={flower.PeaksColor}
                    colorTwo={flower.ChallengesColor}
                    colorThree={flower.PeopleColor}
                    colorFour={flower.PrinciplesColor}
                    colorFive={flower.PowersColor}
                    colorSix={flower.AspirationsColor}
                  />
                </div>
              );
            }
          })}
        </Row>
      </Container>
    );
  } else {
    return <Col align="center">
      <Spinner animation="border" />
    </Col>
  }
}
