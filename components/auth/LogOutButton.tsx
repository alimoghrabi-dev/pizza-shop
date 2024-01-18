"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

const LogOutButton = ({ isMobile }: { isMobile?: boolean }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      disabled={isLoading}
      onClick={handleSignOut}
      className={isMobile ? "w-full rounded-lg" : "rounded-full px-5 w-20"}>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Logout"}
    </Button>
  );
};

export default LogOutButton;
