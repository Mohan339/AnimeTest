import React, {useEffect, useState} from "react"
import Picture from "./Picture"
import {useDrop} from "react-dnd"
import "../App.css"
import axios from "axios"
import {
  Button,
  Col,
  Container,
  Dropdown,
  FormControl,
  Row,
} from "react-bootstrap"
import {AiOutlineSearch} from "react-icons/ai"

function AnimeContainer() {
  let subtitle

  const [PictureList, setPictureList] = useState()
  const [filterVal, setFilterval] = useState({search: ""})
  const [fGener, setFGenere] = useState({name: ""})

  const [board, setBoard] = useState([])
  const [StatBoard, setStatBoard] = useState([])

  const [lValue, setLValue] = useState([])
  const val = []

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/anime").then(res => {
  
      setPictureList(res.data.data)
    })
  }, [])

  const [{isOver}, drop] = useDrop(() => ({
    accept: "image",
    drop: item => addImageToBoard(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const addImageToBoard = id => {
    axios.get("https://api.jikan.moe/v4/anime").then(res => {
      setPictureList(res.data.data)

      const pictureList = res.data.data.filter(picture => {
        return id === picture.mal_id
      })
      setBoard(board => [...board, pictureList[0]])
      setLValue(pre => [...pre, pictureList[0]])
    })
  }

  useEffect(() => {
    if (lValue.length >= 1) {
      localStorage.setItem("boardList", JSON.stringify(lValue))
    }
    const users = JSON.parse(localStorage.getItem("boardList") || "[]")
    setStatBoard(users)
  }, [board])

  const handleSearch = () => {
    const filteredValue = PictureList.filter(i => {
      return filterVal.search.toLowerCase() === i.title.toLowerCase()
    })
    if (filterVal.search !== "") {
      setPictureList(filteredValue)
    } else {
      axios.get("https://api.jikan.moe/v4/anime").then(res => {
        setPictureList(res.data.data)
      })
    }
  }
  const handleFilter = () => {
    const filteredValue = PictureList.filter(({genres}) =>
      genres.some(({name}) => name.includes(fGener.name))
    )
    if (fGener.name !== "") {
      setPictureList(filteredValue)
    } else {
      axios.get("https://api.jikan.moe/v4/anime").then(res => {
        setPictureList(res.data.data)
      })
    }
  }

  const option = [
    {
      label: "Action",
      value: "Action",
    },
    {
      label: "Adventure",
      value: "Adventure",
    },
    {
      label: "Sci-Fi",
      value: "Sci-Fi",
    },
    {
      label: "Mystery",
      value: "Mystery",
    },
  ]
  return (
    <>
      <Container className="Pictures" fluid="md">
        <Row style={{justifyContent: "space-between"}}>
          <div style={{display: "flex"}}>
            <div
              style={{
                border: "solid 2px gold",
                backgroundColor: "transparent",
                outline: "none",
                borderRadius: "5px",
                marginLeft: "20px",
                marginBottom: "20px",
              }}
            >
              <AiOutlineSearch style={{color: "gold", marginRight: "5px"}} />
              <input
                type={"search"}
                style={{
                  outline: "none",
                  border: "none",
                  backgroundColor: "transparent",
                  height: "43px",
                  width: "80%",
                  color: "white",
                }}
                placeholder="Search ... "
                name="search"
                onChange={e => {
                  const name = e.target.name
                  const value = e.target.value
                  setFilterval({...filterVal, search: value})
                }}
              />
            </div>
            <Button
              variant="outline-warning"
              style={{outline: "none", marginLeft: "20px", height: "45px"}}
              onClick={() => handleSearch()}
            >
              Search
            </Button>{" "}
          </div>
          <div style={{display: "flex"}}>
            <select
              onChange={e => {
                setFGenere({...fGener, name: e.target.value})
              }}
              style={{
                height: "45px",
                outline: "none",
                marginLeft: "20px",
                backgroundColor: "transparent",
                color: "gold",
                border: "gold",
              }}
            >
              {option.map(i => {
                return (
                  <option
                    label={i.label}
                    value={i.value}
                    style={{color: "black"}}
                  ></option>
                )
              })}
            </select>
            <Button
              variant="outline-warning"
              style={{
                outline: "none",
                marginLeft: "20px",
                height: "45px",
                paddingTop: "10px",
              }}
              onClick={() => handleFilter()}
            >
              Filter
            </Button>{" "}
            <Button
              href="#"
              variant="outline-warning"
              style={{
                outline: "none",
                marginLeft: "20px",
                height: "45px",
              }}
              onClick={() => {
                window.location.reload(false)
                localStorage.removeItem("boardList")
              }}
            >
              X
            </Button>
          </div>
        </Row>

        <Row>
          {PictureList &&
            PictureList.map(picture => {
              return (
                <>
                  <Picture
                    url={picture.images.jpg.image_url}
                    id={picture.mal_id}
                    title={picture.title}
                    rating={picture.rating}
                    synopsis={picture.synopsis}
                  />
                </>
              )
            })}
        </Row>
      </Container>
      <div className="Board" ref={drop}>
        <Button
          href="#"
          variant="outline-warning"
          style={{
            outline: "none",
            marginLeft: "20px",
            height: "45px",
            marginTop: "20px",
            marginLeft: "85%",
          }}
          onClick={() => {
            window.location.reload(false)
            localStorage.removeItem("boardList")
          }}
        >
          Clear Watch List
        </Button>
        <h1 style={{color: "white", textAlign: "left"}}>
          Create Your Watch List . . .
        </h1>
        {StatBoard &&
          StatBoard.map(picture => {
            return (
              <>
                <Picture
                  url={picture.images.jpg.image_url}
                  id={picture.mal_id}
                  title={picture.title}
                  rating={picture.rating}
                />
              </>
            )
          })}
      </div>
    </>
  )
}

export default AnimeContainer
