import React, { useState, useEffect } from "react";
import axios from "axios";

function App({ serialNumber, userID, newplotId }) {
  const [imageArray, setImageArray] = useState([]);
  const [imagepic, setImagepic] = useState([0]);

  useEffect(() => {
    // https://iotr2zasp6.execute-api.us-east-1.amazonaws.com/default/FetchPlotDetails/plotdetails

    const imagepic = [];
    const imageFetch = [];
    const imageDetails = [];
    const imageResponse = [];
    const imagenewFilename = [];
    async function fetchImages() {
      // const serialNumber = props.serialNumber;
      // const useridDetails = props.userID
      // console.log(userID,serialNumber,'aaaaaaaaaa')
      try {
        // const API = "https://zgiphmcemb.execute-api.us-east-1.amazonaws.com/default/RetrieveSOP/sop"
        const API =
          " https://zgiphmcemb.execute-api.us-east-1.amazonaws.com/default/RetrieveSOP/sop";
     const response = await axios.post(API, {
          userId: "5b83ed90-1859-4201-b788-f98934aef073",
          cropType: "Grape",
          PlotId: "b0765d8e-c781-4916-bc45-96fe7b490ed0",
        });
        const sopTableData = response.data.body;
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      console.log(newplotId, 'newplotId')
      try {
        let API =
          "https://78tevr0rt2.execute-api.us-east-1.amazonaws.com/default/GetImagesUploaded";
        const response = await axios.post(API, {
          // plotId: "03808f1e-fccf-4423-b027-3df638c2636b",
          // PlotId: "05d04703-06d6-43ba-84dc-55f5f50278b9","0fd53d9a-3894-42f8-8bc8-6fead2790226"
          plotId:newplotId
        });
        const newResponse = response.data.imagesList;
        console.log(newResponse, "newResponse");

        newResponse?.forEach((element) => {
          imagenewFilename.push(element.FileName);
        });

        //    console.log(imagenewFilename,'imagenewFilename')
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      try {
        let API =
          "https://pw673tce66.execute-api.us-east-1.amazonaws.com/default/getPresignedUrlDownload";

          const imagePromises = imagenewFilename.map(async (fileName) => {
            try {
              const response = await axios.post(API, {
                serialNumber: serialNumber,
                fileName: fileName,
              });
              const imageResponseone = response.data.body.downloadURL;
              imageResponse.push(imageResponseone);
            } catch (error) {
              console.error("Error fetching image:", error);
            }
          });
          
        const imageUrls = await Promise.all(imagePromises);
        setImageArray(imageResponse);
        console.log(imagePromises, "img");
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, [serialNumber, userID, newplotId]);

  return (
    <div>
      {imageArray.length > 0 ? (
        <div className="image-container">
          {imageArray.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={index}
              height={160}
              width={200}
            />
          ))}
        </div>
      ) : (
        "Loading images..."
      )}
    </div>
  );
}

export default App;