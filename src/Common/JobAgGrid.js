"use client";
import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import { AgGridReactProps } from "ag-grid-react"; // optional if using TypeScript

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// AG Grid Modules registration
import { ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const JobAgGrid = ({ rowData, columnDefs }) => {
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
    }), []);

    return (
        <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection="single"
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default JobAgGrid;
