import React from "react"
import {Button, Card, Col, Row} from "react-bootstrap"
import {useDrag} from "react-dnd"
import Modal from "react-modal"

function Picture({id, url, title, rating, board, synopsis}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  }
  let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const [{isDragging}, drag] = useDrag(() => ({
    type: "image",
    item: {id: id},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00"
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Col md={4}>
        {/* <img
          ref={drag}
          src={url}
          width="150px"
          style={{border: isDragging ? "5px solid pink" : "0px"}}
        />
        <p style={{color: "white"}}>{title}</p>
        <p style={{color: "white"}}>{rating}</p> */}
        <Card bg="transparent" text="white" style={{minHeight: "250px"}}>
          <Card.Img
            ref={drag}
            variant="top"
            src={url}
            style={{
              width: "300px",
              height: "150px",
              objectFit: "cover",
              border: isDragging ? "5px solid pink" : "0px",
            }}
          />
          <Card.Body>
            <Card.Title style={{textAlign: "start"}}>
              {title}
              <Button
                variant="outline-warning"
                onClick={openModal}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "20px",
                  padding: "2px",
                  margin: "8px",
                  fontStyle: "italic",
                }}
              >
                i
              </Button>
            </Card.Title>
            <p style={{textAlign: "start"}}>{rating}</p>
          </Card.Body>
        </Card>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Button onClick={closeModal}>close</Button>
          <Card bg="transparent" text="dark" style={{minHeight: "250px"}}>
            <Card.Img
              variant="top"
              src={url}
              style={{
                width: "80%",
                height: "250px",
                objectFit: "cover",
                border: isDragging ? "5px solid pink" : "0px",
              }}
            />
            <Card.Body>
              <Card.Title style={{textAlign: "start"}}>{title}</Card.Title>
              <p>{synopsis}</p>
              <p style={{textAlign: "start"}}>{rating}</p>
            </Card.Body>
          </Card>
        </Modal>
      </Col>
    </>
  )
}

export default Picture
