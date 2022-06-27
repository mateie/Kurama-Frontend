import { TabView, TabPanel } from "primereact/tabview";
import { optionType } from "../util";

const CommandOptions = ({ options }: { options: any }) => {
    return (
        <TabView>
            {options.map((subcommand: any) => {
                return <TabPanel header={`${subcommand.name} ${subcommand.type !== 1 && subcommand.type !== 2 ? `- ${optionType(subcommand.type)}` : ''}`}>
                    <b>{subcommand.description}</b> - <i>{subcommand.required ? 'Required' : 'Optional'}</i>
                    {subcommand.choices && subcommand.choices.length > 0 && (
                        <>
                            <br />
                            <i>- Choices</i>
                            <ol>
                                {subcommand.choices.map((choice: any) => <li>{choice.name}</li>)}
                            </ol>
                        </>
                    )}
                    {subcommand.options && subcommand.options.length > 0 && (
                        <TabView>
                            {subcommand.options.map((option: any) => {
                                return <TabPanel header={`${option.name} ${option.type !== 1 && option.type !== 2 ? `- ${optionType(option.type)}` : ''}`}>
                                    <b>{option.description}</b> - <i>{option.required ? 'Required' : 'Optional'}</i>
                                    {option.choices && option.choices.length > 0 && (
                                        <>
                                            <br />
                                            <i>- Choices</i>
                                            <ol>
                                                {option.choices.map((choice: any) => <li>{choice.name}</li>)}
                                            </ol>
                                        </>
                                    )}
                                    {option.options && option.options.length > 0 && (
                                        <TabView>
                                            {option.options.map((deepOption: any) => {
                                                return <TabPanel header={`${deepOption.name} ${deepOption.type !== 1 && deepOption.type !== 2 ? `- ${optionType(deepOption.type)}` : ''}`}>
                                                    <b>{deepOption.description}</b> - <i>{deepOption.required ? 'Required' : 'Optional'}</i>
                                                </TabPanel>
                                            })}
                                        </TabView>
                                    )}
                                </TabPanel>
                            })}
                        </TabView>
                    )}
                </TabPanel>;
            })}
        </TabView>
    );
};

export default CommandOptions;