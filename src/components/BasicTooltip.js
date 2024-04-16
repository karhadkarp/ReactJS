import * as React from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { HelpOutline } from '@mui/icons-material';
import { Tooltip, styled } from '@material-ui/core';
import { tooltipClasses } from '@mui/material';

export default function BasicTooltip({value}) {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  return (
    <HtmlTooltip title={value}>
      <IconButton>
        <HelpOutline />
      </IconButton>
    </HtmlTooltip>
  );
}