import { useEffect, useState } from "react";
import type { User } from "../../features/tasks/type.schema";
import { itemUserManager } from "../../features/tasks/api";

const useAsyncUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    itemUserManager
      .getUsers()
      .then(setUsers)
      .catch((error) => setError(error));
  }, []);

  return { users, error };
};

export default useAsyncUserList;
