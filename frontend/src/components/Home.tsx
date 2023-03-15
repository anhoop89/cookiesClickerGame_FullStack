import { useAuth0 } from "@auth0/auth0-react";
import "../CSS/home.css";

export default function Home() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="mt-20 mb-10">
      <h1 className="readFont">This is a cookies clicker game!</h1>
      <br></br>
      <div>
        {isAuthenticated ? (
          <div className="readFont expandIntro">
            <p>Welcome, {user?.nickname}!</p>
          </div>
        ) : (
          <div className="readFont expandIntro">
            <p>Please login to get the full experience!</p>
          </div>
        )}
      </div>
    </div>
  );
}
