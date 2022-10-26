import { Container, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import LikeButton from "../components/LikeButton";
import { useAuth } from "../context/AuthContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CartButton from "../components/CartButton";

const CardData = (props) => {
  const { user } = useAuth();

  const { delBook } = props;

  return (
    <div>
      <Card
        sx={{
          maxWidth: 370,
          marginTop: "1em",
        }}
      >
        <CardHeader
          title={props.title}
          sx={{ backgroundColor: "black", color: "white" }}
        />
        {/* <Link to={`/bookdetails/${element.bookId}`}> */}
        <CardMedia
          component="img"
          height="300"
          image={props.image}
          alt="game image"
        />
        {/* </Link> */}
        <Container
          sx={{
            padding: "1em",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Container>
            <Typography variant="h5"> Writer:{props.writer}</Typography>
            {/* <Typography variant="h5">Name: {props.title}</Typography> */}
            <Typography variant="h5">PRICE:{props.price}$</Typography>
            {/* <Typography paragraph>{element.author}</Typography> */}
            <LikeButton bookId={props.bookId} />
          </Container>
          <CartButton bookId={props.bookId} />
        </Container>

        {user.uid === props.author && (
          <IconButton
            onClick={() => {
              delBook(props.bookId);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        )}
      </Card>
    </div>
  );
};

export default CardData;
