import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { FETCH_COMMAND } from "../gql/queries/client";

import { Card } from 'primereact/card';

import { capFirstLetter, capEachFirstLetter } from "../util";

import CommandOptions from "../components/CommandOptions";

const CommandPage = () => {
    const { commandName } = useParams();

    const { error, loading, data: { command } = {} } = useQuery(FETCH_COMMAND, {
        variables: {
            commandName
        }
    });


    return (
        <div className="flex align-items-center justify-content-center">
            {loading && <h1>Loading {commandName}...</h1>}
            {error && <h1>{commandName} not found</h1>}
            {!loading && <Card className="flex align-items-center justify-content-center" title={capFirstLetter(command.name)} subTitle={command.ownerOnly ? `${command.description} (Owner Only)` : command.description}>
                {command.permission && (<p>Permission: {capEachFirstLetter(command.permission.toLowerCase().split('_').join(' '))}</p>)}
                {command.data.options && command.data.options.length > 0 && (
                    <CommandOptions options={command.data.options} />
                )}
            </Card>
            }
        </div>
    );
};

export default CommandPage;