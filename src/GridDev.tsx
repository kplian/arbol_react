import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



import {
    Column,
    TreeDataState,
    CustomTreeData,
    SelectionState,
    IntegratedSelection,
    SearchState,
    IntegratedFiltering,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableTreeColumn,
    TableColumnVisibility,
    ColumnChooser,
    VirtualTable,
    Toolbar,
    SearchPanel,

} from '@devexpress/dx-react-grid-material-ui';
import Loading from "./loadin/Loadign";


const GridDev = ({treeConfig}: any) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuOption=()=>{
        return (<div>
            {/*<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>*/}
            {/*    Open Menu*/}
            {/*</Button>*/}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>)
    };
    // const getQueryString = () => {
    //     let filter = columns.reduce((acc, { name }) => {
    //         acc.push(`["${name}", "contains", "${encodeURIComponent(searchValue)}"]`);
    //         return acc;
    //     }, []).join(',"or",');
    //
    //     if (columns.length > 1) {
    //         filter = `[${filter}]`;
    //     }
    //
    //     return `${URL}?filter=${filter}`;
    // };
    // const [col] = useState([
    //     //     {name: 'OrderNumber', title: 'Order Number'},
    //     //     {name: 'OrderDate', title: 'Order Date'},
    //     //     {name: 'StoreCity', title: 'Store City'},
    //     //     {name: 'StoreState', title: 'Store State'},
    //     //     {name: 'Employee', title: 'Employee'},
    //     //     {name: 'SaleAmount', title: 'Sale Amount'},
    //     // ]);

    const {
        URL,
        ROOT_ID,
        columnas,
        columnExtensions,
        showSelectionControls,
        showSelectAll,
        defaultHiddenColumnNames,
        tableColumnVisibilityColumnExtensions,
        showColumnVisible,
        defaultSorting,
        showSortingControls,
    } = treeConfig;

    const columns: Column[] = columnas;
    const tableColumnExtensions: Table.ColumnExtension[] = columnExtensions;
    const getRowId = (row: any) => row.id;

    const getChildRows = (row: any, rootRows: any) => {
        const childRows = rootRows.filter((r: any) => r.parentId === (row ? row.id : ROOT_ID));
        if (childRows.length) {
            return childRows;
        }
        return row && row.hasItems ? [] : null;
    };
    //
    // const EditCell = (props) => {
    //     const { column } = props;
    //     const availableColumnValues = availableValues[column.name];
    //     if (availableColumnValues) {
    //         return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
    //     }
    //     return <TableEditRow.Cell {...props} />;
    // };

    const [data, setData] = useState([]);
    const rowExpanded: any = [];
    const [expandedRowIds, setExpandedRowIds] = useState(rowExpanded);
    const [loading, setLoading] = useState(false);

    const loadData = () => {
        const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds]
            .filter(rowId => data.findIndex((row: any) => row.parentId === rowId) === -1);
        if (rowIdsWithNotLoadedChilds.length) {
            if (loading) return;
            setLoading(true);
            Promise.all(rowIdsWithNotLoadedChilds
                .map(rowId => fetch(`${URL}?parentIds=${rowId}`, {mode: 'cors'})
                    .then(response => response.json())))
                .then((loadedData) => {
                    setData(data.concat(...loadedData));
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    };
    useEffect(() => {
        if (!loading) {
            loadData();
        }
    });

    return (
        <>
            <Paper>
                <Grid
                    rows={data}
                    columns={columns}
                    getRowId={getRowId}
                >

                    <SortingState
                        defaultSorting={defaultSorting}
                    />
                    <IntegratedSorting />

                    <SearchState defaultValue=""/>
                    <IntegratedFiltering/>
                    {/*<SearchState*/}
                    {/*    onValueChange={setSearchValue}*/}
                    {/*/>*/}
                    <SelectionState/>
                    <TreeDataState
                        expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={setExpandedRowIds}
                    />
                    <CustomTreeData
                        getChildRows={getChildRows}
                    />
                    <VirtualTable
                        columnExtensions={tableColumnExtensions}
                    />
                    <IntegratedSelection/>
                    <Table
                        columnExtensions={tableColumnExtensions}
                    />
                    {showSortingControls
                        ?<TableHeaderRow
                            showSortingControls
                        />
                        :<TableHeaderRow
                        />
                    }

                    {showColumnVisible && <TableColumnVisibility

                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                        columnExtensions={tableColumnVisibilityColumnExtensions}
                    />}
                    <Toolbar />
                    <SearchPanel />
                    {showColumnVisible && <ColumnChooser/>}

                    <TableTreeColumn
                        for={columns[0].name}
                        showSelectionControls={showSelectionControls}
                        showSelectAll={showSelectAll}
                    />
                </Grid>
            </Paper>
            {loading && <Loading/>}
        </>
    );
};
export default GridDev;