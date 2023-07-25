import { useContext, useEffect, useRef, useState } from "react";
import axios from "../lib/axios";

export default function Form({ onRefresh }) {
  const refId = useRef();
  const refUsername = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refExp = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const id = refId.current.value;
    const dataPlayer = {
      // id: refId.current.value,
      username: refUsername.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
      experience: refExp.current.value,
    };

    axios
      .put(`/api/v1/players/${id}`, dataPlayer)
      .then((data) => {
        if (data.status != 200) {
          alert("failed to save data");
        }

        onRefresh();
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <table>
          <tr>
            <td>Id of Player</td>
            <td>:</td>
            <td>
              <input
                className="form-control"
                ref={refId}
                type="id"
                placeholder="id"
              />
            </td>
          </tr>
          <tr>
            <td>New Username</td>
            <td>:</td>
            <td>
              <input
                className="form-control"
                ref={refUsername}
                type="text"
                placeholder="username"
              />
            </td>
          </tr>
          <tr>
            <td>New Email</td>
            <td>:</td>
            <td>
              <input
                className="form-control"
                ref={refEmail}
                type="email"
                placeholder="email"
              />
            </td>
          </tr>
          <tr>
            <td>New Password</td>
            <td>:</td>
            <td>
              <input
                className="form-control"
                ref={refPassword}
                type="password"
                placeholder="password"
              />
            </td>
          </tr>
          <tr>
            <td>Exp</td>
            <td>:</td>
            <td>
              <input
                className="form-control"
                ref={refExp}
                type="number"
                placeholder="experience"
              />
            </td>
          </tr>
          <tr>
            <td>
              <button className="btn btn-success btn-sm" type="submit">
                Save New Data
              </button>
            </td>
            <td>
              <button className="btn btn-danger btn-sm" type="reset">
                Reset
              </button>
            </td>
          </tr>
        </table>
      </form>
    </>
  );
}
