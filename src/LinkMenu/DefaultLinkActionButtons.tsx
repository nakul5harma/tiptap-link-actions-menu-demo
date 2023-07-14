import * as React from "react";
import type { Editor } from "@tiptap/react";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  OpenInNewOutlined,
} from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { ToolbarButton } from "./ToolbarButton";

export interface LinkEditingMenu {
  linkUrl: string;
  setLinkUrl: React.Dispatch<React.SetStateAction<string>>;
  editor: Editor;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LinkEditingMenu = (props: LinkEditingMenu) => {
  const { linkUrl, setLinkUrl, editor, setIsEditing } = props;

  return (
    <>
      <TextField
        id="edit-link-url"
        size="small"
        variant="outlined"
        value={linkUrl}
        onChange={(e) => {
          setLinkUrl(e.target.value);
        }}
        style={{ height: 12, padding: "0px 10px", marginTop: "6px" }}
        InputLabelProps={{
          style: {
            fontSize: "12px",
          },
        }}
        inputProps={{
          style: {
            height: 12,
            fontSize: "14px",
          },
        }}
      />

      <IconButton
        color="success"
        component="label"
        onClick={() => {
          editor
            .chain()
            .extendMarkRange("link")
            .updateAttributes("link", { href: linkUrl })
            .run();
        }}
        disableRipple
      >
        <CheckOutlined />
      </IconButton>

      <IconButton
        color="error"
        component="label"
        onClick={() => {
          setLinkUrl("");
          setIsEditing(false);
        }}
        disableRipple
      >
        <CloseOutlined />
      </IconButton>
    </>
  );
};

export interface EditLinkMenuActionButtonProps {
  setLinkUrl: React.Dispatch<React.SetStateAction<string>>;
  linkHref: string | null;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditLinkMenuActionButton = (
  props: EditLinkMenuActionButtonProps
) => {
  const { setLinkUrl, linkHref, setIsEditing } = props;

  return (
    <ToolbarButton
      Icon={EditOutlined}
      onClick={() => {
        setLinkUrl(linkHref || "");
        setIsEditing(true);
      }}
    />
  );
};

export interface OpenInNewTabLinkMenuActionButtonProps {
  linkHref: string | null;
}

export const OpenInNewTabLinkMenuActionButton = (
  props: OpenInNewTabLinkMenuActionButtonProps
) => {
  const { linkHref } = props;

  return (
    <ToolbarButton
      Icon={OpenInNewOutlined}
      onClick={() => {
        if (linkHref) {
          window.open(linkHref, "_blank");
        }
      }}
    />
  );
};
