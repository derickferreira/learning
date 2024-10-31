// REACT
import { FC } from "react";
// MATERIAL UI
import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IToolBarProps {
  textSearch?: string;
  showSearchInput?: boolean;
  whenChangingSearchText?: (newText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  whenClickInEvent?: () => void;
}

export const ToolBar: FC<IToolBarProps> = ({
  textSearch = "",
  showSearchInput = false,
  whenChangingSearchText,
  newButtonText = "New",
  showNewButton = true,
  whenClickInEvent,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {showSearchInput && (
        <TextField
          value={textSearch}
          onChange={(e) => whenChangingSearchText?.(e.target.value)}
          size="small"
          placeholder="search"
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={whenClickInEvent}
            endIcon={<Icon>add</Icon>}
          >
            {newButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
