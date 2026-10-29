import express from "express";
const router = express.Router();

function isGoodStringParam(param){
  return  typeof param === "string" && param.trim().length > 0;
}

function isGoodNumericParam(param){
  return  typeof param === "number" && Number.isFinite(param);
}

const games = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    publisher: "Nintendo",
    releaseYear: 2017,
    ageRating: "E10+",    
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Breath+of+the+Wild"
  },
  {
    id: 2,
    title: "God of War Ragnarök",
    publisher: "Sony Interactive Entertainment",
    releaseYear: 2022,
    ageRating: "M",
    price: 69.99,
    imageUrl: "https://placehold.co/300x400?text=God+of+War+Ragnarok"
  },
  {
    id: 3,
    title: "Halo Infinite",
    publisher: "Xbox Game Studios",
    releaseYear: 2021,
    ageRating: "T",
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Halo+Infinite"
  },
  {
    id: 4,
    title: "Minecraft",
    publisher: "Mojang Studios",
    releaseYear: 2011,
    ageRating: "E10+",
    price: 29.99,
    imageUrl: "https://placehold.co/300x400?text=Minecraft"
  },
  {
    id: 5,
    title: "Super Mario Odyssey",
    publisher: "Nintendo",
    releaseYear: 2017,
    ageRating: "E",
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Super+Mario+Odyssey"
  }
];



router.get("/games", (req, res) => {
    res.status(200).json(games);
});

router.get("/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const game = games.find(game => game.id === id);

    if (!game) {
        return res.status(404).json({ message: "Game not found!" });
    }

    res.status(200).json(game);
});

router.post("/game", (req, res) => {
    const { title, price } = req.body;

    if (!isGoodStringParam(title) || !isGoodNumericParam(price)) {
        return res.status(400).json({
            message: "Game title and price are required fields"
        });
    }

    const newGame = {
        id: Math.max(0, ...games.map(game => game.id)) + 1,
        title,
        price
    };

    games.push(newGame);
    res.status(201).json(newGame);
});

router.put("/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const game = games.find(game => game.id === id);

    if (!game) {
        return res.status(404).json({ message: "Game not found!" });
    }

    const { title, price } = req.body;

    if (!isGoodStringParam(title) || !isGoodNumericParam(price)) {
        return res.status(400).json({
            message: "Game title and price are required fields"
        });
    }

    game.title = title;
    game.price = price;

    res.status(200).json(game);
});

router.patch("/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const game = games.find(game => game.id === id);

    if (!game) {
        return res.status(404).json({ message: "Game not found!" });
    }

    const { title, price } = req.body;

    if (title !== undefined) {
        if (!isGoodStringParam(title)) {
            return res.status(400).json({
                message: "Invalid game title"
            });
        }
        game.title = title;
    }

    if (price !== undefined) {
        if (!isGoodNumericParam(price)) {
            return res.status(400).json({
                message: "Invalid game price"
            });
        }
        game.price = price;
    }

    res.status(200).json(game);
});

router.delete("/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const gameIx = games.findIndex(game => game.id === id);

    if (gameIx === -1) {
        return res.status(404).json({ message: "Game not found!" });
    }

    games.splice(gameIx, 1);
    res.status(204).send();
});

export default router;
