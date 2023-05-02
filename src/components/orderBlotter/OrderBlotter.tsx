import { ColDef, FirstDataRenderedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Panel } from 'primereact/panel';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const OrderBlotter = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const { lastUpdated, latestOrder } = useSelector((state: RootState) => state.orders)
    const [rowData] = useState([]);

    useEffect(() => {
        gridRef?.current?.api?.applyTransaction({
            add: [latestOrder],
            addIndex: 0
        });

    }, [lastUpdated, latestOrder])

    const columnDefs = useMemo<ColDef[]>(() =>[
        { field: 'action' },
        { field: 'symbol' },
        { field: 'qty' },
        { headerName: 'Order Type', field: 'orderType' },
        { headerName: 'TIF', field: 'TIFType' },
        { field: 'price', valueFormatter:(params) =>  params.value.toFixed(2) },
        { headerName: 'Stop Price', field: 'stopPrice', valueFormatter:(params) =>  params.value.toFixed(2)},
        { field: 'comment', tooltipValueGetter:(params) => params.value}
    ],[])

    const onFirstDataRendered = useCallback(() => {
        gridRef.current!.api.sizeColumnsToFit();
      }, []);

    const headerTemplate = (
        <div className="grid p-panel-header p-3">
            <div className="col-2 p-0"><span className="p-panel-title" id="pr_id_5_header">Order Blotter</span></div>
            <div className="col-3 col-offset-7 p-0"> {lastUpdated &&<span className="p-panel-title" id="pr_id_5_header">{`Last Updated: ${lastUpdated}`}</span>}</div>
        </div>
    );

    return (
        <Panel header={`Order Blotter ${lastUpdated}`} className="mypanel" headerTemplate={headerTemplate}>
            <div style={containerStyle}>
                <div className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onFirstDataRendered={onFirstDataRendered}
                        >
                    </AgGridReact>
                </div>
            </div>
        </Panel>
    );
}

export default OrderBlotter;
