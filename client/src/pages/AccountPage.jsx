import { useAuth } from "../context/AuthContext";

function AccountPage() {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      {currentUser ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {currentUser.displayName || "Not set"}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
        </div>
      ) : (
        <p className="text-red-600">You are not logged in.</p>
      )}
    </div>
  );
}

export default AccountPage;
