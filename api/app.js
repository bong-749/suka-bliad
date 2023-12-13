const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(express.json())
// app.use(bodyParser)


const PORT = 3001

const aminoDecoder = {
    'UUU': 'Fenilalanină',
    'UUC': 'Fenilalanină',
    'UUA': 'Leucină',
    'UUG': 'Leucină',
    'UCU': 'Serină',
    'UCC': 'Serină',
    'UCA': 'Serină',
    'UCG': 'Serină',
    'UAU': 'Tirozină',
    'UAC': 'Tirozină',
    'UAA': 'Oprire',
    'UAG': 'Oprire',
    'UGU': 'Cisteină',
    'UGC': 'Cisteină',
    'UGA': 'Oprire',
    'UGG': 'Triptofan',
    'CUU': 'Leucină',
    'CUC': 'Leucină',
    'CUA': 'Leucină',
    'CUG': 'Leucină',
    'CCU': 'Prolină',
    'CCC': 'Prolină',
    'CCA': 'Prolină',
    'CCG': 'Prolină',
    'CAU': 'Histidină',
    'CAC': 'Histidină',
    'CAA': 'Glutamină',
    'CAG': 'Glutamină',
    'CGU': 'Arginină',
    'CGC': 'Arginină',
    'CGA': 'Arginină',
    'CGG': 'Arginină',
    'AUU': 'Izoleucină',
    'AUC': 'Izoleucină',
    'AUA': 'Izoleucină',
    'AUG': 'Metionină',
    'ACU': 'Treonină',
    'ACC': 'Treonină',
    'ACA': 'Treonină',
    'ACG': 'Treonină',
    'AAU': 'Asparagină',
    'AAC': 'Asparagină',
    'AAA': 'Lizină',
    'AAG': 'Lizină',
    'AGU': 'Serină',
    'AGC': 'Serină',
    'AGA': 'Arginină',
    'AGG': 'Arginină',
    'GUU': 'Valină',
    'GUC': 'Valină',
    'GUA': 'Valină',
    'GUG': 'Valină',
    'GCU': 'Alanină',
    'GCC': 'Alanină',
    'GCA': 'Alanină',
    'GCG': 'Alanină',
    'GAU': 'Acid aspartic',
    'GAC': 'Acid aspartic',
    'GAA': 'Acid glutamic',
    'GAG': 'Acid glutamic',
    'GGU': 'Glicină',
    'GGC': 'Glicină',
    'GGA': 'Glicină',
    'GGG': 'Glicină'
};

const transcriptia = (catena_anticodogena) => {
    let catena_trans = "";
    for (let i = 0; i < catena_anticodogena.length; i++) {
        if (catena_anticodogena[i] === "T") catena_trans += "U";
        else catena_trans += catena_anticodogena[i];
    }
    return catena_trans;
}

const replicarea = (catena_codogena) => {
    let catena_anti_codogena = "";
    for (let i = 0; i < catena_codogena.length; i++) {
        if (catena_codogena[i] === "A") catena_anti_codogena += "T";
        if (catena_codogena[i] === "T") catena_anti_codogena += "A";
        if (catena_codogena[i] === "C") catena_anti_codogena += "G";
        if (catena_codogena[i] === "G") catena_anti_codogena += "C"; 
    }
    return catena_anti_codogena;
}

const decodificarea = (code) => {
    if(code.length > 0 && code.length % 3 == 0 && /^[ACGU]*$/.test(code)) {
        let decodedAminoAcids = '';
        for(let i = 0; i < code.length; i+=3) {
            let codon = code.substring(i, i+3);
            decodedAminoAcids += aminoDecoder[codon] + ' ';
        }
        return decodedAminoAcids.trim()
    } else {
        return 0;
    }
}




app.post('/api/solve/', (req, res) => {
    const catena = req.body.catena;
    return res.status(200).json({
        original: catena,
        replicarea_antiCodogena: replicarea(catena),
        transcriptia_ARNm: transcriptia(replicarea(catena)),
        decodificarea: decodificarea(transcriptia(replicarea(catena)))
    }).end();
})
app.post('/api/solve/repl', (req, res) => {
    const catena = req.body.catena;
    return res.status(200).json({
        original: catena,
        replicarea_antiCodogena: replicarea(catena)
    }).end();
});
app.post('/api/solve/trans', (req, res) => {
    const catena = req.body.catena;
    return res.status(200).json({
        original: catena,
        transcriptia_ARNm: transcriptia(catena)
    }).end();
});
app.post('/api/solve/decode', (req, res) => {
    const catena = req.body.catena;
    return res.status(200).json({
        original: catena,
        decodificarea: decodificarea(catena)
    }).end();
});

app.listen(PORT, () => {
    console.log('Serveru so pornit .')
})

