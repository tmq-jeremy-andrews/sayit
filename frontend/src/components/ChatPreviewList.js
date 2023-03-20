/**
 * TODO
 * - Look into virtualized lists for optimization
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List, Divider, ListItem, ListItemText } from "@mui/material";

import ChatPreviewListItem from "./ChatPreviewListItem";
import CircularProgress from "@mui/material/CircularProgress";

export default function ChatPreviewList() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();

  // Temporary/test data.
  // TODO delete this when done testing
  useEffect(() => {
    if (chatId) {
      setSelectedChatId(chatId);
    }
    setChats((existing) => [
      ...existing,
      {
        _id: "abcdefghijklmnopqrstuvwxyz1234567890",
        name: "The Group Chat",
        isGroup: true,
        avatar:
          "https://i.insider.com/602ee9ced3ad27001837f2ac?width=750&format=jpeg&auto=webp",
        last_message: {
          sender: "You",
          content: "This is a test message",
          read: true,
        },
      },
      {
        _id: "rstoarsetnwofpwfpuarstoarestnaofrpnao",
        name: "John Doe",
        isGroup: false,
        avatar:
          "https://i.insider.com/602ee9ced3ad27001837f2ac?width=750&format=jpeg&auto=webp",
        last_message: {
          sender: "You",
          content: "This is a test message",
          read: true,
        },
      },
    ]);
    setReachedEnd(true);
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      navigate(`/t/${selectedChatId}`);
    }
  }, [selectedChatId, navigate]);

  const EndOfList = () => {
    return (
      <ListItem key="end">
        <ListItemText
          sx={{ display: "inline" }}
          component="span"
          variant="body2"
          secondary={"No more chats to load."}
        />
      </ListItem>
    );
  };

  const handleListItemClick = (event, chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {chats.length
        ? chats.map((chat) => (
            <>
              <ChatPreviewListItem
                chat={chat}
                selected={chat._id === selectedChatId}
                handleClick={handleListItemClick}
              />
              <Divider variant="inset" component="li" />
            </>
          ))
        : "No chats to show"}
      {isLoading && <CircularProgress color="inherit" />}
      {reachedEnd && <EndOfList />}
    </List>
  );
}
