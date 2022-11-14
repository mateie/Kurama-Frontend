import { useRef, useState } from "react";

import PropTypes from "prop-types";

import moment from "moment";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import "../../assets/less/MemberTable.less";

import {
    FilterMatchMode,
    Button,
    Dialog,
    SplitButton,
    DataTable,
    InputText,
    Chip,
    Column,
    Toast
} from "primereact";

import { FetchMembers } from "../../gql/queries/guilds";
import { ReportUser, WarnUser } from "../../gql/mutations/users";
import { FetchReports, FetchWarns } from "../../gql/queries/users";

const MemberTable = ({ auth, guild }) => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const toast = useRef(null);

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [warnDialog, setWarnDialog] = useState(false);
    const [reportDialog, setReportDialog] = useState(false);

    const [warnsDialog, setWarnsDialog] = useState(false);
    const [reportsDialog, setReportsDialog] = useState(false);

    const [currentMember, setCurrentMember] = useState(null);
    const [reason, setReason] = useState("");

    const { loading: membersLoading, data: { members } = {} } = useQuery(
        FetchMembers,
        {
            variables: {
                guildId: guild.id,
                fetchDb: true
            }
        }
    );

    const [getWarns, { loading: warningsLoading, data: { warns = {} } = {} }] =
        useLazyQuery(FetchWarns);

    const [
        getReports,
        { loading: reportsLoading, data: { reports = {} } = {} }
    ] = useLazyQuery(FetchReports);

    const [warnUser, { loading: warnLoading }] = useMutation(WarnUser, {
        update: () => {
            setWarnDialog(false);
        }
    });

    const [reportUser, { loading: reportLoading }] = useMutation(ReportUser, {
        update: () => {
            setReportDialog(false);
        }
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        const _filters = { ...filters };
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const headerTemplate = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <div className="flex justify-content-start">
                    <h5 className="m-0">
                        Members ({members ? members.length : 0})
                    </h5>
                </div>
                <div className="flex justify-content-end">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                        />
                    </span>
                </div>
            </div>
        );
    };

    const usernameTemplate = (member) => {
        return (
            <Chip
                imageAlt={member.username}
                label={member.user.username}
                image={member.avatarURL}
            />
        );
    };

    const atTemplate = (member) => {
        return <i>{member.user.discriminator}</i>;
    };

    const joinedTemplate = (member) => {
        const joinedAt = `${moment(member.joinedTimestamp).format(
            "MMM Do YY h:mm A"
        )} (${moment(member.joinedTimestamp).fromNow()})`;
        return <span>{joinedAt}</span>;
    };

    const dialogFuncMap = {
        warnDialog: setWarnDialog,
        reportDialog: setReportDialog,
        warnsDialog: setWarnsDialog,
        reportsDialog: setReportsDialog
    };

    const submitFuncMap = {
        warnDialog: warnUser,
        reportDialog: reportUser
    };

    const onClick = (name, member) => {
        dialogFuncMap[name](true);
        setCurrentMember(member);
        switch (name) {
            case "warnsDialog":
                getWarns({
                    variables: { guildId: guild.id, userId: member.id }
                });
                break;
            case "reportsDialog":
                getReports({
                    variables: { guildId: guild.id, userId: member.id }
                });
                break;
        }
    };

    const onHide = (name) => {
        dialogFuncMap[name](false);
        setReason("");
    };

    const onSubmit = (name) => {
        submitFuncMap[name]({
            variables: {
                guildId: guild.id,
                userId: currentMember.id,
                reason
            }
        });

        const submitType = name.split(/[A-Z]/)[0];
        const submitText =
            submitType.charAt(0).toUpperCase() + submitType.slice(1);

        toast.current?.show({
            severity: "success",
            summary: `${submitText}ed ${currentMember.user.tag}`,
            detail: reason.length > 0 ? reason : "No reason specified",
            life: 3000
        });
        setReason("");
    };

    const actionTemplate = (member) => {
        const warnItems = [
            {
                label: "View",
                command: () => {
                    onClick("warnsDialog", member);
                }
            }
        ];

        const reportItems = [
            {
                label: "View",
                command: () => {
                    onClick("reportsDialog", member);
                }
            }
        ];

        return (
            member.id !== auth.id && (
                <>
                    {guild.authPerms.includes("MODERATE_MEMBERS") && (
                        <SplitButton
                            label="Warn"
                            className="p-button-danger p-button-sm"
                            onClick={() => onClick("warnDialog", member)}
                            model={warnItems}
                        />
                    )}
                    {guild.authPerms.includes("VIEW_AUDIT_LOG") ? (
                        <SplitButton
                            label="Report"
                            className="p-button-danger p-button-sm"
                            onClick={() => onClick("reportDialog", member)}
                            model={reportItems}
                        />
                    ) : (
                        <Button
                            label="Report"
                            className="p-button-danger p-button-sm"
                            onClick={() => onClick("reportDialog", member)}
                        />
                    )}
                </>
            )
        );
    };

    const renderFooter = (name) => {
        return (
            <>
                <Button
                    loading={warnLoading || reportLoading}
                    label="Cancel"
                    onClick={() => onHide(name)}
                    className="p-button-text p-button-success"
                />
                <Button
                    loading={warnLoading || reportLoading}
                    label="Submit"
                    onClick={() => onSubmit(name)}
                    className="p-button-danger"
                />
            </>
        );
    };

    const header = headerTemplate();

    return (
        <>
            {currentMember && (
                <>
                    {guild.authPerms.includes("MODERATE_MEMBERS") && (
                        <Dialog
                            header={`Warning ${currentMember.user.tag}`}
                            visible={warnDialog}
                            onHide={() => onHide("warnDialog")}
                            resizable={false}
                            footer={() => renderFooter("warnDialog")}
                        >
                            <InputText
                                placeholder="Reason for the warn"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Dialog>
                    )}
                    {guild.authPerms.includes("VIEW_AUDIT_LOG") && (
                        <>
                            <Dialog
                                header={`Warnings of ${currentMember.user.tag}`}
                                visible={warnsDialog}
                                onHide={() => setWarnsDialog(false)}
                            >
                                {warns.length > 0 ? (
                                    <DataTable
                                        paginator
                                        loading={warningsLoading}
                                        rows={5}
                                        value={warns}
                                    >
                                        <Column
                                            field="warnedBy"
                                            header="Warned By"
                                            body={(warn) =>
                                                members.find(
                                                    (member) =>
                                                        member.id === warn.by
                                                ).user.tag
                                            }
                                        />
                                        <Column
                                            field="reason"
                                            header="Reason"
                                        />
                                    </DataTable>
                                ) : (
                                    <h3>No Warns</h3>
                                )}
                            </Dialog>
                            <Dialog
                                header={`Reports of ${currentMember.user.tag}`}
                                visible={reportsDialog}
                                onHide={() => setReportsDialog(false)}
                            >
                                {reports.length > 0 ? (
                                    <DataTable
                                        paginator
                                        loading={reportsLoading}
                                        rows={5}
                                        value={reports}
                                    >
                                        <Column
                                            field="reportedBy"
                                            header="Reported By"
                                            body={(warn) =>
                                                members.find(
                                                    (member) =>
                                                        member.id === warn.by
                                                ).user.tag
                                            }
                                        />
                                        <Column
                                            field="reason"
                                            header="Reason"
                                        />
                                    </DataTable>
                                ) : (
                                    <h3>No Reports</h3>
                                )}
                            </Dialog>
                        </>
                    )}
                    <Dialog
                        header={`Reporting ${currentMember.user.tag}`}
                        visible={reportDialog}
                        onHide={() => onHide("reportDialog")}
                        resizable={false}
                        footer={() => renderFooter("reportDialog")}
                    >
                        <InputText
                            placeholder="Reason for the report"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </Dialog>
                    <Toast ref={toast} />
                </>
            )}
            <DataTable
                className="p-datatable-members"
                paginator
                loading={membersLoading}
                header={header}
                value={members}
                filters={filters}
                removableSort
                responsiveLayout="scroll"
                sortField="joinedTimestamp"
                sortOrder={-1}
                rows={5}
            >
                <Column
                    field="username"
                    header="Username"
                    sortable
                    body={usernameTemplate}
                />
                <Column field="discriminator" header="#" body={atTemplate} />
                <Column
                    field="joinedTimestamp"
                    header="Joined"
                    sortable
                    body={joinedTemplate}
                />
                {auth && (
                    <Column
                        field="memberActions"
                        header="Actions"
                        body={actionTemplate}
                    />
                )}
            </DataTable>
        </>
    );
};

MemberTable.propTypes = {
    auth: PropTypes.object,
    guild: PropTypes.object
};

export default MemberTable;
