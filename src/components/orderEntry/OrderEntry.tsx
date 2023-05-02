
import { ProgressSpinner } from 'primereact/progressspinner';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from "primereact/autocomplete";
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { BlockUI } from 'primereact/blockui';
import useOrderEntry from '../../hooks/useOrdersEntry';

const OrderEntry = () => {
    const {
        isLoading,
        submitEnabled,
        actionValues,
        action,
        setAction,
        symbol,
        setSymbol,
        filteredSymbols,
        searchSymbol,
        qty,
        setQty,
        price,
        setPrice,
        stopPrice,
        setStopPrice,
        comment,
        setComment,
        orderTypeValues,
        orderType,
        setOrderType,
        TIFTypeValues,
        TIFType,
        setTIFType,
        handleSubmit,
        handleKeyPress
    } = useOrderEntry();
    const cssClass = "text-base text-color w-full"
    const cssClassAction = cssClass + ' ' + 'action';

    return (<Panel header="Order Entry">
       
        <form onSubmit={handleSubmit}>
            <div className="formgrid grid">
                <div className="field col">
                    <label>Actions:</label>
                    <Dropdown value={action} options={actionValues} style={{ backgroundColor: action === 'Buy' ? 'green' : 'red' }} className={cssClassAction} onChange={(e) => setAction(e.value)} />
                </div>
                <div className="field col">
                    <label>Symbol:</label>

                    <AutoComplete
                        value={symbol}
                        suggestions={filteredSymbols}
                        completeMethod={searchSymbol}
                        onChange={(e) => setSymbol(e.value)}
                        showEmptyMessage
                        emptyMessage="not found"
                        placeholder='<Enter Symbol>'
                        onKeyPress={handleKeyPress}
                    />

                </div>
                <div className="field col">
                    <label>Qty:</label>
                    <InputNumber value={qty} onKeyPress={handleKeyPress} onValueChange={(e: InputNumberValueChangeEvent) => setQty(e.value ?? 0)} showButtons min={0} max={999} className={cssClass} />
                </div>
                <div className="field col">
                    <label>Price:</label>
                    <InputNumber value={price} onKeyPress={handleKeyPress} onValueChange={(e: InputNumberValueChangeEvent) => setPrice(e.value ?? 0.00)} showButtons mode="decimal" minFractionDigits={2} maxFractionDigits={2} className={cssClass} />
                </div>
            </div>

            <div className="formgrid grid">
                <div className="field col">
                    <label>OrderType:</label>
                    <Dropdown value={orderType} onKeyPress={handleKeyPress} options={orderTypeValues} onChange={(e) => setOrderType(e.value)} className={cssClass} />
                </div>
                <div className="field col">
                    <label>TIF:</label>
                    <Dropdown value={TIFType} onKeyPress={handleKeyPress} options={TIFTypeValues} onChange={(e) => setTIFType(e.value)} className={cssClass} />

                </div>
                <div className="field col">
                </div>
                <div className="field col">
                    <label>Stop Price:</label>
                    <InputNumber value={stopPrice} onKeyPress={handleKeyPress} onValueChange={(e: InputNumberValueChangeEvent) => setStopPrice(e.value ?? 0.00)} showButtons mode="decimal" minFractionDigits={2} maxFractionDigits={2} className={cssClass} />
                </div>
            </div>
            <div className="formgrid grid">
                <div className="field col-6">
                    <InputTextarea value={comment} rows={3} cols={30} placeholder="<COMMENT>" onChange={(e) => setComment(e.target.value)} />
                </div>
                <div className="field col"></div>
                <div className="field col flex align-items-end flex-wrap">
                    <Button label="Submit" type="submit" className="flex-end w-full max-w-10rem" disabled={!submitEnabled} />
                </div>

            </div>
            <BlockUI blocked={isLoading} fullScreen children={isLoading && <div id="overlay"><ProgressSpinner /></div>} />

        </form>

    </Panel>
    )
}

export default OrderEntry;

