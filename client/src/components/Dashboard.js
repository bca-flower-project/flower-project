import { Link } from "react-router-dom";

function Dashboard(props) {
  return (
    !props.user ? <Link to='/login'>Please log in</Link> : (
      <h1>Welcome to the dashboard!</h1>
    )
  )
}

export default Dashboard
