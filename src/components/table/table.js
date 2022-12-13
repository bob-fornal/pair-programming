
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
        <TitleRow headers={ data.structure } />
      </thead>
      <tbody>
        { data.content.map((row, index) => <TableRow key={ index } index={ index } row={ row } structure={ data.structure } />) }
      </tbody>
    </table>
  );
}

function TitleRow(props) {
  const headers = props.headers;

  return (
    <tr>
      { headers.map((header, index) => <td key={ index }>{ header.title }</td>) }
    </tr>
  )
}

function TableRow(props) {
  const row = props.row;
  const structure = props.structure;
  const index = props.index;
  console.log(index, index%2);

  return (
    <tr className={ index%2 === 0 ? 'odd' : 'even' }>
      { structure.map((struct, index) => 
          <TableData key={ index } index={ index } data={ row[struct.key] } struct={ struct } />
      ) }
    </tr>
  );
}

function TableData(props) {
  const index = props.index;
  const data = props.data;
  const struct = props.struct;

  switch (true) {
    case (struct.type === 'string'):
      return <td key={ index }>{ data }</td>;
    case (struct.type === 'date'):
      const dataDate = new Date(data);
      const dateFormat = { year: "numeric", month: "short", day: "numeric" };
      const display = dataDate.toLocaleDateString('en-us', dateFormat);
      return <td key={ index }>{ display }</td>;
    case (struct.type === 'email'):
      return <td key={ index }>
        <a href={ `email:${ data }` }>{ data }</a>
      </td>
    default:
      return <td key={ index }>{ data }</td>;
  }
}

export default Table;
