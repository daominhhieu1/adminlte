const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const Report = require('../../models/Report');
const multer = require('multer');
const path = require('path');
const PROJECT_DIR = process.cwd();
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const { randomUUID } = require('crypto');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = path.join(PROJECT_DIR, 'uploads');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage })
router.post('/report-data', upload.single('file'), async(req, res) => {
    console.log(req.file?.filename);
    console.log(upload);
    let filePath = path.join(PROJECT_DIR, 'uploads', req.file?.filename);
    let data = [];
    const workbook1 = new ExcelJS.Workbook();
    workbook1.xlsx.readFile(filePath)
    .then(function(e) {
        workbook1.eachSheet(function(val,ind){
            ws = workbook1.getWorksheet(ind);
            ws.eachRow(function(dataRows,indexRow){
                if(dataRows.getCell(2).value!=null){
                    var newItem = new Report({
                        name : dataRows.getCell(2).value,
                        email : dataRows.getCell(2).value+"@gmail.com",
                        numberPhone: randomUUID()
                    });
                    data.push(newItem);
                }
               
            });
        });
        await Report.insertMany(data).then(function(){

            console.log("Data inserted")
        });
    });
    await Report.find({}).then(r => {
        if (r) {
            return res.status(200).send(r);
        }
    });
});
router.post('/data', async(req, res) => {
   await Report.find({}).then(r => {
        if (r) {
            return res.status(200).send(r);
        }
    });
});
module.exports = router;