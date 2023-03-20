import { Fragment } from "react";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function ChatPreviewListItem({ chat }) {
  const fontWeight = chat.last_message.read ? "regular" : "bold";
  const title = (
    <Stack direction={"row"} spacing={1}>
      <Typography fontWeight={fontWeight}>{chat.name}</Typography>
    </Stack>
  );
  return (
    <ListItem key={chat._id} alignItems="flex-start">
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={chat.name} src={chat.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Fragment>
              {/* Only specify the sender if the chat is a group chat */}
              {chat.isGroup && (
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {`${chat.last_message.sender}: `}
                </Typography>
              )}

              <Typography variant="body3">
                {chat.last_message.content}
              </Typography>
            </Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
