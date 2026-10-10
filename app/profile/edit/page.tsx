"use client";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditUserPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    const resdata = await authClient.updateUser({ name });

    if (resdata.error) {
      toast.error(resdata.error.message || "Update failed");
      return;
    }

    toast.success("Name updated successfully!");
    router.push("/profile");
  };

  return (
   <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-primary/10 px-4 py-10">
  <div className="w-full max-w-md overflow-hidden rounded-3xl border border-base-300/70 bg-base-100 shadow-xl shadow-base-content/5">
    <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />

    <div className="p-7 sm:p-9">
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-7 w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.77a4.5 4.5 0 01-1.897 1.13l-3.58 1.074 1.074-3.58a4.5 4.5 0 011.13-1.897L16.862 4.487zM19.5 7.125L16.875 4.5"
          />
        </svg>
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Account Settings
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        Edit Profile
      </h1>

      <Description className="mt-2 leading-6 text-base-content/60">
        Update your name and keep your profile up to date.
      </Description>

      <Form className="mt-8 w-full" onSubmit={onSubmit}>
        <Fieldset className="w-full">
          <FieldGroup>
            <TextField
              isRequired
              name="name"
              defaultValue={user?.name || ""}
              validate={(value) =>
                value.trim().length < 3
                  ? "Name must be at least 3 characters"
                  : null
              }
            >
              <Label className="mb-2 font-semibold">Full Name</Label>

              <Input
                placeholder="Enter your full name"
                className="w-full"
              />

              <Description className="mt-1 text-xs text-base-content/50">
                Your name will appear on your profile.
              </Description>

              <FieldError />
            </TextField>
          </FieldGroup>

          <Fieldset.Actions className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="secondary"
              className="w-full rounded-xl sm:flex-1"
              onPress={() => router.push("/profile")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="w-full rounded-xl font-semibold shadow-md shadow-primary/15 sm:flex-1"
            >
              Save Changes
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  </div>
</div>
  );
};

export default EditUserPage;