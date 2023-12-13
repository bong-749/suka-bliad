const express = require("express")
const cors = require("cors")

app = express()
app.use(cors())
app.use(express.json())

app.post('/legea2', (req, res) => {
    const { male } = req.body;
    const { female } = req.body;
    return res.status(200).json({
        children: legea2(male, female) 
    }).end()
})

app.post('/legea3', (req, res) => {
    const { male } = req.body;
    const { female } = req.body;



    return res.status(200).json({
        children: legea3(male, female) 
    }).end()
})

app.listen(3001, ()=> {
    console.log("Started")
})

const legea2 = (patan, padruga) => {
    let tabel = [];
    let result="";

    for(let i =1; i<=2; i++){
        for(let j=1; j<=2; j++){
            result = ""
            result = patan["gena"+i]+padruga["gena"+j]
            tabel.push(result)
        }
    }

    for(let i=0; i<tabel.length; i++){
        let modifiedString = tabel[i].split(''); // Convert the string to an array
        if(modifiedString[0] !== modifiedString[0].toUpperCase() && modifiedString[1] === modifiedString[1].toUpperCase()){
            modifiedString[0] = modifiedString[0].toUpperCase();
            modifiedString[1] = modifiedString[1].toLowerCase();
        } else if(modifiedString[0] === "_" && modifiedString[1] === modifiedString[1].toUpperCase()){
            modifiedString[0] = modifiedString[1]
            modifiedString[1] = "_"
        }
        tabel[i] = modifiedString.join(''); // Join the array back to a string
    }

    return tabel;
}



const legea3 = (patan, padruga) => {
    let maleGametes = [patan["caracter1"]["gena1"] + patan["caracter2"]["gena1"], patan["caracter1"]["gena2"] + patan["caracter2"]["gena2"]];
    let femaleGametes = [padruga["caracter1"]["gena1"] + padruga["caracter2"]["gena1"], padruga["caracter1"]["gena2"] + padruga["caracter2"]["gena2"]];

    let tabel = [];

    for (let i = 0; i < maleGametes.length; i++) {
        for (let j = 0; j < femaleGametes.length; j++) {
            tabel.push(maleGametes[i][0] + femaleGametes[j][0] + maleGametes[i][1] + femaleGametes[j][1]);
        }
    }

    for (let i = 0; i < tabel.length; i++) {
        let modifiedString = tabel[i].split(''); // Convert the string to an array
        for (let j = 0; j < modifiedString.length - 1; j += 2) {
            if (modifiedString[j] !== modifiedString[j].toUpperCase() && modifiedString[j + 1] === modifiedString[j + 1].toUpperCase()) {
                modifiedString[j] = modifiedString[j].toUpperCase();
                modifiedString[j + 1] = modifiedString[j + 1].toLowerCase();
            } else if(modifiedString[j] === "_" && modifiedString[j+1] === modifiedString[j+1].toUpperCase()){
                modifiedString[j] = modifiedString[j+1]
                modifiedString[j+1] = "_"
            }
        }
        tabel[i] = modifiedString.join(''); // Join the array back to a string
    }

    return tabel;
};
