import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { User } from "lucide-react";
import Link from "next/link";

type Props = {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
};

const DMConversationItem = ({
  id,
  imageUrl,
  username,
  lastMessageContent,
  lastMessageSender,
}: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full flex flex-row items-center gap-4 truncate">
      <Card
        className="p-2 flex flex-row
        items-center gap-4 truncate w-full cursor-pointer"
      >
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate text-sm">{username}</h4>
            <p className="text-sm">{lastMessageContent && lastMessageSender}</p>
            <span
              className="text-sm text-muted-foreground
            flex truncate overflow-ellipsis"
            >
              <p className="font-semibold">
                {lastMessageSender}
              </p>
              <p className="truncate overflow-ellipsis">{lastMessageContent}</p>
            </span>
            <p className="text-sm text-muted-foreground truncate">
              Start the conversation!
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DMConversationItem;
