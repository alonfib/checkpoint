import { useState } from 'react';
import './index.scss';
import { ReactComponent as EditIcon } from './icons/edit.svg';
import { ReactComponent as TrashIcon } from './icons/trash.svg';
import { ReactComponent as CheckmarkIcon } from './icons/checkmark.svg';

interface IProps {
    item: {
        id: number,
        content: string
    };
    onEdit?: (id: number, value: string) => void;
    onRemove?: (id: number) => void;
    isReadOnly?: boolean;
}

const ListItem = ({ item, onEdit = () => null, onRemove = () => null, isReadOnly }: IProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <div className="listItem">
            <div className="content">{!isEdit ? item.content :
                <input
                    defaultValue={item.content}
                    onChange={e => onEdit(item.id, e.target.value)}

                />
            }</div>
            {!isReadOnly &&
                <>
                    {!isEdit ? <EditIcon className="edit" onClick={() => setIsEdit(!isEdit)} /> : <CheckmarkIcon className="edit" onClick={() => setIsEdit(!isEdit)} />}
                    <TrashIcon className="delete" onClick={() => onRemove(item.id)} />
                </>}

        </div >
    );
};

export default ListItem;