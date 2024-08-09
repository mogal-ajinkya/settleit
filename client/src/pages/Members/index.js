import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GetGroupById } from "../../apicalls/products";
import { Button } from "antd/es/radio";
import { AddGroup, EditGroup } from "../../apicalls/products";
// import { Button, message, Table } from "antd";

const Members = () => {
    const { id } = useParams();

    const [groups, setGroups] = React.useState([]);
    const [newMember, setNewMember] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetGroupById(id);
            console.log(response);
            dispatch(SetLoader(false));
            if (response.success) {
                console.log(response.data);
                setGroups(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        // console.log(filters)
        getData();
    }, []);

    const onFinish = async () => {
        try {
            dispatch(SetLoader(true));
            console.log(groups);
            let response = await EditGroup(groups._id, groups);
            dispatch(SetLoader(false));

            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
                dispatch(SetLoader(false));
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const addMember = () => {
        if (newMember) {
            setGroups((prevGroup) => ({
                ...prevGroup,
                members: [...prevGroup.members, newMember],
            }));
            console.log(groups);
            setNewMember("");
        }
    };

    return (
        <div className="flex gap-5 ">
            <div className="flex flex-col gap-5 w-full">
                <h2>Group: {groups.name}</h2>
                <p>{groups.description}</p>
                <div>
                    <input
                        type="text"
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                        placeholder="Enter member identifier"
                    />
                    <div className="flex justify-end mb-2">
                        <Button type="default" onClick={addMember}>
                            Add Member
                        </Button>
                    </div>
                </div>
                {groups ? (
                    <ul>
                        {groups?.members?.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                ) : (
                    <div>No Members </div>
                )}
                <button onClick={onFinish}>Save Group</button>
            </div>
        </div>
            
    );
};

export default Members;
