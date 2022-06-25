import { useState } from "react"

export default function createPolygon({ create, tabs, update }) {
  let current = tabs.filter((tab) => {return tab.current})
  let currentTab = current[0].name
  const [polygon, setPolygon] = useState(currentTab)
  

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const shape = e.target.form[0].value
    const size1 = e.target.form[1].value
    const size2 = e.target.form[2].value
    create(shape, size1, size2)
    
    
  }

  return (
    <div className="bg-white shadow sm:rounded-lg flex justify-center ">
      <div className="px-4 py-5 sm:p-6 border-2 mb-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Create Polygon</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Please complete the below form to add the polygon to the database</p>
        </div>
        <form className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs space-y-4">
            <select onChange={(e) => {
              let updateTab = tabs.filter(tab => {
                return tab.name === e.target.value
              })              
              setPolygon(e.target.value)
              update(...updateTab)
            }}
              className="form-select block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
              {tabs.map((tab, index) => (
                <option key={index} value={tab.name}>{tab.name}</option>
              ))}
            </select>
            <div className="flex">
              <label className="sr-only">
                {polygon === "Rectangles" ? "Width" : "Height"}
              </label>
              <input
                name="size1"
                type="number"
                id="size1"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 sm:text-sm border-gray-300 rounded-md"
                placeholder={polygon === "Rectangles" ? "Width" : "Height"}
              />
              <label className="sr-only">
                {polygon === "Rectangles" ? "Length" : "Base"}
              </label>
              <input
                name="size2"
                id="size2"
                type="number"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 sm:text-sm border-gray-300 rounded-md"
                placeholder={polygon === "Rectangles" ? "Length" : "Base"}
              />
            </div>
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  )
}
