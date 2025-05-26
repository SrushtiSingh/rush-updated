"use client";

import ConversationContainer from "@/components/ui/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";

interface ConversationPageProps {
  params: {
    conversationId: Id<"conversations">;
  };
}

const ConversationPage = ({ params }: ConversationPageProps) => {
  const conversation = useQuery(api.conversations.get, { id: params.conversationId });

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <ConversationContainer>
      <Body
        renderHeader={
          <Header
            name={
              (conversation.isGroup
                ? conversation.name
                : conversation.otherMember.username) || ""
            }
            imageUrl={
              conversation.isGroup ? undefined : conversation.otherMember.imageUrl
            }
            options={
              conversation.isGroup
                ? [
                    {
                      label: "Leave group",
                      destructive: false,
                      onClick: () => {
                        // TODO: Add leave group handler
                      },
                    },
                    {
                      label: "Delete group",
                      destructive: true,
                      onClick: () => {
                        // TODO: Add delete group handler
                      },
                    },
                  ]
                : [
                    {
                      label: "Remove friend",
                      destructive: true,
                      onClick: () => {
                        // TODO: Add remove friend handler
                      },
                    },
                  ]
            }
          />
        }
      />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
