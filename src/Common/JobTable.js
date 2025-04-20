import React from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];

// Column Definitions: Defines the columns to be displayed.
const colDefs = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
];


const JobTable = ({ height, rowHeight }) => {
    return (
        <div style={{ height: 350 | height }} className="ag-theme-alpine">
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                pagination={true}
                theme={"legacy"}
                rowHeight={rowHeight || 25}

            />
        </div>

    )
}

export default JobTable