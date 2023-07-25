import { useContext, useEffect, useRef, useState } from "react";
import axios from "../lib/axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './table.css';

export default function Table({ refresh, onRefresh }) {
  const refId = useRef();
  const [players, setPlayers] = useState([]);

  const loadPlayersFromApi = () => {
    axios
      .get("/api/v1/players")
      .then((data) => {
        setPlayers([]);
        setPlayers(data.data.data);
      })
      .catch(() => {
        alert("something wrong");
      });
  };

  const deletePlayer = (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: `Are you sure to delete player ${id}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => 
            axios
              .delete(`/api/v1/players/${id}`)
              .then((data) => {
                if (data.status != 200) {
                  alert("failed to save data");
                }
              })
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
    
  }

  useEffect(() => {
    loadPlayersFromApi();
  }, [refresh]);

  useEffect(() => {
    loadPlayersFromApi();
  }, []);

  return (
    <>
      <button
        className="btn btn-info btn-sm"
        onClick={() => loadPlayersFromApi()}
      >
        Load
      </button>
      <button className="btn btn-danger btn-sm" onClick={() => setPlayers([])}>
        Clear
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Exp</th>
            <th>Level</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {players &&
            players.map((player, key) => (
              <tr key={key}>
                <td>{player.id}</td>
                <td>{player.username}</td>
                <td>{player.email}</td>
                <td>{player.password}</td>
                <td>{player.experience}</td>
                <td>{player.lvl}</td>
                <td>{player.createdAt}</td>
                <td>{player.updatedAt}</td>
                <button className="dlt-btn"  onClick={() => deletePlayer(player.id)}>Delete</button>
              </tr>
            ))}
             <br></br>
        </tbody>     
      </table>
    </>
  );
}
