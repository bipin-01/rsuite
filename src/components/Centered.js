import React, { useState } from 'react';
import { Container, Content, FlexboxGrid, FlexboxGridItem, Footer, Header, IconButton, Input, InputGroup, Pagination } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import {
    Table,
    Popover,
    Whisper,
    Checkbox,
    Dropdown,
    Progress,
  } from 'rsuite';
  import { mockUsers } from './mock';
  import './styles.css';

  const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(80);

const ImageCellWithLabel = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 12 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          background: '#f5f5f5',
          borderRadius: 6,
          margin: '5px 15px 2px 5px',
          overflow: 'hidden',
          display: 'inline-block',
        }}
      >
        <img src={rowData.avatar} alt="avatar" width="40" />
      </div>
      <div>{rowData.name} </div>
    </div>
  </Cell>
);

const ProjectLeader = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 12 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          background: '#f5f5f5',
          borderRadius: 50,
          margin: '5px 15px 2px 5px',
          overflow: 'hidden',
          display: 'inline-block',
        }}
      >
        <img src={rowData.avatar} alt="avatar" width="40" />
      </div>
      <div>SP</div>
    </div>
  </Cell>
);

const AccountManager = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 12 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          background: '#f5f5f5',
          borderRadius: 50,
          margin: '5px 15px 2px 5px',
          overflow: 'hidden',
          display: 'inline-block',
        }}
      >
        <img src={rowData.avatar} alt="avatar" width="40" />
      </div>
      <div>SP</div>
    </div>
  </Cell>
);

const RelationshipManager = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 12 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          background: '#f5f5f5',
          borderRadius: 50,
          margin: '5px 15px 2px 5px',
          overflow: 'hidden',
          display: 'inline-block',
        }}
      >
        <img src={rowData.avatar} alt="avatar" width="40" />
      </div>
      <div>SP</div>
    </div>
  </Cell>
);

const Status = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 12 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-block',
        }}
      >
        ⭐️
      </div>
      <div>In Progress</div>
    </div>
  </Cell>
);

const ProjectTimeline = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 12 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          marginRight: '10px',
          display: 'inline-block',
          fontSize: '14px',
          width: '100px'
        }}
      >
        {' '}
        Jul 01, 2020
      </div>
      <Progress.Line percent={80} strokeWidth={5} showInfo={false} style={{width:'224px'}} />
      <div
        style={{
          marginRight: '10px',
          display: 'inline-block',
          fontSize: '14px',
          width:'100px'
        }}
      >
        {' '}
        Jul 01, 2020
      </div>
    </div>
  </Cell>
);


function Centered() {

    const [activePage, setActivePage] = useState(1);
    const PAGE_SIZE = 35;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState(null);

    
  const filteredData = data.filter((item) => {

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    return fullName.includes(lowerCaseSearchTerm);
  });

  const pageCount = Math.ceil(filteredData.length / PAGE_SIZE);
  const sortedData = sortOrder ? [...filteredData].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  }) : filteredData;
  const displayData = sortedData.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE);
  
    const handlePageChange = (dataKey) => {
      setActivePage(dataKey);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        setActivePage(1);
      };


  
      const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        console.log("hello world")
      };

  return (
    <>
    <div className='mainContainer'>
    <Container style={{margin: "50px", paddingLeft: '300px', paddingRight: '200px'}}>
      <Header><div>
        <h1>Projects</h1>
      </div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <InputGroup style={{ width: 400 }}>
          <InputGroup.Button>
            <IconButton
              size="sm"
              icon={<SearchIcon />}
              style={{ color: 'rgba(0, 0, 0, 0.35)', padding: 0, height: 20 }}
              className="icon-button"
            />
          </InputGroup.Button>
          <Input
            placeholder="Search by project name"
            value={searchTerm} 
            onChange={handleSearch}
            style={{ marginLeft: 30 }}
            className="search-input"
          />
        </InputGroup>
      </div>
      <hr />
      </Header>
      <Content>
      <Table autoHeight={true} data={displayData} id="table" rowHeight={52} virtualized>
        <Column width={220} sortable={true}>
          <HeaderCell
            onClickCapture={handleSort}
            style={{
              height: '51px',
              fontSize: '14px',
              color: '#29B6F6',
              fontWeight: 'bold',
              cursor:'pointer'
            }}
          >
            Project Name
          </HeaderCell>
          <ImageCellWithLabel />
        </Column>

        <Column width={360} sortable={true}>
          <HeaderCell
            style={{ height: '51px', fontSize: '14px', color: '#29B6F6' }}
          >
            Project Timeline
          </HeaderCell>
          <ProjectTimeline />
        </Column>

        <Column width={150}>
          <HeaderCell
            style={{ height: '51px', fontSize: '14px', color: '#29B6F6' }}
          >
            Status
          </HeaderCell>
          <Status />
        </Column>

        <Column width={120}>
          <HeaderCell
            style={{ height: '51px', fontSize: '14px', color: '#29B6F6' }}
          >
            Project Leader
          </HeaderCell>
          <ProjectLeader />
        </Column>

        <Column width={100}>
          <HeaderCell
            style={{ height: '51px', fontSize: '14px', color: '#29B6F6' }}
          >
            Category
          </HeaderCell>
          <Cell>Services</Cell>
        </Column>

        <Column width={100}>
          <HeaderCell
            style={{ height: '51px', fontSize: '14px', color: '#29B6F6' }}
          >
            AM
          </HeaderCell>
          <AccountManager />
        </Column>

        <Column width={100}>
          <HeaderCell
            style={{ height: '51px', fontSize: '14px', color: '#29B6F6' }}
          >
            RM
          </HeaderCell>
          <RelationshipManager />
        </Column>
      </Table>
      </Content>
      <Footer>
      <div className="pagination-wrapper">
        <Pagination
          prev='Prev'
          last='last'
          next='Next'
          first='First'
          size="lg"
          pages={Math.ceil(data.length / 35)}
          activePage={activePage}
          onSelect={handlePageChange}
        />
      </div>
      </Footer>
    </Container>
    </div>
    </>
  );
}

export default Centered;
