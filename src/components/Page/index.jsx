import React from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from "styled-components";
import {Helmet} from "react-helmet";

import TableRow from 'components/TableRow';
import DefaultModal from 'components/DefaultModal';

const ToOneLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-items: center;
    &>h1{
        margin-right: 20px;
    }
`;

const Page = (props) => (
    <div>
        <Helmet title={props.title}/>
        <ToOneLine>
            <h1>{props.title} list</h1>
            <div><Button onClick={props.onShowAddModal}>Create</Button></div>
        </ToOneLine>
        <Table responsive>
            <thead>
            <tr>
                <th>#</th>
                {props.fieldsList.map((item, key) => <th key={key}>{item}</th>)}
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                props.dataList.map((item, key) => (
                    <TableRow
                        key={key}
                        keyRow={key}
                        item={item}
                        fields={props.fieldsList.map((item) => item.toLowerCase())}
                        onUpdate={() => props.onShowUpdateModal(item)}
                        onDelete={() => props.onDeleteItem(item.id)}
                    />
                ))
            }
            </tbody>
        </Table>
        <DefaultModal
            show={props.modal.show}
            onHide={props.hideModal}
            fields={props.modal.fields}
            onSubmit={props.onSubmitModal}
            isUpdateType={props.modal.isUpdateType}
        />
    </div>
)

Page.propTypes = {
    title: PropTypes.string,
    dataList: PropTypes.arrayOf(PropTypes.object),
    fieldsList: PropTypes.arrayOf(PropTypes.string),
    onShowUpdateModal: PropTypes.func,
    onShowAddModal: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onSubmitModal: PropTypes.func,
    hideModal: PropTypes.func,
    modal: PropTypes.object,
}
export default Page;