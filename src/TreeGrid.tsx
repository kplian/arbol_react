import React, {useEffect, useState} from 'react';
import GridDev from "./GridDev";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const TreeGrid = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const openModal = () => {
        console.log('Open modal');
        setIsOpen(!isOpen);
        return (
            <h1>Modal Open</h1>
        )
    };
    const treeConfig: Object = {
        URL: 'https://js.devexpress.com/Demos/Mvc/api/treeListData',
        ROOT_ID: '',
        showColumnVisible: true,
        showSelectAll: true,
        showSelectionControls: true,
        columnas: [
            {
                name: 'name',
                title: 'Menu'
            },
            {
                name: 'size',
                title: 'Size',
                getCellValue: (row: any) => (row.size ? `${Math.ceil(row.size / 1024)} KB` : '')
            }, {
                name: 'createdDate',
                title: 'Created Date',
                getCellValue: (row: any) => new Date(Date.parse(row.createdDate)).toLocaleString()
            }, {
                name: 'action',
                title: 'Actions',
                getCellValue: (row: any) => {
                    return (
                        <>
                            <Button
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon/>
                            </Button>
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
                        </>
                    )

                },
            }
        ],
        columnExtensions: [
            {columnName: 'name', width: 400},
            {columnName: 'size', align: "right"},
            {columnName: 'createdDate', width: 200},
            {columnName: 'action', width: 70, align: "right"}
        ],
        defaultHiddenColumnNames: [],
        tableColumnVisibilityColumnExtensions: [
            {
                columnName: "name",
                togglingEnabled: false
            }
        ],
    };

    return (
        <>
            <h1>Tree Grid</h1>
            <hr/>

            <GridDev treeConfig={treeConfig}/>
        </>
    )
};
export default TreeGrid;