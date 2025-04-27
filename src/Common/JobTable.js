import React from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllCommunityModule]);



const JobTable = ({ rowData, columnDefs, height, rowHeight }) => {
    return (
        <div style={{ height: 350 | height }} className="ag-theme-alpine">
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                theme={"legacy"}
                rowHeight={rowHeight || 25}

            />
        </div>

    )
}

export default JobTable