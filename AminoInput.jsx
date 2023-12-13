import { useState } from "react"
import axios from "axios";
import AminoInputStyles from "../Styles/AminoInputStyles.scss";

export default function AminoInput(){
    const [result, setResult] = useState();
    const [catena, setCatena] = useState();
    const [eroare, setEroare] = useState();

    const handleChange = (e) => {
        setCatena(e.target.value)
    }

    const handleClickSolve = (e) => {
        e.preventDefault()
        const jsBody = {
            "catena": catena
        }
        setCatena(catena.toUpperCase())
        if(catena.length > 0 && catena.length % 3 == 0 && /^[ACGT]*$/.test(catena)){
            fetch("http://localhost:3001/api/solve/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"    
                },
                body: JSON.stringify(jsBody)
            })
                .then(r => r.json())
                .then(d => setResult(d))
                .catch((err) => console.log(err))
        } else {
            setEroare("Ceva este scris gresit")
        }
    }

    const handleClickRepl = (e) => {
        e.preventDefault()
        const jsBody = {
            "catena": catena
        }
        setCatena(catena.toUpperCase())

        if(catena.length > 0 && /^[ACGT]*$/.test(catena)){
            fetch("http://localhost:3001/api/solve/repl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"    
                },
                body: JSON.stringify(jsBody)
            })
                .then(r => r.json())
                .then(d => setResult(d))
                .catch((err) => console.log(err))
        } else {
            setEroare("Ceva este gresit")
        }
    }

    const handleClickTrans = (e) => {
        e.preventDefault()
        const jsBody = {
            "catena": catena
        }
        setCatena(catena.toUpperCase())

        if(catena.length > 0 && /^[ACGT]*$/.test(catena)){
            fetch("http://localhost:3001/api/solve/trans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"    
                },
                body: JSON.stringify(jsBody)
            })
                .then(r => r.json())
                .then(d => setResult(d))
                .catch((err) => console.log(err))
        } else {
            setEroare("Ceva este gresit")
        }
    }
    const handleClickTransl = (e) => {
        e.preventDefault()
        const jsBody = {
            "catena": catena
        }
        setCatena(catena.toUpperCase())
        if(catena.length > 0 && catena.length % 3 == 0 && /^[ACGU]*$/.test(catena)){
            fetch("http://localhost:3001/api/solve/decode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"    
                },
                body: JSON.stringify(jsBody)
            })
                .then(r => r.json())
                .then(d => setResult(d))
                .catch((err) => console.log(err))
        } else {
            setEroare("Ceva este gresit")
        }
    }


    return(
        <div id="AminoInput">
            <form action="">
                <label htmlFor="catena">Catena </label>
                <input type="text" id="catena" onChange={(e) => handleChange(e)} placeholder="ACGUT...."/>
                <button onClick={(e) => handleClickSolve(e)}>Solutie completa</button>
                <button onClick={(e) => handleClickRepl(e)}>Replicare</button>
                <button onClick={(e) => handleClickTrans(e)}>Transcriptia</button>
                <button onClick={(e) => handleClickTransl(e)}>Translatia</button>
            </form>
            <div id="data">
                {result?.original ? <span>Original: {result?.original} </span> : <span />}
                {result?.replicarea_antiCodogena ? <span>Anti Codogena: {result?.replicarea_antiCodogena} </span> : <span />}
                {result?.transcriptia_ARNm ? <span>ARNm: {result?.transcriptia_ARNm} </span> : <span />}
                {result?.decodificarea ? <span>Proteinele: {result?.decodificarea} </span> : <span />}
                {eroare? <span id="Eroare">Eroare: {eroare} </span>: <span />}
            </div>
        </div>
    )
}