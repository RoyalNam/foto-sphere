import React from "react";
import { User } from "@/types";
import Error from "../Error";
import UserCard from "./UserCard";
import LoadingSpinner from "../Loading/LoadingSpinner";

interface UserGalleryProps {
  users: User[];
  loading: boolean;
  error?: any;
  hasMore?: boolean;
}

const UserGallery: React.FC<UserGalleryProps> = ({
  users = [],
  loading,
  error,
  hasMore,
}) => {
  if (error) {
    return (
      <Error errorMessage="Error loading users. Please try again later." />
    );
  }

  return (
    <>
      {users.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="mt-4 italic text-center text-gray-500">
            No users found.
          </p>
        )
      )}

      {loading && <LoadingSpinner />}

      {!hasMore && users.length > 0 && (
        <div className="mt-4 text-center text-gray-500">
          No more users to load.
        </div>
      )}
    </>
  );
};

export default UserGallery;
