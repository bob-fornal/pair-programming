
import { useEffect, useState } from "react";
import './table.css';

function Table() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch('table-data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);
  
  if (data && Object.keys(data).length === 0) return 'Loading ...';
  return (
    <table className="table">
      <thead>
        <TitleRow headers={ data.headers } />
      </thead>
      <tbody>
        { data.content.map((row, index) => <TableRow key={ index } row={ row } />) }
      </tbody>
    </table>
  );
}

function TitleRow(props) {
  const headers = props.headers;

  return (
    <tr>
      { headers.map((header, index) => <td key={ index }>{ header }</td>) }
    </tr>
  )
}

function TableRow(props) {
  const row = props.row;
  const keys = Object.keys(row);

  return (
    <tr>
      { keys.map((key, index) => <td key={ index }>{ row[key] }</td>) }
    </tr>
  );
}

export default Table;
