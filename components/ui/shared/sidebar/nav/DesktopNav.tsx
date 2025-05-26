"use client";

import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/ui/theme/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import {
  BookImage,
  BookUser,
  Calendar,
  HelpCircle,
  House,
  List,
  MessageCircleMore,
  Settings,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { HiSpeakerphone } from "react-icons/hi";
import { usePathname } from "next/navigation";

const paths = [
  { name: "Friends", href: "/friends", icon: <House /> },
  { name: "Conversations", href: "/conversations", icon: <MessageCircleMore /> },
  { name: "Filters", href: "/filters", icon: <List /> },
  { name: "Contacts", href: "/contacts", icon: <BookUser /> },
  { name: "Broadcast", href: "/broadcast", icon: <HiSpeakerphone /> },
  { name: "Messages", href: "/messages", icon: <BookImage /> },
  { name: "Labels", href: "/labels", icon: <Tag /> },
  { name: "Schedule", href: "/schedule", icon: <Calendar /> },
  { name: "Settings", href: "/settings", icon: <Settings /> },
  { name: "Help", href: "/help", icon: <HelpCircle /> },
];

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
          {paths.map((path, id) => {
            const isActive = pathname === path.href;

            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                          isActive
                            ? "bg-green-600 text-white shadow-lg"
                            : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {path.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;
