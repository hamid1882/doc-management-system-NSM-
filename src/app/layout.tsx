import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FolderSidebar from "./components/FolderSidebar";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import Providers from "./Providers";
import CreateFolderModal from "./components/CreateFolderModal";
import UploadFilePopup from "./components/UploadFilePopup";
import EditFolderModal from "./components/EditFolderModal";
import IframeModal from "./components/IframeModal";
import Toast from "./components/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Document Management System MSF",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <FolderSidebar />
            {children}
            <CreateFolderModal />
            <EditFolderModal />
            <UploadFilePopup />
            <IframeModal />
            <Toast />
          </div>
        </Providers>
      </body>
    </html>
  );
}
