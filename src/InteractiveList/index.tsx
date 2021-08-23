import { useState } from 'react';
import './index.scss';
import ListItem from './ListItem';

interface IProps {
    data: [{
        id: number,
        content: string
    }];
    onAdd: (value: string) => void;
    onEdit?: () => void;
    onRemove?: () => void;
    customValidation?: (value: string) => boolean;
    regexValidation?: RegExp;
    isReadOnly?: boolean;
    isError?: boolean;
    isLoading?: boolean;
}

const InteractiveList = ({
    data,
    onAdd,
    onEdit,
    onRemove,
    customValidation,
    regexValidation,
    isReadOnly,
    isError,
    isLoading = false
}: IProps) => {
    const [value, setValue] = useState<string>("");
    const handleAdd = async () => {
        // const isValid = await customValidation(value) || regexValidation?.test(value)
        // I would have done this ^, but i had troubles with typescript and I didn't wanted wasing to time on it  

        let isValid = true;
        if (customValidation) {
            isValid = await customValidation(value);
        } if (regexValidation) {
            isValid = isValid && regexValidation?.test(value);
        }

        if (isValid && !isError && value.length > 0) {
            onAdd(value ?? "")
            setValue("");
        }
    }

    const handleKeyPress = (key: string) => {
        if (key === "Enter") {
            handleAdd();
        }
    }

    return (
        <div className="interactiveList">
            <div className="header">
                <label className="text">Interactive List</label>
            </div>
            <div className="inputWrapper" data-iserror={isError}>
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={"(e.g www.website.com/) use Enter or + to add it to list"}
                    onKeyPress={e => handleKeyPress(e.key)}
                />
                {!isReadOnly && <button onClick={handleAdd}>{isError ? <div className="errorSign">!</div> : "+"}</button>}
            </div>
            <div className="content">
                {!isLoading ?
                    !!data.length ?
                        data.map((item) => <ListItem item={item} onEdit={onEdit} onRemove={onRemove} isReadOnly={isReadOnly} />)
                        : <div className="noContent">No Network / IP Adress / IP range or Domain Added just yet</div>
                    : <div>Loading</div>}
            </div>
        </div>
    );
};

export default InteractiveList;