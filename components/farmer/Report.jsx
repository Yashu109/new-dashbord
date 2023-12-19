import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdFileDownload } from "react-icons/md";
import './Report.css'
function Report({reportPlotid}) {
  const [imageUrl, setImageUrl] = useState([]);
  const [reports, setReports] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  let ForwardPruning = queryParams.get("ForwardPruning");
  // let plotId = queryParams.get("PlotId");
  let plotId = reportPlotid;
  console.log(plotId,'mmmm')
  console.log(ForwardPruning, plotId);
  let downloadApi =
    "https://pw673tce66.execute-api.us-east-1.amazonaws.com/default/getPresignedUrlDownload/download";

  const DownloadFile = async (element) => {
    console.log(element);
    let splitElement = element.split("/");

    let response = await axios.post(downloadApi, {
      plotId: plotId,
      type: splitElement[1],
      fileName: splitElement[2],
    });
    console.log(response.data.body.downloadURL, "download url");

    try {
      const downloadResponse = await fetch(response.data.body.downloadURL);
      console.log(downloadResponse);
      const blob = await downloadResponse.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", splitElement[2]); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    let fileNameArray,
      filterPlots,
      imageUrlArray = [],
      preSignedUrl = [];
    try {
      let api =
        "https://fnslhm827b.execute-api.us-east-1.amazonaws.com/default/PublicPlotdetails";
      let api1 =
        "https://iotr2zasp6.execute-api.us-east-1.amazonaws.com/default/FetchPlotDetails/plotdetails";

      let data = { plotId: plotId };
      let response = await axios.post(api, data);
      let imagesList = response.data.imagesList;
      fileNameArray = imagesList.map((name) => name.FileName);
      console.log(response.data.reports, "reports");

      const data1 = { userId: imagesList[0].PK };
      let response1 = await axios.post(api1, data1);
      let plotdetails = response1.data.body;
      filterPlots = plotdetails.filter((plot) => plot.PlotId == plotId);

      for (let i = 0; i < fileNameArray.length; i++) {
        const response = await axios.post(downloadApi, {
          serialNumber: filterPlots[0].SerialNumber,
          fileName: fileNameArray[i],
        });
        preSignedUrl.push(response.data.body.downloadURL);
      }
      console.log(preSignedUrl);
      for (let i = 0; i < preSignedUrl.length; i++) {
        let fetchresponse = await fetch(preSignedUrl[i]);
        imageUrlArray.push(fetchresponse.url);
      }
      console.log(imageUrlArray, "urls");
      setImageUrl(imageUrlArray);
      setReports(response.data.reports);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="report">
      {/* {imageUrl &&
        imageUrl.map((value, index) => {
          return <img src={value} height={100} width={100} key={index} alt="Loading image"/>;
        })} */}
      {reports &&
        reports.map((element, index) => {
          let split = element.split("/");
          return (
            <div>
              <li key={index}>
                {split[2]}
                <MdFileDownload onClick={() => DownloadFile(element)} />
              </li>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
export default Report;
