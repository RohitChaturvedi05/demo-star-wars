import SaveIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type EditableChipProps = {
    label?: string;
    value: string;
    onChange?: (value: string) => void;
};

export const EditableChip = ({
    label,
    value: initialValue,
    onChange = () => {},
}: EditableChipProps) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleEditChange = () => {
        if (editing) {
            setEditing(false);
            onChange(value);
            return;
        }
        setEditing(true);
    };
    return (
        <>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            {!editing && <Chip label={value} sx={{ mt: 1 }} />}
            {editing && (
                <TextField
                    value={value}
                    id={`editable-${label}`}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}

            <IconButton
                sx={{ mt: 1 }}
                data-testid={`btn-gender-edit`}
                onClick={handleEditChange}
            >
                {editing ? (
                    <SaveIcon fontSize="small" />
                ) : (
                    <EditIcon fontSize="small" />
                )}
            </IconButton>
        </>
    );
};
