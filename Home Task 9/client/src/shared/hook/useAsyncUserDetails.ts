import { useEffect, useState } from "react";
import type { User } from "../../features/tasks/type.schema";
import { itemUserManager } from "../../features/tasks/api";

const useAsyncUserDetails = (id?: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    itemUserManager
      .getUserById(id)
      .then((user) => setUser(user))
      .catch((err) => setError(err));
  }, [id]);

  return { user, error };
};

export default useAsyncUserDetails;
