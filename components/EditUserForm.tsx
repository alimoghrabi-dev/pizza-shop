"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import MakingUserAdmin from "./menuItems/MakingUserAdmin";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

interface EditUserFormProps {
  id: string;
  parsedId: string;
  isAdmin: boolean;
  isCurrentUserAdmin: boolean;
  name: string;
  email: string;
  image: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  profilePic: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const EditUserForm = ({
  id,
  parsedId,
  isAdmin,
  isCurrentUserAdmin,
  name,
  email,
  image,
  phoneNumber,
  address,
  postalCode,
  city,
  country,
}: EditUserFormProps) => {
  const router = useRouter();
  const fileRef = useRef(null);

  const [picture, setPicture] = useState(null);
  const [upload, setUpload] = useState(0);
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    profilePicture: image,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      postalCode: "",
      city: "",
      country: "",
    },
  });

  const handlePictureUpload = async (file: File) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUpload(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            profilePicture: downloadURL,
          });
        });
      }
    );
  };

  useEffect(() => {
    if (picture) {
      handlePictureUpload(picture);
    }
  }, [picture]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsEditting(true);
    try {
      const response = await fetch("/api/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: values.name,
          email: values.email,
          profilePic: formData.profilePicture,
          phoneNumber: values.phoneNumber,
          address: values.address,
          postalCode: values.postalCode,
          city: values.city,
          country: values.country,
        }),
      });
      if (response.ok) {
        toast.success("Profile updated successfully");
        router.refresh();
      } else {
        toast.error("Error updating profile");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setIsEditting(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-y-2.5">
        <div className="w-full flex flex-col sm:flex-row items-center gap-y-2.5 sm:gap-x-4">
          <div className="w-[85px] h-[85px]">
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              disabled={parsedId !== id}
              hidden
              //@ts-ignore
              onChange={(e) => setPicture(e.target.files[0])}
            />
            <Avatar className="w-full h-full relative">
              {!image ? (
                <AvatarFallback
                  //@ts-ignore
                  onClick={() => fileRef.current.click()}
                  className={`bg-gray-900/50 text-2xl font-medium text-white cursor-pointer hover:bg-gray-900/40 transition-all ${
                    parsedId !== id ? "cursor-default" : "cursor-pointer"
                  }`}>
                  {getInitials(name)}
                </AvatarFallback>
              ) : (
                <Image
                  //@ts-ignore
                  onClick={() => fileRef.current.click()}
                  src={formData.profilePicture}
                  quality={100}
                  fill
                  alt="profile-image"
                  className={`object-cover object-center rounded-full border border-gray-300 hover:border-primary/70 transition-all ${
                    parsedId !== id ? "cursor-default" : "cursor-pointer"
                  }`}
                />
              )}
            </Avatar>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-y-1 sm:gap-y-2.5">
            <span className="text-gray-800 text-xl font-semibold">{name}</span>
            <p className="text-gray-600 text-lg font-medium">{email}</p>
          </div>
        </div>
        {isAdmin && parsedId !== id && (
          <div className="w-full flex items-center justify-center sm:justify-start">
            <MakingUserAdmin id={id} isAdmin={isCurrentUserAdmin} />
          </div>
        )}
        <div className="w-full flex items-center justify-start"></div>
        <div className="w-full flex flex-col items-center gap-y-2">
          <div className="flex flex-row gap-x-1 sm:gap-x-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={parsedId !== id}
                      placeholder={name}
                      {...field}
                      className="border-slate-300 hover:shadow-primary/20 hover:shadow-lg bg-slate-100 transition-all"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={parsedId !== id}
                      placeholder={email}
                      type="email"
                      {...field}
                      className="border-slate-300 hover:shadow-primary/20 hover:shadow-lg bg-slate-100 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    readOnly={parsedId !== id}
                    placeholder={phoneNumber ? phoneNumber : "Phone Number"}
                    type="text"
                    {...field}
                    className="border-slate-300 hover:shadow-primary/20 hover:shadow-lg bg-slate-100 transition-all w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    readOnly={parsedId !== id}
                    placeholder={address ? address : "Address"}
                    type="text"
                    {...field}
                    className="border-slate-300 hover:shadow-primary/20 hover:shadow-lg bg-slate-100 transition-all w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-x-1 sm:gap-x-3">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={parsedId !== id}
                      placeholder={country ? country : "Country"}
                      {...field}
                      className="border-slate-300 hover:shadow-primary/20 hover:shadow-lg bg-slate-100 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={parsedId !== id}
                      placeholder={city ? city : "City"}
                      type="text"
                      {...field}
                      className="border-slate-300 hover:shadow-primary/20 hover:shadow-lg bg-slate-100 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    readOnly={parsedId !== id}
                    placeholder={postalCode ? postalCode : "Postal Code"}
                    type="text"
                    {...field}
                    className="border-slate-300 hover:shadow-primary/20 hover:shadow-lg bg-slate-100 transition-all w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {parsedId === id ? (
          <Button disabled={isEditting} type="submit" className="w-full">
            {isEditting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Edit"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EditUserForm;
