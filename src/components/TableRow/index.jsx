import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import _ from 'lodash';


const GlyphiconStyled = styled(Glyphicon)`
    cursor: pointer;
    font-size: 16px;
    &:hover {
      color: #2aabd2;
    }
    &:active {
      color: #96776b;
    }
`;

const TableRow = (props) => {
    return(
        <tr>
            <td>{props.keyRow}</td>
            {
                props.fields.map((item, key)=>(
                    <td key={key}>{props.item[item]}</td>
                ))
            }
            <td><GlyphiconStyled onClick={props.onUpdate} glyph="edit"/></td>
            <td><GlyphiconStyled onClick={props.onDelete} glyph="remove"/></td>
        </tr>
    )
}

TableRow.propTypes = {
    keyRow: PropTypes.number,
    item: PropTypes.object,
    fields: PropTypes.array,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
}
export default TableRow;