import { useState } from "react";
import GeneticInputStyle from "../Styles/GeneticInputStyles.scss"
import Randomstring from "randomstring";

export default function GeneticInput(){
    
    
    // let genes = ["X","Y"]

    const [genes,setGenes] = useState(['X','Y'])    

    const addGene = () => {
        genes.push(Randomstring.generate({length:1,charset:"alphabetic",capitalization:"uppercase"}))
        console.log(genes)
    }

    const handleAction = (e) => {
        
        console.log(e.target)
    }

    return(
        <div id="GeneticInput">
            <form onSubmit={(e)=>handleAction(e)}>
                {genes.map((gene) => 
                    <div className="Genes" key={gene}>
                        <label htmlFor={"character"+gene}>Character for gene {gene}</label>
                        <input type="text" id={"characte"+gene} placeholder={"Character"+gene+"..."}/>
                        <label htmlFor={"dominant"+gene}>Dominant </label>
                        <input type="checkbox" id={"dominant"+gene}/>
                    </div>
                )}
                <button onClick={() => addGene()}> + </button>
                <button >Submit</button>
            </form>
        </div>
    )
}
