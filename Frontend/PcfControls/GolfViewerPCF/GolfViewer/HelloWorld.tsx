import * as React from 'react';
import {
  DataGrid,
  DataGridHeader,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  DataGridHeaderCell,
  TableColumnDefinition,
  TableCellLayout,
  createTableColumn,
  FluentProvider,
  webLightTheme,
  Label,
} from '@fluentui/react-components';

// ----------------------
// 🧑‍💼 Types
// ----------------------

type Golfer = {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
};

type GolferStat = {
  id: string;
  golferId: string;
  statName: string;
  value: string;
};

// ----------------------
// 🧾 Sample Data
// ----------------------

const golfers: Golfer[] = [
  { id: '1', firstName: 'Rory', lastName: 'McIlroy', nationality: 'Northern Ireland' },
  { id: '2', firstName: 'Scottie', lastName: 'Scheffler', nationality: 'USA' },
  { id: '3', firstName: 'Jon', lastName: 'Rahm', nationality: 'Spain' },
];

const golferStats: GolferStat[] = [
  { id: 's1', golferId: '1', statName: 'Driving Distance', value: '310.2 yds' },
  { id: 's2', golferId: '1', statName: 'Putting Average', value: '1.71' },
  { id: 's3', golferId: '2', statName: 'Driving Distance', value: '305.4 yds' },
  { id: 's4', golferId: '2', statName: 'Putting Average', value: '1.68' },
  { id: 's5', golferId: '3', statName: 'Driving Distance', value: '312.1 yds' },
  { id: 's6', golferId: '3', statName: 'Putting Average', value: '1.74' },
];

// ----------------------
// 📊 Column Definitions
// ----------------------

const golferColumns: TableColumnDefinition<Golfer>[] = [
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
    renderCell: (item) => {
      const flag = getFlagEmoji(item.nationality);
  
      return (
        <TableCellLayout media={<span style={{ fontSize: '1.2rem' }}>{flag}</span>}>
          {item.nationality}
        </TableCellLayout>
      );
    },
  }),
];

const statsColumns: TableColumnDefinition<GolferStat>[] = [
  createTableColumn<GolferStat>({
    columnId: 'statName',
    renderHeaderCell: () => 'Stat',
    renderCell: (item) => <TableCellLayout>{item.statName}</TableCellLayout>,
  }),
  createTableColumn<GolferStat>({
    columnId: 'value',
    renderHeaderCell: () => 'Value',
    renderCell: (item) => <TableCellLayout>{item.value}</TableCellLayout>,
  }),
];

// ----------------------
// 🧩 Functions
// ----------------------

const getFlagEmoji = (country: string): string => {
  switch (country) {
    case 'USA':
      return '🇺🇸';
    case 'Northern Ireland':
      return '🇮🇪';
    case 'Spain':
      return '🇪🇸';
    default:
      return '🏳️'; // Fallback flag
  }
};

// ----------------------
// 🧩 Component
// ----------------------

export const GolferGrid = () => {
  const [selectedGolferId, setSelectedGolferId] = React.useState<string | undefined>();

  const filteredStats = golferStats.filter((stat) => stat.golferId === selectedGolferId);
  const selectedGolfer = golfers.find((g) => g.id === selectedGolferId);

  return (
    <FluentProvider theme={webLightTheme}>
      <Label style={{ marginBottom: '1rem' }}>
        Golfer List (Fluent UI v9 DataGrid)
      </Label>

      <DataGrid
        items={golfers}
        columns={golferColumns}
        selectionMode="single"
        focusMode="composite"
        getRowId={(item) => item.id}
        style={{ minWidth: '550px' }}
        onSelectionChange={(e, data) => {
          const selectedId = data.selectedItems ? String(Array.from(data.selectedItems)[0]) : undefined;
          setSelectedGolferId(selectedId);
        }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <>
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              </>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<Golfer>>
          {({ item, rowId }) => (
            <DataGridRow<Golfer> key={rowId}>
              {({ renderCell }) => (
                <>
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                </>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>

      <Label style={{ margin: '2rem 0 1rem' }}>
        {selectedGolfer ? `Stats for ${selectedGolfer.firstName}` : 'Golfer Stats'}
      </Label>

      <DataGrid
        items={filteredStats.length > 0 ? filteredStats : []}
        columns={statsColumns}
        getRowId={(item) => item.id}
        style={{ minWidth: '550px' }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <>
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              </>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<GolferStat>>
          {filteredStats.length === 0
            ? () => (
                <DataGridRow>
                  {() => (
                    <DataGridCell colSpan={2}>
                      <i>No stats to display. Select a golfer to see their stats.</i>
                    </DataGridCell>
                  )}
                </DataGridRow>
              )
            : ({ item, rowId }) => (
                <DataGridRow<GolferStat> key={rowId}>
                  {({ renderCell }) =>
                    statsColumns.map((column) => (
                      <DataGridCell key={column.columnId}>
                        {column.renderCell(item)}
                      </DataGridCell>
                    ))
                  }
                </DataGridRow>
              )}
        </DataGridBody>


      </DataGrid>
    </FluentProvider>
  );
};
