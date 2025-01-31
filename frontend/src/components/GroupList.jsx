import  { useEffect } from 'react';
import useChatStore from '../store/useChatStore';

const GroupList = () => {
    const { groups, getGroups } = useChatStore();

    useEffect(() => {
        getGroups();
    }, [getGroups]);

    return (
        <div>
            <h2>Groups</h2>
            <ul>
                {groups.map(group => (
                    <li key={group._id}>{group.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;
