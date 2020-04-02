import React, {useEffect, useState} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import styled from "styled-components";
import axios from "axios";

const TableComponents = ({rowData, columnDefs, onGridReady}) => {

    // const [rowData, setRowData] = useState([{
    //     date: "2020-03-06",
    //     table: 3,
    //     card: 10000,
    //     cash: 10000,
    //     service: 10000,
    //     total: 30000,
    //     per: 10000
    // },
    //     {
    //         date: "2020-03-07",
    //         table: 3,
    //         card: 10000,
    //         cash: 10000,
    //         service: 10000,
    //         total: 30000,
    //         per: 10000
    //     }
    // ]);

    const getRowHeight = function (params) {
        return 30;
    };

    const rowSelection= 'single';
    const defaultColDef = {
        flex: 1,
        editable: true,
        resizable: true,
    };
    /*    const onGridReady = (params) => {
            console.log(saleMonth);
            const gridApi = params.api;
            gridApi.sizeColumnsToFit();
            const fetchData = async () => {
                console.log(saleYear)
                const response = await axios.get(`http://ctk0327.iptime.org:8080/sales?saleYear=${saleYear}&saleMonth=${saleMonth}`);
                const result = response.data.map(a => {
                    return {
                        date: a.saleDate,
                        table: a.tableCount,
                        card: a.cardSales,
                        cash: a.moneySales,
                        service: a.serviceSales,
                        total: a.cardSales+a.moneySales+a.serviceSales,
                        per: (a.cardSales+a.moneySales+a.serviceSales)/a.tableCount
                    }
                });
                setRowData(result);
            };
            fetchData()
        };*/


    return (
        <div className="ag-theme-balham" style={{height: '60%', width: '100%'}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                onGridReady={onGridReady}
                getRowHeight={getRowHeight}
                defaultColDef={defaultColDef}
                rowSelection={rowSelection}
                stopEditingWhenGridLosesFocus={true}
            >
            </AgGridReact>
        </div>
    );
};

export default TableComponents;