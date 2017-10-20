import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    getAllItems,
    deleteItem,
    showUpdateModal,
    hideModal,
    showAddModal,
    addProduct,
    updateProduct
} from "actions";
import Page from 'components/Page';
import serializeToObject from 'form-to-object';
import _ from 'lodash';

class Products extends Component {

    constructor(props) {
        super(props);
        this.onSubmitModal = ::this.onSubmitModal
    }

    componentWillMount() {
        const {getAllProducts} = this.props;
        getAllProducts();
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
                title="Products"
                dataList={props.dataList}
                fieldsList={['Name', 'Price']}
                onShowUpdateModal={props.showUpdateModal}
                onShowAddModal={props.showAddModal}
                onDeleteItem={props.deleteProduct}
                onSubmitModal={this.onSubmitModal}
                hideModal={props.hideModal}
                modal={props.modal}
            />
        )
    }
}

export default connect(
    ({products}) => ({
        ...products
    }),
    (dispatch) => {
        const type = 'products';
        let defaultFields = [
            {title: 'Name', name: 'name', value: null},
            {title: 'Price', name: 'price', value: null},
        ];
        return {
            getAllProducts() {
                dispatch(getAllItems(type));
            },
            deleteProduct(id) {
                dispatch(deleteItem(type, id));
            },
            showUpdateModal(field) {
                let fieldForForm = []
                _.forEach(field, (value, key) => {
                    if (['name', 'price'].indexOf(key) >= 0) {
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
                console.log('data',data);
                dispatch(addProduct(data));
            },
            updateProduct(id, data) {
                dispatch(updateProduct(id, data));
            }
        }
    }
)(Products);