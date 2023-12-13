import { useEffect, useState } from "react"
import InputSectionStyle from "./InputSectionStyle.scss"
import femaleImg from "./assets/femenine.png"
import maleImg from "./assets/male-gender.png"

export const InputSection = () => {
    const [gen1, setGen1] = useState({
        char: "",
        dominant: "",
        recesiv: ""
    })
    const[tabelVisible,setTabelVisible] = useState(false)
    const [gen2, setGen2] = useState({
        char: "",
        dominant: "",
        recesiv: ""
    })
    const [result, setResult] = useState({})

    const [male, setMale] = useState("")
    const [female, setFemale] = useState("")

    useEffect(()=>{
        if(result["children"]){
            setTabelVisible(true)
        } else {
            setTabelVisible(false)
        }
    },[result])

    const getFenotip = () => {
        if(result["children"]){
            let phenotypeCounts = {};
            for(let i=0; i<result["children"].length; i++){
                let phenotype = '';
                if(result["children"][i][0] === result["children"][i][0].toUpperCase()){
                    phenotype += gen1["dominant"] + ' ';
                } else {
                    phenotype += gen1["recesiv"] + ' ';
                }
                if(result["children"][i][2] === result["children"][i][2].toUpperCase()){
                    phenotype += gen2["dominant"];
                } else {
                    phenotype += gen2["recesiv"];
                }
                phenotypeCounts[phenotype] = (phenotypeCounts[phenotype] || 0) + 1;
            }
            
            return <>
                {Object.entries(phenotypeCounts).map(([phenotype, count]) => (
                    <div key={phenotype}>
                        <span>{phenotype} - {(count*100)/result["children"].length}%</span>
                    </div>
                ))}
            </>
        }
    }

    const getGenotype = () => {
        if(result["children"]){
            let genotypeCounts = {};
            for(let i=0; i<result["children"].length; i++){
                let genotype = result["children"][i];
                genotypeCounts[genotype] = (genotypeCounts[genotype] || 0) + 1;
            }
            
            return <>
                {Object.entries(genotypeCounts).map(([genotype, count]) => (
                    <div key={genotype}>
                        <span>{genotype} - {(count*100)/result["children"].length}%</span>
                    </div>
                ))}
            </>
        }
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (female.length <= 2) {
            setGen1({
                ...gen1,
                char: male[0].toUpperCase()
            });
            setGen2({
                ...gen2,
                char: ""
            });


            fetch('http://localhost:3001/legea2', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    "male":{
                      "gena1":male[0],
                      "gena2":male[1]
                    },
                    "female":{
                      "gena1":female[0],
                      "gena2":female[1]
                    }
                  })
            })
            .then(res => res.json())
            .then(data => {
                setResult(data);
                console.log(data);
            })
        } else {

            setGen1({
                ...gen1,
                char: male[0].toUpperCase()
            });
            setGen2({
                ...gen2,
                char: male[2].toUpperCase()
            });

            fetch('http://localhost:3001/legea3', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    "male":{
                      "caracter1":{
                            "gena1": male[0],
                            "gena2": male[1]
                      },
                      "caracter2":{
                            "gena1": male[2],
                            "gena2": male[3]
                      }
                    },
                    "female":{
                        "caracter1":{
                              "gena1": female[0],
                              "gena2": female[1]
                        },
                        "caracter2":{
                              "gena1": female[2],
                              "gena2": female[3]
                        }
                      }
                  })
            })
            .then(res => res.json())
            .then(data => {
                setResult(data);
                console.log(data);
            })
        }
        
    }
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="">Gena 1</label>
                    <h1>{gen1["char"]}</h1>
                    <input type="text" name="" id="" onChange={e => setGen1({
                        ...gen1,
                        dominant: e.target.value
                    })} placeholder="dominant"/>
                    <input type="text" name="" id="" onChange={e => setGen1({
                        ...gen1,
                        recesiv: e.target.value
                    })} placeholder="recesiv"/>
                </div>

                <div>
                    <label htmlFor="">Gena 2</label>
                    <h1>{gen2["char"]}</h1>
                    <input type="text" name="" id="" onChange={e => setGen2({
                        ...gen2,
                        dominant: e.target.value
                    })} placeholder="dominant"/>
                    <input type="text" name="" id="" onChange={e => setGen2({
                        ...gen2,
                        recesiv: e.target.value
                    })} placeholder="recesiv"/>
                </div>

                

                <div>
                    <label htmlFor=""><img src={maleImg} alt="" /></label>
                    <input type="text" name="" id="" onChange={e => setMale(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor=""><img src={femaleImg} alt="" /></label>
                    <input type="text" name="" id="" onChange={e => setFemale(e.target.value)}/>
                </div>

                <button onClick={e => HandleSubmit(e)}>
                    Calculeaza
                </button>
            </form>
            <div id="Table" style={tabelVisible?{display:"grid"}:null}>
                    <div>Male\Female</div>
                    <div>{male[0] + male[2]}</div>
                    <div>{male[1] + male[3]}</div>
                    <div>{female[0]+female[2]}</div>
                    <div>{result["children"]?result["children"][0]:null}</div>
                    <div>{result["children"]?result["children"][1]:null}</div>
                    <div>{female[1] + female[3]}</div>
                    <div>{result["children"]?result["children"][2]:null}</div>
                    <div>{result["children"]?result["children"][3]:null}</div>
            </div>
            <div>
                <h1>Fenotip</h1>
                    {getFenotip()}
                <h1>Genotip</h1>
                    {getGenotype()}
            </div>
        </div>
    )
}