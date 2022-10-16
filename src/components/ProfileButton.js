import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "primereact/avatar";
import { SlideMenu } from "primereact/slidemenu";

import { AuthContext } from "../providers/AuthProvider";

const ProfileButton = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const menu = useRef(null);

    if (!auth) return <></>;

    const items = [
        {
            label: "Profile",
            command: () => navigate("/@me")
        },
        {
            label: "Logout",
            command: () => logout()
        }
    ];

    return (
        <>
            <SlideMenu ref={menu} model={items} popup menuWidth={175} />
            <Avatar
                size="large"
                shape="circle"
                image={auth.avatarURL}
                onClick={(e) => menu.current?.toggle(e)}
            />
        </>
    );
};

export default ProfileButton;
