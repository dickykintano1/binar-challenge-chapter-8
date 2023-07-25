import { useContext, useEffect, useRef, useState } from "react";
import axios from "../lib/axios";

export default function Form({ onRefresh }) {
  const refUsername = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refExp = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const dataPlayer = {
      username: refUsername.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
      experience: refExp.current.value,
    };

    axios
      .post("/api/v1/players", dataPlayer)
      .then((data) => {
        if (data.status != 201) {
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
            <td>Username</td>
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
            <td>Email</td>
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
            <td>Password</td>
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
