import { useNavigate } from "react-router-dom"
import { useState } from "react"


export const Register = (props) => {
    const [ user, setUser ] = useState({
        email: "",
        name: "",
        password: "",
        isInstructor: false
    })
    const navigate = useNavigate()

    const registerNewUser = () => {
        return fetch(`http://localhost:8088/users`,{
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)})
        .then(res => res.json())
        .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
            localStorage.setItem(
                "yoga_user",
                JSON.stringify({
                    id: createdUser.id,
                    instructor: createdUser.isInstructor,
                })
            )
            navigate("/")
        }
        })

    }

    const handleRegister = (e) => {
        e.preventDefault()
        
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then((res) => {
                if (res.length > 0) {
                    window.alert("Account with that email address already exists")
                } else {
                    registerNewUser()
                }
            })
    }


    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Register for Find Your Flow
        </h1>
        <fieldset>
          <label htmlFor="fullName"> Full Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <input
            onChange={(evt) => {
              const copy = { ...user };
              copy.isInstructor = evt.target.checked;
              setUser(copy);
            }}
            type="checkbox"
            id="isInstructor"
          />
          <label htmlFor="isInstructor"> I am a teacher </label>
        </fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
    )
}