"use client";

import { Button } from "@/components/ui/button";
import { File, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/lib/firebase";

interface MenuItemImageProps {
  productImage: string;
  menuItemId: string;
}

const MenuItemImage = ({ productImage, menuItemId }: MenuItemImageProps) => {
  const router = useRouter();
  const fileRef = useRef(null);

  const [picture, setPicture] = useState(null);
  const [upload, setUpload] = useState(0);
  const [value, setValue] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

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
          setValue(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (picture) {
      handlePictureUpload(picture);
    }
  }, [picture]);

  const handleCreateMenuItem = async () => {
    setIsCreating(true);

    try {
      const response = await fetch(`/api/edit-menuitem/${menuItemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productImage: value,
        }),
      });

      if (response.ok) {
        toast.success("Image added successfully");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("MENUITEM", error);
      toast.error("Something went wrong");
    } finally {
      setIsCreating(false);
      setValue("");
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-[35%] lg:w-[25%] flex flex-col bg-white border border-slate-300 p-5 sm:p-1.5 rounded-sm">
      <div className="w-full flex flex-col gap-y-5 sm:gap-y-3">
        <div className="aspect-square relative">
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
            //@ts-ignore
            onChange={(e) => setPicture(e.target.files[0])}
          />
          {productImage || value ? (
            <Image
              //@ts-ignore
              onClick={() => fileRef.current.click()}
              src={value ? value : productImage}
              alt="product image"
              quality={100}
              fill
              className="rounded-sm object-cover object-center cursor-pointer"
            />
          ) : (
            <div
              //@ts-ignore
              onClick={() => fileRef.current.click()}
              className="w-full h-full flex items-center justify-center cursor-pointer shadow-lg shadow-gray-900/10 rounded-sm bg-gray-500/75">
              <File className="text-white w-8 h-8" />
            </div>
          )}
        </div>
        <Button
          className="w-full"
          disabled={isCreating || value === ""}
          onClick={handleCreateMenuItem}>
          {isCreating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Add Item Image"
          )}
        </Button>
      </div>
    </div>
  );
};

export default MenuItemImage;
