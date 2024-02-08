import {useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {SelectProps} from "@mui/material/Select/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


interface MultipleSelectCheckmarksProps<T extends string[]> extends Omit<SelectProps<string[]>, 'onChange'>{
    selectedValues: T
    allValues: T
    label: string
    onChange: (value: T) => void
}

export const MultipleSelectCheckmarks = <T extends string[]>(props: MultipleSelectCheckmarksProps<T>) => {
    const {
        selectedValues,
        allValues,
        label,
        onChange,
        ...rest
    } = props

    const [value, setValue] = useState<T>(selectedValues);

    const handleChange = (event: SelectChangeEvent<typeof value>) => {
        const {
            target: { value },
        } = event;
        console.log(value, 'value MultipleSelectCheckmarks');
        const updatedValue = typeof value === 'string' ? value.split(',') : value
        setValue(updatedValue);
        onChange?.(updatedValue);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id={rest.labelId}>{label}</InputLabel>
                <Select
                    {...rest}
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {allValues.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={value.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}