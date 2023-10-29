import express, { Express, Request, Response } from "express";
import { myDataSource } from "../data-source";
import { State } from "../entity/state";
import { Individual } from "../entity/individual";

const router = express.Router();

/**
 * @swagger
 * /api/allstates:
 *   get:
 *     description: Get all states
 *     responses:
 *       200:
 *         description: Success
 *     tags:
 *       - Main API
 */
router.get("/allstates", async (req: Request, res: Response) => {
  const states = await myDataSource
    .getRepository(State)
    .find({ select: { id: true, name: true }, order: { name: "ASC" } });

  res.json(states);
});

/**
 * @swagger
 * /api/people-by-state/{state_id}:
 *   get:
 *     description: Get all people by state id
 *     parameters:
 *      - in: path
 *        name: state_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the state
 *     responses:
 *       200:
 *         description: Success
 *     tags:
 *       - Main API
 */
router.get(
  "/people-by-state/:state_id",
  async (req: Request, res: Response) => {
    let state_id = parseInt(req.params.state_id);

    console.log(typeof state_id);

    const states = await myDataSource.getRepository(Individual).find({
      where: { state_id: state_id },
      select: { id: true, firstname: true, lastname: true },
      order: { firstname: "ASC", lastname: "ASC" },
    });

    res.json(states);
  }
);

export default router;
