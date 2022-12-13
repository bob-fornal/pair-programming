import { useEffect, useState } from "react";

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
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div className="table-wrapper">
      { data && data.length > 0 && data.map((item) => <p key={ item.user }>{ item.user }</p>) }
    </div>
  );
}

export default Table;
