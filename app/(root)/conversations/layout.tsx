"use client";

import React from "react";
import ItemList from "@/components/ui/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import DMConversationItem from "./_components/DMConversationItem";

type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.getAll);

  const renderContent = () => {
    if (!conversations) {
      return (
        <div className="flex justify-center items-center h-full py-4">
          <Loader2 className="animate-spin w-5 h-5 text-muted-foreground" />
        </div>
      );
    }

    if (conversations.length === 0) {
      return (
        <p className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
          No conversations found
        </p>
      );
    }

    return conversations.map(({ conversation, otherMember, lastMessage }) => {
      if (!conversation?._id) return null;

      return (
        <DMConversationItem
          key={conversation._id}
          id={conversation._id}
          username={otherMember?.username || "Unknown"}
          imageUrl={otherMember?.imageUrl || ""}
          lastMessageContent={lastMessage?.content}
          lastMessageSender={lastMessage?.sender}
        />
      );
    });
  };

  return (
    <>
      <ItemList title="Conversations">{renderContent()}</ItemList>
      {children}
    </>
  );
};

export default ConversationsLayout;
