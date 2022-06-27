import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { FETCH_COMMAND } from "../gql/queries/client";

import { Card } from 'primereact/card';

import { capFirstLetter, capEachFirstLetter } from "../util";

import CommandOptions from "../components/CommandOptions";

const CommandPage = () => {
    const { commandName } = useParams();

    const { data, loading, error } = useQuery(FETCH_COMMAND, {
        variables: {
            commandName
        }
    });

    if (loading) return <></>;

    const { command } = data;

    return (
        <div className="flex align-items-center justify-content-center">
            {error && <h1>{commandName} not found</h1>}
            <Card title={capFirstLetter(command.name)} subTitle={command.ownerOnly ? `${command.description} (Owner Only)` : command.description}>
                {command.permission && (<p>Permission: {capEachFirstLetter(command.permission.toLowerCase().split('_').join(' '))}</p>)}
                {command.data.options && command.data.options.length > 0 && (
                    <CommandOptions options={command.data.options} />
                )}
            </Card>
        </div>
    );
};

export default CommandPage;