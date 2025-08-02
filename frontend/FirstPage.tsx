import React, { useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function FirstPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        checkConnection()
    }, []);

    async function checkConnection() {
        const isConnected = await window.aptos.isConnected();
        console.log("Is connected:", isConnected);
        if (!isConnected) {
            alert("you are not connected to the wallet, redirecting to main page");
            console.log("Not connected, redirecting to home page.");
            navigate("/");
        } else {
            var add = await window.aptos.account();
            console.log("Account address:", add?.address);
        }
    }

    var navigate = useNavigate();

    async function Disconnfun() {
        window.aptos.disconnect();
        navigate("/");
    }
    function submitform(){
        console.log("Name:", name);
        console.log("Email:", email);
    }



    return (
        <div>
           <form>
                <input type="text" placeholder="Enter your name" required onChange={e => setName(e.target.value)} /><br /><br />
                <input type="email" placeholder="Enter your email" required onChange={e => setEmail(e.target.value)}/><br /><br />
                <input type="password" placeholder="Enter your password" required onChange={e => setPassword(e.target.value)} /><br /><br />
                <button type="submit" onClick={submitform}>Submit</button><br /><br />
            </form>
            <button onClick={Disconnfun}>Disconnect</button>
        </div>
    )
}