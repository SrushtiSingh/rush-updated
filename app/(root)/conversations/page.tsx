import React from "react";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationsPage = ({ params }: Props) => {
  return (
    <div>Conversation ID: {params.conversationId}</div>
  );
};

export default ConversationsPage;
