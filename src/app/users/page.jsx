"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/typography/h3";
import { UsersTable } from "./table";
import { UserCreateDialog } from "./user-create-dialog";
import { useEffect, useState } from "react";
import { EditUserDialog } from "./edit-user";

const Users = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteBtn = async (id) => {
    if (confirm("Устгана гэдэгтээ итгэлтэй байна уу ?")) {
      try {
        await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (err) {
        setError("Failed to delete user");
      }
    }
  };

  const handleOnCreate = async (values) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const newData = await res.json();
      setData((prevData) => [newData.data, ...prevData]);
      setCreateModalOpen(false);
    } catch (err) {
      setError("Failed to create user");
    }
  };

  const handleOnEdit = async (values) => {
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const updatedUser = await res.json();
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedUser.data.id ? updatedUser.data : item
        )
      );
      setEditModalOpen(false);
      setUser(null);
    } catch (err) {
      setError("Failed to update user");
    }
  };

  const handleEditClick = (user) => {
    setUser(user);
    setEditModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <TypographyH3>Хэрэглэгчид</TypographyH3>
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              Шинээр нэмэх
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable
            limit={limit}
            data={data}
            remove={deleteBtn}
            handleEditClick={handleEditClick}
          />
          {limit < data.length && (
            <div className="flex justify-center p-8">
              <Button variant="outline" onClick={() => setLimit(limit + 10)}>
                Load more...
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <UserCreateDialog
        onCreate={handleOnCreate}
        open={createModalOpen}
        onClose={setCreateModalOpen}
      />
      <EditUserDialog
        open={editModalOpen}
        onClose={setEditModalOpen}
        onEdit={handleOnEdit}
        user={user}
      />
    </div>
  );
};

export default Users;
