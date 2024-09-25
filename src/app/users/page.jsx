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



  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const deleteBtn = (id) => {
    if (confirm("Устгана гэдэгтээ итгэлтэй байна уу ?")) {
      setData(data.filter((item) => item.id !== id));
      fetch(`/api/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const handleOnCreate = (values) => {
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((newData) => {
        setData([ newData.data, ...data]);
        setCreateModalOpen(false);
      });
  };

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
          <UsersTable limit={limit} data={data} remove={deleteBtn} />
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
      Editopen={editModalOpen}
      onEdtClose={setEditModalOpen}
      />
    </div>
  );
};

export default Users;
