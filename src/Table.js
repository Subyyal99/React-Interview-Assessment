import * as React from "react";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort";
import { useNavigate } from "react-router-dom";

const TableComponent = ({ data }) => {
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(data);
  const [isHide, setHide] = React.useState(false);
  const navigate = useNavigate();

  function onSortChange(action, state) {
    console.log(action, state);
  }
  const colorTheme = {
    BaseRow: `
        color: #141414;
      `,
    Row: `
        &:hover {
            color: orange;
        }
        cursor: pointer;
      `,
  };

  const stripedTheme = {
    BaseRow: `
      font-size: 14px;
      `,
    HeaderRow: `
      background-color: #eaf5fd;
      `,
    Row: `
      &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }
        &:nth-of-type(even) {
            background-color: #eaf5fd;
        }
        `,
  };

  const marginTheme = {
    BaseCell: `
      margin: 9px;
      padding: 11px;
      `,
  };
  const theme = useTheme([colorTheme, stripedTheme, marginTheme]);

  const sort = useSort(
    filteredData,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        PRICE: (array) => array.sort((a, b) => a.price - b.price),
        BED: (array) => array.sort((a, b) => a.beds - b.beds),
        AREA: (array) =>
          array.sort((a, b) => a.coveredAreaSQFT - b.coveredAreaSQFT),
        TITLE: (array) => array.sort((a, b) => a.title - b.title),
      },
    }
  );

  const HandleRowClick = (item) => {
    // console.log(item);
    navigate(`/details/${item.id}`, { state: item });
  };

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredResults = data.filter((item) =>
      item.title.toLowerCase().includes(searchText)
    );
    setFilteredData(filteredResults);
    setSearch(searchText);
  };
  const handleFilter = () => {
    if (isHide) {
      setFilteredData(data);
    } else {
      const filteredResults = data.filter((item) => !item.isCommercial);
      setFilteredData(filteredResults);
    }
    setHide(!isHide);
  };

  return (
    <>
      <label htmlFor="search">
        Search by Title:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>
      <br />
      <div>
        <label htmlFor="complete">
          Hide Commercial:
          <input
            id="complete"
            type="checkbox"
            checked={isHide}
            onChange={handleFilter}
          />
        </label>
      </div>

      <Table data={{ nodes: filteredData }} theme={theme} sort={sort}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>#</HeaderCell>

                <HeaderCellSort sortKey="TITLE">Title</HeaderCellSort>
                <HeaderCell>Address</HeaderCell>
                <HeaderCellSort sortKey="BED">Beds</HeaderCellSort>
                <HeaderCell>Bath</HeaderCell>
                <HeaderCellSort sortKey="AREA">
                  Covered Area SQFT
                </HeaderCellSort>
                <HeaderCell>Commercial</HeaderCell>
                <HeaderCellSort sortKey="PRICE">Price</HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item, i) => (
                <Row
                  onClick={() => HandleRowClick(item)}
                  key={item.id}
                  item={item}
                >
                  <Cell>{i+1}</Cell>

                  <Cell>{item.title}</Cell>
                  <Cell>{item.address}</Cell>
                  <Cell>{item.beds}</Cell>
                  <Cell>{item.bath}</Cell>
                  <Cell>{item.coveredAreaSQFT}</Cell>
                  <Cell>{item.isCommercial ? "Yes" : "No"}</Cell>
                  <Cell>{item.price}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </>
  );
};

export default TableComponent;
