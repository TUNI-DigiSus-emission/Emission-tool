import { Grid2, Tooltip, Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

interface FormBlockProps {
  label: string;
  tooltipText: string | JSX.Element;
  content: JSX.Element;
}

export default function FormBlock({
  label,
  content,
  tooltipText
}: FormBlockProps) {

  return (
    <Grid2 container padding={2}>
      <Grid2 size={12} container gap={0.5} marginBottom={1}>
        <Typography variant="h6">
          {label}
        </Typography>
        <Tooltip
          title={tooltipText}
          placement="right"
        >
          <InfoOutlined fontSize={"small"} />
        </Tooltip>
      </Grid2>
      <Grid2 size={12}>
        {content}
      </Grid2>
    </Grid2>
  );
}
