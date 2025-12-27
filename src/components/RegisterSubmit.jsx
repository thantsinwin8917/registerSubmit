import { useRef, useState } from "react";
import "./RegisterSubmit.css";

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Others", value: "others" },
];

const HOBBY_OPTIONS = [
  { label: "Music", value: "music" },
  { label: "Movies", value: "movies" },
  { label: "Plastic Models", value: "plastic models" },
];

const ROLE_OPTIONS = [
  { label: "General Staff", value: "general staff" },
  { label: "Developer", value: "developer" },
  { label: "System Analyst", value: "system analyst" },
];

export default function RegisterSubmit() {
  // refs for inputs
  const usernameRef = useRef(null);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);

  // one ref for gender group (we’ll read checked radio)
  const genderRef = useRef([]); // store radio inputs by index

  // array ref for hobbies checkboxes (per hint)
  const hobbyRef = useRef([]); // store checkbox inputs by index

  // role select ref
  const roleRef = useRef(null);

  // view state + submitted snapshot (for rendering)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState({
    username: "",
    firstname: "",
    lastname: "",
    gender: "",
    hobbies: [],
    role: "",
  });

  function getSelectedGender() {
    const checkedRadio = genderRef.current.find((el) => el && el.checked);
    return checkedRadio ? checkedRadio.value : "";
  }

  function getSelectedHobbies() {
    return hobbyRef.current
      .filter((el) => el && el.checked)
      .map((el) => el.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const data = {
      username: usernameRef.current?.value ?? "",
      firstname: firstnameRef.current?.value ?? "",
      lastname: lastnameRef.current?.value ?? "",
      gender: getSelectedGender(),
      hobbies: getSelectedHobbies(),
      role: roleRef.current?.value ?? "",
    };

    setSubmitted(data);
    setIsSubmitted(true);
  }

  function onBackToForm() {
    setIsSubmitted(false);
  }

  if (isSubmitted) {
    return (
      <div className="page">
        <h2 className="title">Submit Data</h2>

        <div className="result">
          <p>
            <b>Username:</b> <span className="value">{submitted.username}</span>
          </p>
          <p>
            <b>Firstname:</b> <span className="value">{submitted.firstname}</span>
          </p>
          <p>
            <b>Lastname:</b> <span className="value">{submitted.lastname}</span>
          </p>
          <p>
            <b>Gender:</b> <span className="value">{submitted.gender}</span>
          </p>
          <p>
            <b>Hoobies:</b>{" "}
            <span className="value">
              {submitted.hobbies.length ? submitted.hobbies.join(", ") : ""}
            </span>
          </p>
          <p>
            <b>Role:</b> <span className="value">{submitted.role}</span>
          </p>
        </div>

        <button className="btn" onClick={onBackToForm} type="button">
          Back to form
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <form onSubmit={onSubmit} className="form">
        <div className="group">
          <label className="label">Username</label>
          <input className="input" type="text" ref={usernameRef} />
        </div>

        <div className="group">
          <label className="label">Firstname</label>
          <input className="input" type="text" ref={firstnameRef} />
        </div>

        <div className="group">
          <label className="label">Lastname</label>
          <input className="input" type="text" ref={lastnameRef} />
        </div>

        <div className="group">
          <div className="label">Gender</div>
          <div className="row">
            {GENDER_OPTIONS.map((item, index) => (
              <label key={item.value} className="option">
                <input
                  type="radio"
                  name="gender"
                  value={item.value}
                  defaultChecked={item.value === "male"}
                  ref={(el) => (genderRef.current[index] = el)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div className="group">
          <div className="label">Hobbies</div>
          <div className="col">
            {HOBBY_OPTIONS.map((item, index) => (
              <label key={item.value} className="option">
                <input
                  type="checkbox"
                  name="hobbies"
                  value={item.value}
                  ref={(el) => (hobbyRef.current[index] = el)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div className="group">
          <label className="label">Role</label>
          <select className="select" ref={roleRef} defaultValue="general staff">
            {ROLE_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}