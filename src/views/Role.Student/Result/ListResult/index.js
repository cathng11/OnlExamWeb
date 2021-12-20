import * as React from 'react';
import { ListResultsForTeacher } from '../../../../data/HeadCells';
import CustomTable from './../../../../components/Table/CustomTable';

export default function ListResult() {
    return (
        <CustomTable rows={rows} headCells={ListResultsForTeacher} view={'Result'} role={'Student'} />
    )
}
