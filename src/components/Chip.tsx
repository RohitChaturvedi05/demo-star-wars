import { Chip as MuiChip, Typography } from '@mui/material';

type ChipProps = {
    label?: string;
    value: string;
};

export const Chip = ({ label, value }: ChipProps) => (
    <>
        <Typography variant="subtitle2" color="text.secondary">
            {label}
        </Typography>
        <MuiChip label={value} sx={{ mt: 1 }} />
    </>
);
