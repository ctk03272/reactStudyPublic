import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import TableComponents from "./TableComponents";
import axios from "axios";
import getTomorrow from "../util/getTomorrow";
import {useAlert} from 'react-alert'

const MainBlock = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
`;

const TableHeader = styled.div`
    margin: 60px auto auto;
    flex: none;
`;
const TableHeaderSpan = styled.span`
  font-size: 50px;
  text-align: justify;
  display:inline-block; 
  padding:25px;
`;
const TableContent = styled.div`
  //background-color: red;
  margin: auto;
  height: 80%;
  width : 80%;
`;


const Main = () => {
    const alert = useAlert();

    const [saleYear, setSaleYear] = useState(2020);
    const [saleMonth, setSaleMonth] = useState(4);
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnAPi, setGridColumnAPi] = useState(null);
    //
    /*    let gridApi = null;
        let gridColumnApi = null;*/

    const onClick = useCallback(type => {
        if (type === '-') {
            if (saleMonth !== 1) {
                setSaleMonth(saleMonth => saleMonth - 1);
            } else {
                setSaleMonth(() => 12);
                setSaleYear(saleYear => saleYear - 1);
            }
        }
        if (type === '+') {
            if (saleMonth !== 12) {
                setSaleMonth(saleMonth => saleMonth + 1);
            } else {
                setSaleMonth(() => 1);
                setSaleYear(saleYear => saleYear + 1);
            }
        }
        if (type === 'add') {
            const selectedRows = gridApi.getSelectedNodes();
            if (!selectedRows || selectedRows.length === 0) {
                let tempArray = [...rowData];
                const maxId = tempArray.reduce((a, b) => {
                    return Math.max(a, b.id);
                }, 0);
                tempArray.splice(0, 0, {
                    date: `${saleYear}-${saleMonth < 10 ? '0' + (saleMonth) : saleMonth}-01`,
                    id: maxId + 1
                });
                setRowData(tempArray);
                return;
            }
            const selectedRow = selectedRows[0];
            const index = selectedRow.rowIndex;
            let tempArray = [...rowData];
            const maxId = tempArray.reduce((a, b) => {
                return Math.max(a, b.id);
            }, 0);
            tempArray.splice(index + 1, 0, {
                date: getTomorrow(new Date(tempArray[index].date)),
                id: maxId + 1
            });
            setRowData(tempArray);
        }
        if (type === 'remove') {
            const selectedRows = gridApi.getSelectedNodes();
            if (!selectedRows || selectedRows.length === 0) {
                alert.show('행을 선택해주세요');
                return;
            }
            const selectedRow = selectedRows[0];
            console.log(selectedRow);
            setRowData(rowData.filter(row => row.id !== selectedRow.data.id));
        }
        if (type === 'save') {
            const saveRowData = async () => {
                try {
                    const result = rowData.map(a => {
                        console.log(a.date.split('-')[0]);
                        console.log(a.date.split('-')[1]);
                        return {
                            saleDate: a.date,
                            tableCount: a.table,
                            cardSales: a.card,
                            moneySales: a.cash,
                            serviceSales: a.service,
                            saleYear: a.date.split('-')[0],
                            saleMonth: a.date.split('-')[1],
                            saleId: a.id
                        }
                    });
                    await axios.post(`http://ctk0327.iptime.org:8080/sales`, result);
                } catch (e) {
                    console.log(e);
                }
            };
            saveRowData().then();
        }
    }, [saleMonth, saleYear, gridApi, rowData]);

    const calculateTotalAndPer=(params)=>{
        params.data.total = parseInt(params.data.card) + parseInt(params.data.cash) + parseInt(params.data.service);
        params.data.per = (parseInt(params.data.card) + parseInt(params.data.cash) + parseInt(params.data.service)) / params.data.table;
    };
    const columnDefs = [
        {
            headerName: "Date", field: "date", valueSetter: (params) => {
                console.log(params);
                if (params.data.date !== params.newValue) {
                    params.data.date = params.newValue;
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            headerName: "Table", field: "table", valueSetter: (params) => {
                if (params.data.table !== params.newValue) {
                    params.data.table = params.newValue;
/*                    params.data.total = params.data.card + params.data.cash + params.data.service;
                    params.data.per = (params.data.card + params.data.cash + params.data.service) / params.data.table;*/
                    calculateTotalAndPer(params);
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            headerName: "Card", field: "card", valueSetter: (params) => {
                if (params.data.card !== params.newValue) {
                    params.data.card = params.newValue;
                    calculateTotalAndPer(params);
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            headerName: "Cash", field: "cash", valueSetter: (params) => {
                if (params.data.cash !== params.newValue) {
                    params.data.cash = params.newValue;
                    calculateTotalAndPer(params);
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            headerName: "Service", field: "service", valueSetter: (params) => {
                if (params.data.service !== params.newValue) {
                    params.data.service = params.newValue;
                    calculateTotalAndPer(params);
                    return true;
                } else {
                    return false;
                }
            }
        },
        {headerName: "ToTal", field: "total"},
        {headerName: "Per", field: "per"},
    ];

    const onGridReady = (params) => {
        console.log(saleMonth);
        setGridApi(params.api);
        setGridColumnAPi(params.columnApi);
        /*        gridApi = params.api;
                gridColumnApi = params.columnApi;*/
        if (gridApi !== null) {
            gridApi.sizeColumnsToFit();
        }
        // gridApi.sizeColumnsToFit();
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            console.log(saleYear);
            try {
                const response = await axios.get(`http://ctk0327.iptime.org:8080/sales?saleYear=${saleYear}&saleMonth=${saleMonth}`);
                const result = response.data.map(a => {
                    return {
                        date: a.saleDate,
                        table: a.tableCount,
                        card: a.cardSales,
                        cash: a.moneySales,
                        service: a.serviceSales,
                        total: a.cardSales + a.moneySales + a.serviceSales,
                        per: (a.cardSales + a.moneySales + a.serviceSales) / a.tableCount,
                        id: a.saleId
                    }
                });
                setRowData(result);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData()
    }, [saleYear, saleMonth]);

    return (
        <MainBlock>
            <TableHeader>
                <button onClick={() => onClick('-')}><MdChevronLeft size={30}/></button>
                <TableHeaderSpan>{saleYear}년 {saleMonth}월</TableHeaderSpan>
                <button onClick={() => onClick('+')}><MdChevronRight size={30}/></button>
            </TableHeader>
            <TableContent>
                {/*안녕*/}
                <button onClick={() => onClick('add')}>Add Rows</button>
                <button onClick={() => onClick('remove')}>Remove Rows</button>
                <TableComponents onGridReady={onGridReady} columnDefs={columnDefs} rowData={rowData}/>
                <div style={{display: "flex"}}>
                    <button style={{marginLeft: "auto"}} onClick={() => onClick('save')}>Save Change</button>
                </div>
            </TableContent>
        </MainBlock>
    );
};

export default Main;