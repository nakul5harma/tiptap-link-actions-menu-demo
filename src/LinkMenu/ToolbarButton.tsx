import {
  IconButton,
  IconButtonProps,
  SvgIconTypeMap,
  SxProps,
  Theme,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface ToolbarButtonProps extends IconButtonProps {
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  isActive?: boolean;
}

export const ToolbarButton = (props: ToolbarButtonProps) => {
  const { Icon, isActive, ...rest } = props;

  const sx: SxProps<Theme> = isActive
    ? {
        width: "30px",
        height: "30px",
        marginRight: "4px",
        color: "#2f80ed",
        borderRadius: "4px",
        backgroundColor: "rgba(47, 128, 237, 0.2)",
        ":hover": {
          backgroundColor: "rgba(47, 128, 237, 0.3)",
        },
      }
    : {
        color: "#444",
        width: "30px",
        height: "30px",
        marginRight: "4px",
        borderRadius: "4px",
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.035)",
        },
      };

  return (
    <IconButton {...rest} color="inherit" size="small" disableRipple sx={sx}>
      <Icon />
    </IconButton>
  );
};
