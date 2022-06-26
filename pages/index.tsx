import Head from "next/head";
import clientPromise from "../middleware/mongodb";
import Tabs from "../components/Tabs";
import { useState } from "react";
import Modal from "../components/Modal";
import CreatePolygon from "../components/CreatePolygon";
import Notification from "../components/Notification";

interface IRectangle {
  _id: string;
  width: string
  length: string
}
interface ITrangle {
  _id: string;
  Height: string
  base: string
}
interface IProps {
  isConnected: boolean;
  firstLoadRectangles: IRectangle[];
  firstLoadTriangles: ITrangle[];
}

export default function Home({ isConnected, firstLoadRectangles, firstLoadTriangles }: IProps) {
  const [rectangles, setRectangles] = useState(firstLoadRectangles);
  const [triangles, setTriangles] = useState(firstLoadTriangles);

  const tabData =  [
    { name: 'Rectangles', num: rectangles.length, current: true },
    { name: 'Triangles', num: triangles.length, current: false },
  ]

  const [tabs, setTabs] = useState(tabData)
  const [numOfTriangles , setNumOfTriangles ] = useState(firstLoadTriangles .length)
  const [numOfRectangles, setNumOfRectangles] = useState(firstLoadRectangles.length)
  const [currentTab, setCurrentTab] = useState('Rectangles')
  const [showNotification, setShowNotification] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openNotification, setOpenNotification] = useState({ type: '', message: '' })
  const [modalData, setModalData] = useState({
    id: "0",
    size1: "0",
    size2: "0",
    area: 0,
    type: 'Rectangle'
  })

  


  const updateTab = (tab: { name: string; current: boolean; }) => {
    
    setTabs(tabs.map((t) => (t.name === tab.name ? { ...t, current: true } : { ...t, current: false })));
    setCurrentTab(tab.name);

  }

  const getPolygon = () => {
    if (currentTab === 'Rectangles') {
      fetch('/api/rectangle',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(data => {
        
        setRectangles(data.result)
        setNumOfRectangles(data.result.length)
      }
      )
    } else {
      fetch('/api/triangle',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(data => {
        setTriangles(data.result)
        setNumOfTriangles(data.result.length)

      }
      )

    }
  }


  

  const createPolygon = (polygon: string, size1, size2) => {
    console.log(polygon);
    console.log(size1);
    console.log(size2);

    if (size1 === "" || size2 === "") {
      setOpenNotification({ type: 'error', message: 'Please enter both sizes' })
      setShowNotification(true)
    } else {
      if (polygon === 'Rectangles') {
        console.log('post');

        fetch('/api/rectangle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            size1: size1,
            size2: size2
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setOpenNotification({ type: 'success', message: 'Rectangle created' })
            setShowNotification(true)
            getPolygon()
          }).catch(err => {
            console.log(err);
            setOpenNotification({ type: 'error', message: 'Error creating rectangle' })
            setShowNotification(true)
          }
          )
      } else if (polygon === 'Triangles') {
        fetch('/api/triangle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            size1: size1,
            size2: size2
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setOpenNotification({ type: 'success', message: 'Triangle created' })
            setShowNotification(true)
            getPolygon()
          }).catch(err => {
            console.log(err);
            setOpenNotification({ type: 'error', message: 'Error creating triangle' })
            setShowNotification(true)
          }
          )
      }
    }

  }

  const deletePolygon = (polygon: string, id: string) => {
    console.log(polygon, 'delete');

    fetch(`/api/${polygon.toLocaleLowerCase()}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })


    }).then(res => res.json())
      .then(data => {
        console.log(data);
        setOpenNotification({ type: 'success', message: `${currentTab} deleted` })
        setShowNotification(true)
        setOpenModal(false)
        getPolygon()
      }
      ).catch(err => {
        console.log(err);
        setOpenNotification({ type: 'error', message: `Error deleting ${currentTab}` })
        setShowNotification(true)
      }
      )
  }

  const updatePolygon = (polygon: string, id: string, size1: string, size2: string) => {
    console.log(size1, size2, 'update');

    fetch(`/api/${polygon.toLocaleLowerCase()}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        size1: size1,
        size2: size2
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        setOpenNotification({ type: 'success', message: `${currentTab} updated` })
        setShowNotification(true)
        setOpenModal(false)
        getPolygon()
      }
      ).catch(err => {
        console.log(err);
        setOpenNotification({ type: 'error', message: `Error updating ${currentTab}` })
        setShowNotification(true)
      }
      )
  }
  const RenderData = () => {
    if (currentTab === 'Rectangles') {
      return (
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            <li key={'001'}>Width : Length : Area</li>
            {rectangles.map((rectangle, i) => {
              const area = parseInt(rectangle.width) * parseInt(rectangle.length)
              const rectangleModalData = {
                id: rectangle._id,
                size1: rectangle.width,
                size2: rectangle.length,
                area: area,
                type: 'Rectangle'
              }
              return (
                <>
                  <li key={i} onClick={() => { setOpenModal(true), setModalData(rectangleModalData) }} className="px-4 py-4 sm:px-6 flex space-x-4 hover:bg-gray-100 cursor-pointer  ">
                    <p>{rectangle.width}</p>
                    <p>{rectangle.length}</p>
                    <p>{area}</p>
                  </li>
                </>
              )
            })}
          </ul>
          <Modal open={openModal} setOpen={setOpenModal} data={modalData} deletePolygon={(v1, v2) => deletePolygon(v1, v2)} updatePolygon={(polygon, id, s1, s2) => updatePolygon(polygon, id, s1, s2)} />
        </div>)
    } else if (currentTab === 'Triangles') {
      return (
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            <li key={'002'}>Height : Base : Area</li>
            {triangles.map((triangle, i) => {

              const area = parseInt(triangle.Height) * parseInt(triangle.base) /2
              const triangleModalData = {
                id: triangle._id,
                size1: triangle.Height,
                size2: triangle.base,
                area: area,
                type: 'Triangle'
              }

              return (
                <li key={i} onClick={() => { setOpenModal(true), setModalData(triangleModalData) }} className="px-4 py-4 sm:px-6 flex space-x-4 hover:bg-gray-100 cursor-pointer ">
                  <p>{triangle.Height}</p>
                  <p>{triangle.base}</p>
                  <p>{area}</p>
                </li>
              )
            })}
          </ul>
          <Modal open={openModal} setOpen={setOpenModal} data={modalData} deletePolygon={(v1, v2) => deletePolygon(v1, v2)} updatePolygon={(polygon, id, s1, s2) => updatePolygon(polygon, id, s1, s2)} />

        </div>

      )
    } else {
      return (<div>Loading...</div>)
    }
  }

  return (
    <div className="">
      <Head>
        <title>Technical Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5 flex flex-col justify-center items-center">
        <Notification set={openNotification} show={showNotification} setShow={setShowNotification} />

        <CreatePolygon update={(e) => updateTab(e)}  tabs={tabs} create={(v, v1, v2) => createPolygon(v, v1, v2)} />
        <div className="flex flex-col w-1/2 ">
        <Tabs numOfTriangles={numOfTriangles} numOfRectangles={numOfRectangles} tabs={tabs} update={(e) => updateTab(e)} />
        
        <div className="w-full bg-white shadow overflow-hidden sm:rounded-md flex justify-center items-center pt-5">
        <RenderData />
        </div>
        </div>
      </main>
      <footer className="bottom-0 mx-5 flex flex-col items-center justify-center ">
          <h1>Technical Test</h1>
          <h2>By James Dimonaco</h2>
          <h3 className="cursor-pointer"><a href="https://github.com/JamesDimonaco">GitHub</a></h3>
      </footer>
    </div>
  );
}


export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("Weaver");
    let firstLoadRectangles = await db.collection("Rectangle").find({}).toArray();
    let firstLoadTriangles = await db.collection("Triangle").find({}).toArray();
    firstLoadTriangles = JSON.parse(JSON.stringify(firstLoadTriangles));
    firstLoadRectangles = JSON.parse(JSON.stringify(firstLoadRectangles));

    return {
      props: { isConnected: true, firstLoadRectangles, firstLoadTriangles },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
