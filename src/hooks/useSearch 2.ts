import { useState } from "react";
import { User } from "../models/userModel";
import apiClient from "../services/api-client";

export const useSearch = () => {

    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length < 2) {
            setUsers([]);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await apiClient.get<User[]>(
                `/api/user/search?username=${value}`
            );
            setUsers(response.data);
        } catch (err) {
            setError("Failed to fetch users");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }

  return {
    query,
    users,
    loading,
    error,
    handleSearch,
  };
};