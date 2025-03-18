import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/state";
import { useTitle } from "../hooks/useTitle";

const UserProfile: React.FC = () => {
  const { user, isLoading } = useSelector(
    (appState: AppState) => appState.auth
  );
  useTitle(
    `${user && user.firstName ? `${user.firstName}'s Profile` : "Profile"}`
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">{user?.firstName}'s Profile</h1>
        <div className="space-y-4">
          <p>Email: {user?.email}</p>
          <p>ID: {user?._id}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
