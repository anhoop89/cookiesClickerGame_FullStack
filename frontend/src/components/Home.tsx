import { useAuth0 } from '@auth0/auth0-react';
export default function Home() {
    const { user, isAuthenticated } = useAuth0();

    return <div className="mt-20 mb-10">
         <h1>This is a cookies clicker game!</h1>
        <h2> This text displays from home.tsx</h2>
        <div>
            {isAuthenticated ? (
                <div>
                    <p>Welcome hohoh, {user?.nickname}!</p>


                </div>
            ) : ""}
        </div>
    </div>
}
