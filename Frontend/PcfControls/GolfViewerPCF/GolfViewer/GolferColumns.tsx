import {
  createTableColumn,
  TableCellLayout,
  TableColumnDefinition
} from '@fluentui/react-components';
import * as React from 'react';

export type Golfer = {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
};

export const golferColumns: TableColumnDefinition<Golfer>[] = [
  createTableColumn<Golfer>({
    columnId: 'firstName',
    renderHeaderCell: () => 'First Name',
    renderCell: (item) => <TableCellLayout>{item.firstName}</TableCellLayout>,
  }),
  createTableColumn<Golfer>({
    columnId: 'lastName',
    renderHeaderCell: () => 'Last Name',
    renderCell: (item) => <TableCellLayout>{item.lastName}</TableCellLayout>,
  }),
  createTableColumn<Golfer>({
    columnId: 'nationality',
    renderHeaderCell: () => 'Nationality',
    renderCell: (item) => <TableCellLayout>{item.nationality}</TableCellLayout>,
  }),
];
