import Axios from "axios";

export default async function DataHandler(opt) {
    if (opt.func === "GET") {
      const response = await Axios.get("http://localhost:4000/api/v1");
      const rows = response.data.map((currentVal, idx) => ({
        id: idx,
        ...currentVal,
      }));
      return rows;
    } else if (opt.func === "ADD") {
      const reader = new FileReader();
      reader.addEventListener("load", async (event) => {
        const newBody = { ...opt?.body };
        newBody.file = event.target.result;
        const response = await Axios.post(
          "http://localhost:4000/api/v1/inventory",
          newBody
        );
        return response;
      });
      reader.readAsBinaryString(opt.body.file);
    } else if (opt.func === "PUT") {
        async function CallUpdate() {
          return await Axios.put(
            `http://localhost:4000/api/v1/inventory/?_id=${opt?._id}`,
            opt?.body
          );
        }
        if (opt?.body?.file) {
          const reader = new FileReader();
          reader.readAsBinaryString(opt?.body?.file);
          return reader.addEventListener("load", async (event) => {
            opt.body.file = event.target.result;
            return CallUpdate();
          });
        } else {
          return CallUpdate();
        }
    } else if (opt.func === "DELETE") {
      if (opt._id.length !== 0) {
        const QueryParams = opt._id
          .map((val) => {
            return `_id=${val}&`;
          })
          .join("");

        const response = await Axios.delete(
          `http://localhost:4000/api/v1/inventory/?${QueryParams}`
        );
        return response;
      }
    } else if (opt.func === "TEST ADD") {
          const response = await Axios.post(
            "http://localhost:4000/api/v1/inventory",
            opt?.body
          );
          return response;
      }
  }