




import 'primeicons/primeicons.css';
import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useNavigate } from 'react-router-dom';
import useLoginController from '../../controllers/LoginController';
import axios from 'axios';

interface EventDetails {
    eventId: number,
    eventName: string,
    ticketDetails: TicketDetails
}
interface TicketDetails {
    ticketId: number,
    ticketName: string,
    status: [],
    typeTicket: string,
    userId: number,
    name: string,
    email: string,
    cpf: string,
    sex: string,
    document: string,
    registration: string,
    athleticId: number,
    athleticName: string,
}
// 'ticketId', 'ticketName', 'status', 'typeTicket', 'userId', 'name', 'email', 'cpf', 'sex', 'document', 'registration', 'athleticId', 'athleticName', 
export default function BasicFilterDemo() {
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        typeTicket: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ticketName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        
        // representative: { value: null, matchMode: FilterMatchMode.IN },
        // status: { value: null, matchMode: FilterMatchMode.EQUALS },
        // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [statuses] = useState<string[]>(['cancelado', 'confirmado', 'expirado', 'processando', 'aguardando']);
    const navigate = useNavigate();
    const { getSessionUser } = useLoginController();
    const user = getSessionUser();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [events, setEvents] = useState<any>();
    const [eventDetails, setEventDetails] = useState<EventDetails>();
    const [ticketDetails, setTicketDetails] = useState<TicketDetails[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>();
    const checkUserToken = () => {
        const userToken = sessionStorage.getItem('user');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }

    // ticketID, ticketName, ticketStatus, nameUser, email, cpf, sexo, documento, registration

    const url = process.env.REACT_APP_SERVER_URL;

    const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";
    if (dataFromStorage) {
        const parsedData = JSON.parse(dataFromStorage);
        token = parsedData.token;
    }

    const headers = {
        headers: {
            "Content-Type": "Application/json",
            Authorization: token,
            Access: serverSideAccessToken,
            Confirm: true,
        },
    }
    const getEvents = async () => {
        try {
            const userTicket = await axios.get(
                `${url}admin/events/`,
                headers
            );
            console.log(userTicket)
            setEvents((prev: any) => prev = userTicket.data)
        } catch (error) {
            console.error("book: ", error);
        }
    }
    const getUserTicketsByEventId = async (eventId: number) => {
        try {
            const userTicket = await axios.get(
                `${url}admin/getdatausersbyevent/${eventId}`,
                headers
            );
            console.log(userTicket)
            setEventDetails(userTicket.data)
            setTicketDetails(userTicket.data.ticketDetails)
        } catch (error) {
            console.error("book: ", error);
        }
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {

        if (!isAdmin) {
            navigate('/home');
        }
        getUserTicketsByEventId(1)
        getEvents();
        if (selectedEvent) {
            getUserTicketsByEventId(selectedEvent.id)
        }
    }, [navigate, selectedEvent]);

    if (!isAdmin) {
        return null;
    }


    const getSeverity = (status: string) => {
        switch (status) {
            case 'cancelado':
                return 'danger';

            case 'confirmado':
                return 'success';

            case 'processando':
                return 'warning';

            case 'expirado':
                return 'info';

            case 'aguardando':
                return null;
        }
    };


    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    
    const documentBodyTemplate = (rowData: TicketDetails) => {
        return <a href={`${url}uploads/users/${rowData.document}`} target='_blank' download={rowData.document}>
            <i className="pi pi-file-pdf"></i>
        </a>
    };
    const registrationBodyTemplate = (rowData: TicketDetails) => {
        return <a href={`${url}uploads/users/${rowData.registration}`} target='_blank' download={rowData.registration}>
            <i className="pi pi-file-pdf"></i>
        </a>
    };



   
    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={ticketDetails} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                globalFilterFields={[
                    'typeTicket', 
                    'ticketName', 
                    'name', 
                    'ticketId', 
                    'email', 
                    'cpf', 
                    'sex', 
                    'athleticName',
                    ]} header={header} emptyMessage="Sem ingressos">
                <Column header="Tipo do ingresso" field="typeTicket" filterPlaceholder="Tipo do ingresso" style={{ minWidth: '14rem' }} filter />
                <Column field="name" header="Name" filter filterPlaceholder="Nome" style={{ minWidth: '14rem' }} />
                <Column field="ticketName" header="Ingresso" filter filterPlaceholder="Ingresso" style={{ minWidth: '14rem' }} />
                <Column field="ticketId" header="Código ingresso" filter filterPlaceholder="Código" style={{ minWidth: '24rem' }} />
                <Column field="email" header="Email" filter filterPlaceholder="Email" style={{ minWidth: '14rem' }} />
                <Column field="cpf" header="CPF" filter filterPlaceholder="CPF" style={{ minWidth: '12rem' }} />
                <Column field="sex" header="Sexo" filter filterPlaceholder="Sexo" style={{ minWidth: '12rem' }} />
                <Column field="athleticName" header="Atlética" filter filterPlaceholder="Atlética" style={{ minWidth: '12rem' }} />
                <Column header="Documento" showFilterMenu={false} style={{ minWidth: '6rem', textAlign:'center' }} body={documentBodyTemplate} />
                <Column header="Matricula" showFilterMenu={false} style={{ minWidth: '6rem', textAlign:'center' }} body={registrationBodyTemplate} />

            </DataTable>
        </div>
    );
}
