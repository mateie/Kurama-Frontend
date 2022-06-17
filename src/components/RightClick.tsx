import { ContextMenu } from 'primereact/contextmenu';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const RightClick = () => {
    const { auth, logout } = useContext(AuthContext);

    const items = [
        {
            label: auth ? 'Logout' : 'Login',
            command: () => {
                if (!auth) {
                    window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=969414951292788766&redirect_uri=http%3A%2F%2F73.185.96.104%3A3000%2Flogin&response_type=code&scope=identify%20guilds';
                } else {
                    logout();
                }
            }
        }
    ]

    return <ContextMenu global model={items} />
};

export default RightClick;