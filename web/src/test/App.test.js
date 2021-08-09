import "@testing-library/react/dont-cleanup-after-each";
import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';
import Db from './data-handler';

beforeAll(()=>{
  render(<App />);
})  
afterAll(()=>{
  cleanup();
},30000)

describe("Check core element", ()=>{
    it('Render list table', () => {
      const tableList = screen.getByTestId("list-table");
      expect(tableList).toBeInTheDocument();
    });
    it('Render add form', () => {
      const addForm = screen.getByTestId("add-form");
      expect(addForm).toBeInTheDocument();
    });
    it('Render upload form', () => {
      const uploadForm = screen.getByTestId("upload-form");
      expect(uploadForm).toBeInTheDocument();
    })
});

describe("Check data handler function", ()=> {
  let _id = '';
  const dataDummy = 
    {
        name: "Altitude Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        file: "/fakePath/dummy.png",
        status: "healthy",
        availability: "on"
    };

    it("Insert data", async ()=>{
      let response = await Db({
        func: "TEST ADD",
        body: dataDummy
      })
      expect(response.data.acknowledged).toBeTruthy();
      _id = response.data.insertedId;
    })

    
    it('Get data', async () => {
      let response = await Db({
        func:"GET"
      })
      expect(response).toBeDefined();
    })

    it("Delete data", async ()=>{
      let response = await Db({
        func: "DELETE",
        _id: [_id],
      })
      expect(response.data).toBeTruthy();
      expect(response.status).toBe(200);
    })
})


