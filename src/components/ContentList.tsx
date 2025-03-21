import { List, ListItem, ListItemText, Typography } from '@mui/material';

type ContentListProps = {
    label: string;
    data: { name: string }[];
};

export const ContentList = ({ label, data, ...rest }: ContentListProps) => (
    <div {...rest}>
        <Typography variant="h6">{label}</Typography>
        <List>
            {data.map(({ name }) => (
                <ListItem key={name}>
                    <ListItemText primary={name} />
                </ListItem>
            ))}

            {data.length === 0 && (
                <ListItem data-testid="no-records-found">
                    <Typography>No Records Found</Typography>
                </ListItem>
            )}
        </List>
    </div>
);
