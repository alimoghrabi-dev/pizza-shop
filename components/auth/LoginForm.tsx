"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirectTo: "/",
      });

      toast.success("Logged in successfully!");
    } catch (error) {
      console.log("LOGIN FORM", error);
      setMessage("Wrong Credentials");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);

    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.log("LOGIN GOOGLE FORM", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center p-6 gap-y-5 w-[350px] md:w-[400px] border bg-white border-slate-300 rounded-lg mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...field}
                  className="w-[280px] md:w-[320px] border-slate-300 transition-all"
                />
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
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your Password"
                  {...field}
                  className="w-[280px] md:w-[320px] border-slate-300 transition-all"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {message ? (
          <span className="w-full flex items-center justify-center">
            <p className="text-sm text-bold text-red-600">{message}</p>
          </span>
        ) : null}

        <Button
          disabled={isLoading}
          type="submit"
          className="w-[280px] md:w-[320px]">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
        </Button>
        <div className="w-full flex items-center justify-center text-gray-700 text-sm font-normal">
          <span>{"Don't"} have an account?</span>
          <Link
            href="/register"
            className="ml-1 underline text-gray-800 text-[15px] hover:text-gray-700 transition">
            Register
          </Link>
        </div>
        <span className="w-full flex items-center justify-between">
          <div className="bg-slate-300 h-px flex-1" />
          <p className="text-slate-500 text-sm px-3.5">or</p>
          <div className="bg-slate-300 h-px flex-1" />
        </span>
        <Button
          onClick={handleGoogleSignIn}
          type="button"
          variant={"outline"}
          className="border-slate-300 flex items-center gap-x-3 w-[280px] md:w-[320px]">
          <Image src="/google.svg" alt="google" width={28} height={28} />
          Continue With Google
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
