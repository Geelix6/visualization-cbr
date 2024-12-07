import express from "express";
import { parseStringPromise } from "xml2js";
import { formatDate } from "./utils/formatDate";

async function main() {
  const app = express();

  app.use(express.json());

  app.get("/api/v1/daily", async (req, res) => {
    const date = formatDate(new Date().toISOString());
    const responseData = await fetch(`https://cbr.ru/scripts/XML_daily.asp?date_req=${date}`);
    const xmlText = await responseData.text();
    const data = await parseStringPromise(xmlText);
    res.status(200).json(data);
  });

  app.post("/api/v1/currency", async (req, res) => {
    const start = formatDate(req.body.start);
    const end = formatDate(req.body.end);
    const code = req.body.code;
    const responseData = await fetch(
      `http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${start}&date_req2=${end}&VAL_NM_RQ=${code}`
    );
    const xmlText = await responseData.text();
    const data = await parseStringPromise(xmlText);
    res.status(200).json(data);
  });

  app.get("/api/v1/rate", async (req, res) => {
    const headers = {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://web.cbr.ru/KeyRateXML",
    };
    const body = `<?xml version="1.0" encoding="utf-8"?> 
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> 
        <soap:Body> 
            <KeyRateXML xmlns="http://web.cbr.ru/"> 
                <fromDate>2013-09-17</fromDate> 
                <ToDate>${new Date().toISOString().split("T")[0]}</ToDate> 
            </KeyRateXML> 
        </soap:Body> 
    </soap:Envelope> 
    `;
    const responseData = await fetch("http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx", {
      method: "POST",
      body,
      headers,
    });
    const xmlText = await responseData.text();
    let data = await parseStringPromise(xmlText);
    data = data["soap:Envelope"]["soap:Body"][0]["KeyRateXMLResponse"][0]["KeyRateXMLResult"][0]["KeyRate"][0]["KR"];
    res.status(200).json(data);
  });

  const port = 5000;
  app.listen(5000, () => console.log(`Server started on port ${port}`));
}

main();
