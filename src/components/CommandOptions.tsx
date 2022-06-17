import { TabView, TabPanel } from "primereact/tabview";

const CommandOptions = ({ options }: { options: any }) => {

    console.log(options);
    return <TabView>
        {options.map((subcommand: any) => {
            return <TabPanel header={subcommand.name}>
                <b>{subcommand.description}</b>
                {subcommand.choices && subcommand.choices.length > 0 && (
                    <>
                        <br />
                        <i>Choices</i>
                        <ol>
                            {subcommand.choices.map((choice: any) => <li>{choice.name}</li>)}
                        </ol>
                    </>
                )}
                {subcommand.options && subcommand.options.length > 0 && (
                    <TabView>
                        {subcommand.options.map((option: any) => {
                            return <TabPanel header={option.name}>
                                <b>{option.description}</b>
                                {option.choices && option.choices.length > 0 && (
                                    <>
                                        <br />
                                        <i>Choices</i>
                                        <ol>
                                            {option.choices.map((choice: any) => <li>{choice.name}</li>)}
                                        </ol>
                                    </>
                                )}
                            </TabPanel>
                        })}
                    </TabView>
                )}
            </TabPanel>;
        })}
    </TabView>;
};

export default CommandOptions;