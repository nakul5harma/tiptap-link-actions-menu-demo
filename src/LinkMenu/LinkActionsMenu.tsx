import * as React from "react";
import { Mark } from "@tiptap/pm/model";
import { LinkActionsPlugin, LinkActionsPluginProps } from "./LinkActionsPlugin";
import {
  LinkEditingMenu,
  EditLinkMenuActionButton,
  OpenInNewTabLinkMenuActionButton,
} from "./DefaultLinkActionButtons";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type LinkActionsProps = Omit<
  Optional<LinkActionsPluginProps, "pluginKey">,
  "element"
> & {
  className?: string;
  updateDelay?: number;
};

export const LinkActionsMenu = (props: LinkActionsProps) => {
  const {
    editor,
    pluginKey = "linkActions",
    tippyOptions = {},
    updateDelay,
    shouldShow = null,
    className,
  } = props;

  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [linkHref, setLinkHref] = React.useState<string | null>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [linkUrl, setLinkUrl] = React.useState<string>("");

  React.useEffect(() => {
    if (!element) {
      return;
    }

    if (editor.isDestroyed) {
      return;
    }

    const plugin = LinkActionsPlugin({
      updateDelay,
      editor,
      element,
      pluginKey,
      shouldShow,
      tippyOptions,
    });

    editor.registerPlugin(plugin);
    return () => {
      editor.unregisterPlugin(pluginKey);
    };
    // Register plugin when the editor is ready or the element changes.
    // We don't want to consider other props changes as they are not
    // coming from a react state or ref, which makes the menu rendering
    // unstable and non-ending process.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, element]);

  React.useEffect(() => {
    const { $from } = editor.state.selection;
    const linkMark = $from
      .marks()
      .find((mark: Mark) => mark.type.name === "link");

    if (!linkMark) {
      setLinkHref(null);
    } else {
      setLinkHref(linkMark.attrs.href as string);
    }

    return () => {
      setLinkUrl("");
      setLinkHref(null);
      setIsEditing(false);
    };
  }, [editor.state.selection]);

  if (isEditing) {
    return (
      <div
        ref={setElement}
        className={className}
        style={{ visibility: "hidden" }}
      >
        <LinkEditingMenu
          editor={editor}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          setIsEditing={setIsEditing}
        />
      </div>
    );
  }

  return (
    <div
      ref={setElement}
      className={className}
      style={{ visibility: "hidden" }}
    >
      <EditLinkMenuActionButton
        linkHref={linkHref}
        setLinkUrl={setLinkUrl}
        setIsEditing={setIsEditing}
      />
      <OpenInNewTabLinkMenuActionButton linkHref={linkHref} />
    </div>
  );
};
