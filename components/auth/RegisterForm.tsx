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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        toast.success("Registered successfully!");
        router.push("/login");
      } else {
        setMessage("Email already registered");
      }
    } catch (error) {
      console.log("REGISTER FORM", error);
      toast.error("Something went wrong!");
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
        className="flex flex-col items-center justify-center p-6 gap-y-5 w-[350px] md:w-[400px] bg-white border border-slate-300 rounded-lg mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Your Name"
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
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
        <div className="w-full flex items-center justify-center text-gray-700 text-sm font-normal">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="ml-1 underline text-gray-800 text-[15px] hover:text-gray-700 transition">
            Login
          </Link>
        </div>
        <span className="w-full flex items-center justify-between">
          <div className="bg-slate-300 h-px flex-1" />
          <p className="text-slate-500 text-sm px-3.5">or</p>
          <div className="bg-slate-300 h-px flex-1" />
        </span>
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          variant={"outline"}
          className="border-slate-300 flex items-center gap-x-3 w-[280px] md:w-[320px]">
          <Image src="/google.svg" alt="google" width={28} height={28} />
          Continue With Google
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
