import { useState } from 'react';
import Table from "./components/Table";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import './app.css'

function App() {
  const [refresh, setRefresh] = useState(1);

  const handleOnRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div>
      <h1>Create Player</h1>
      <CreateForm onRefresh={handleOnRefresh} />
      <br />
      <br />

      <h1>Edit Player</h1>
      <EditForm onRefresh={handleOnRefresh} />
      <br />
      <br />

      <div className='table-container'>
        <Table refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
