import "@/styles/globals.css";
import type { Metadata } from "next";
import HomeLayout from "@/components/layouts/home-layout";
import getCurrentUser from "@/actions/getCurrentUser";
import { User } from "@prisma/client";

export const metadata: Metadata = {
  title: "FoodMonito",
  description: "FoodMonito",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return <HomeLayout currentUser={currentUser as User}>{children}</HomeLayout>;
}
