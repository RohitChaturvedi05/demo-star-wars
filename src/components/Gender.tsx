import SaveIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';

type Gender = 'male' | 'female' | 'others';
type GenderProps = {
    label?: string;
    value: string;
    onGenderChange?: (gender: Gender) => void;
};

const getGenderValue = (value: string): Gender => {
    if (value === 'male') {
        return 'male';
    }
    if (value === 'female') {
        return 'female';
    }
    return 'others';
};

export const Gender = ({
    label = 'Gender',
    value,
    onGenderChange = () => {},
}: GenderProps) => {
    const [editing, setEditing] = useState(false);
    const [gender, setGender] = useState<Gender>(getGenderValue(value));

    const handleEditChange = () => {
        if (editing) {
            setEditing(false);
            onGenderChange(gender);
            return;
        }
        setEditing(true);
    };
    return (
        <>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            {!editing && <Chip label={gender} sx={{ mt: 1 }} />}
            {editing && (
                <Select
                    labelId="select-gender-label"
                    id="select-gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                </Select>
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
