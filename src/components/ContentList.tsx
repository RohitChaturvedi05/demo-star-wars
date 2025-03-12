import { List, ListItem, ListItemText, Typography } from '@mui/material';

type ContentListProps = {
    label: string;
    data: { name: string }[];
};

export const ContentList = ({ label, data }: ContentListProps) => (
    <>
        <Typography variant="h6">{label}</Typography>
        <List>
            {data.map(({ name }) => (
                <ListItem key={name}>
                    <ListItemText primary={name} />
                </ListItem>
            ))}

            {data.length === 0 && (
                <ListItem>
                    <Typography>No Records Found</Typography>
                </ListItem>
            )}
        </List>
    </>
);
