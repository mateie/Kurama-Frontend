import { ContextMenu } from 'primereact/contextmenu';

const RightClick = () => {
    const items = [
        {
            label: 'Test',
        }
    ]

    return <ContextMenu global model={items} />
};

export default RightClick;