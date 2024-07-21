import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { userDetailsAtom } from "@/atoms/userDetails";
import { isAdminAtom } from "@/atoms/isAdmin";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function Login() {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post("http://localhost:3000/api/v1/login", values)
      .then((res) => {
        setUserDetails(res.data?.data);
        axios
          .post("http://localhost:3000/api/v1/isadmin", {
            email: res.data?.data?.email,
          })
          .then((res) => {
            console.log(res.data?.isAdmin);
            setIsAdmin(res.data?.isAdmin);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setDialogOpen(false);
  }

  return (
    <div className="relative left-[85%] m-3">
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <Button className="flex left-[-80px] p-4  rounded-[20px] bg-red-400 text-lg  px-6 ">
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Login with your details</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;
