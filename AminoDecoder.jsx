import { useEffect, useState } from "react"

export default function AminoDecoder(){
    
    const [code,setCode] = useState("");
    const [decoded, setDecoded] = useState("");
    const aminoAcidCodes = {
        'UUU': 'Phe',
        'UUC': 'Phe',
        'UUA': 'Leu',
        'UUG': 'Leu',
        'UCU': 'Ser',
        'UCC': 'Ser',
        'UCA': 'Ser',
        'UCG': 'Ser',
        'UAU': 'Tyr',
        'UAC': 'Tyr',
        'UAA': 'Stop',
        'UAG': 'Stop',
        'UGU': 'Cys',
        'UGC': 'Cys',
        'UGA': 'Stop',
        'UGG': 'Trp',
        'CUU': 'Leu',
        'CUC': 'Leu',
        'CUA': 'Leu',
        'CUG': 'Leu',
        'CCU': 'Pro',
        'CCC': 'Pro',
        'CCA': 'Pro',
        'CCG': 'Pro',
        'CAU': 'His',
        'CAC': 'His',
        'CAA': 'Gln',
        'CAG': 'Gln',
        'CGU': 'Arg',
        'CGC': 'Arg',
        'CGA': 'Arg',
        'CGG': 'Arg',
        'AUU': 'Ile',
        'AUC': 'Ile',
        'AUA': 'Ile',
        'AUG': 'Met',
        'ACU': 'Thr',
        'ACC': 'Thr',
        'ACA': 'Thr',
        'ACG': 'Thr',
        'AAU': 'Asn',
        'AAC': 'Asn',
        'AAA': 'Lys',
        'AAG': 'Lys',
        'AGU': 'Ser',
        'AGC': 'Ser',
        'AGA': 'Arg',
        'AGG': 'Arg',
        'GUU': 'Val',
        'GUC': 'Val',
        'GUA': 'Val',
        'GUG': 'Val',
        'GCU': 'Ala',
        'GCC': 'Ala',
        'GCA': 'Ala',
        'GCG': 'Ala',
        'GAU': 'Asp',
        'GAC': 'Asp',
        'GAA': 'Glu',
        'GAG': 'Glu',
        'GGU': 'Gly',
        'GGC': 'Gly',
        'GGA': 'Gly',
        'GGG': 'Gly'
    };

    const Decode = () => {
        if(code.length>0 && code.length%3 == 0 && /^[ACGU]*$/.test(code)){
            let decodedAminoAcids = '';
            for(let i = 0; i < code.length; i+=3){
                let codon = code.substring(i, i+3);
                decodedAminoAcids += aminoAcidCodes[codon] + ' ';
            }
            setDecoded(decodedAminoAcids.trim());
        } else {
            setDecoded("Error")
        }
    }

    useEffect(() => {
        Decode();
    },[code])

    

    const handleChange = (e) =>{
        setCode(e.target.value)
    }
    
    return (
        <div id="AminoDecoder">
            <input type="text"  onChange={(e) => handleChange(e)} placeholder="Aminoacid Code ..."/>
            <p>{decoded}</p>
        </div>
    )
}