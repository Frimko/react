import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    getAllItems,
    deleteItem,
    showUpdateModal,
    hideModal,
    showAddModal,
    addCustomer,
    updateCustomer
} from "actions";
import Page from 'components/Page';
import serializeToObject from 'form-to-object';
import _ from 'lodash';

class Customers extends Component {

    constructor(props) {
        super(props);
        this.onSubmitModal = ::this.onSubmitModal
    }

    componentWillMount() {
        const {getAllCustomers} = this.props;
        getAllCustomers();
    }

    onSubmitModal(event) {
        const props = this.props;
        event.preventDefault();
        /* резкое обострение лени, redux-form с валидацией отменяется*/
        let data = serializeToObject(event.target);
        if (props.modal.isUpdateType) {
            props.updateProduct(props.modal.id, data);
        } else {
            props.addProduct(data);
        }
    }

    render() {
        const props = this.props;
        if (!props.dataList.length) return null;
        return (
            <Page
                title="Customer"
                dataList={props.dataList}
                fieldsList={['Name', 'Address', 'Phone']}
                onShowUpdateModal={props.showUpdateModal}
                onShowAddModal={props.showAddModal}
                onDeleteItem={props.deleteCustomer}
                onSubmitModal={this.onSubmitModal}
                hideModal={props.hideModal}
                modal={props.modal}
            />
        )
    }
}

export default connect(
    ({customers}) => ({
        ...customers
    }),
    (dispatch) => {
        const type = 'customers';
        let defaultFields = [
            {title: 'Name', name: 'name', value: null},
            {title: 'Address', name: 'address', value: null},
            {title: 'Phone', name: 'phone', value: null}
        ];
        return {
            getAllCustomers() {
                dispatch(getAllItems(type));
            },
            deleteCustomer(id) {
                dispatch(deleteItem(type, id));
            },
            showUpdateModal(field) {
                let fieldForForm = []
                _.forEach(field, (value, key) => {
                    if (['name', 'address', 'phone'].indexOf(key) >= 0) {
                        fieldForForm.push({title: key[0].toUpperCase() + key.slice(1), name: key, value: value})
                    }
                })
                dispatch(showUpdateModal(type, fieldForForm, field.id));
            },
            showAddModal() {
                dispatch(showAddModal(type, defaultFields));
            },
            hideModal() {
                dispatch(hideModal(type));
            },
            addProduct(data) {
                dispatch(addCustomer(data));
            },
            updateProduct(id, data) {
                dispatch(updateCustomer(id, data));
            }
        }
    }
)(Customers);