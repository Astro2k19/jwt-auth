import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {SelectProps} from "@mui/material/Select/Select";
import {forwardRef} from "react";

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


interface MultipleSelectCheckmarksProps extends Omit<SelectProps<string[]>, 'onChange'>{
    selectedValues: string[]
    allValues: string[]
    label: string
    onChange: (value: string[]) => void
}

export const MultipleSelectCheckmarks = forwardRef((props: MultipleSelectCheckmarksProps, ref) => {
    const {
        selectedValues,
        allValues,
        label,
        onChange,
        ...rest
    } = props

    const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
        const {
            target: { value },
        } = event;
        const updatedValue = typeof value === 'string' ? value.split(',') : value

        if (updatedValue.length >= 1) {
            onChange?.(updatedValue);
        }
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id={rest.labelId}>{label}</InputLabel>
                <Select
                    {...rest}
                    multiple
                    value={selectedValues}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    ref={ref}
                >
                    {allValues.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedValues.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
})
