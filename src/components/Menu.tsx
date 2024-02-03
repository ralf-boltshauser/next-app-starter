"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function MenuComponent() {
  enum SignInStatus {
    SignedIn,
    SignedOut,
    Both,
  }
  const handleSignout = () => {
    signOut({ callbackUrl: "/" });
  };
  const menuItems = [
    {
      name: "Home",
      href: "/",
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: "About",
      href: "/about",
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: "Contact",
      href: "/contact",
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: "App",
      href: "/app",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Profile",
      href: "/profile",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Sign In",
      href: "/auth/sign-in",
      requiresSignIn: SignInStatus.SignedOut,
      variant: "default",
    },
    {
      name: "Sign Out",
      href: "/auth/sign-out",
      action: handleSignout,
      requiresSignIn: SignInStatus.SignedIn,
    },
  ] as {
    name: string;
    href?: string;
    action?: () => void;
    requiresSignIn: SignInStatus;
    variant?: "default" | "outline";
  }[];

  const { data: session, status } = useSession();

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.requiresSignIn === SignInStatus.Both) {
      return true;
    }
    if (item.requiresSignIn === SignInStatus.SignedIn && session) {
      return true;
    }
    if (item.requiresSignIn === SignInStatus.SignedOut && !session) {
      return true;
    }
    return false;
  });

  return (
    <>
      {" "}
      <div className="space-x-5 hidden md:flex">
        {filteredMenuItems.map((item) => {
          if (item.action) {
            return (
              <Button key={item.name} onClick={item.action}>
                {item.name}
              </Button>
            );
          } else if (item.href) {
            return (
              <Link key={item.name} href={item.href}>
                <Button variant={item.variant ?? "outline"}>{item.name}</Button>
              </Link>
            );
          }
        })}
      </div>
      <div className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <HamburgerMenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {filteredMenuItems.map((item) => {
              if (item.action) {
                return (
                  <DropdownMenuItem onClick={item.action} key={item.name}>
                    {item.name}
                  </DropdownMenuItem>
                );
              }
              return (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href ?? "/"}>{item.name}</Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
